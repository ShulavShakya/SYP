from django.shortcuts import render

from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from accounts.models import Appointment, Doctor, Patient

from .serializer import AppointmentCreateSerializer, AppointmentFilteredSerializer, DoctorBasicSerializer, PatientCreateSerializer, PatientListSerializer, ReceptionistDetailSerializer, ReceptionistUpdateSerializer

@api_view(['GET'])
@permission_classes([AllowAny])  # ⚠️ change to IsAuthenticated or IsAdminUser in real apps
def get_patients(request):
    patients = Patient.objects.select_related('user').all().order_by('-created_at')
    serializer = PatientListSerializer(patients, many=True)
    return Response(serializer.data)


from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status

@api_view(['POST'])
@permission_classes([AllowAny])
def create_patient(request):
    serializer = PatientCreateSerializer(data=request.data)

    if serializer.is_valid():
        patient = serializer.save()

        return Response({
            "message": "Patient created successfully",
            "patient_id": patient.patient_id,
            "full_name": patient.full_name
        }, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET'])
@authentication_classes([])  
@permission_classes([AllowAny])
def get_doctors_basic(request):
    doctors = Doctor.objects.all()
    serializer = DoctorBasicSerializer(doctors, many=True, context={'request': request})
    return Response(serializer.data)
@api_view(['GET'])
@permission_classes([AllowAny])
def get_active_appointments(request):
    appointments = Appointment.objects.filter(
        status__in=['PENDING', 'SCHEDULED']
    ).order_by('date', 'time')

    serializer = AppointmentFilteredSerializer(appointments, many=True)
    return Response(serializer.data)
from rest_framework.decorators import api_view
from rest_framework.response import Response
from accounts.models import Patient
from .serializer import PatientListSerializer

@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_patients(request):
    patients = Patient.objects.all().order_by('-created_at')

    serializer = PatientListSerializer(
        patients,
        many=True,
        context={'request': request}
    )

    return Response(serializer.data)


@api_view(['POST'])
def receptionist_create_appointment(request):
    patient_id = request.data.get('patient_id')

    try:
        patient = Patient.objects.get(patient_id=patient_id)
    except Patient.DoesNotExist:
        return Response({"error": "Invalid patient_id"}, status=404)

    serializer = AppointmentCreateSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save(patient=patient)  # same FK assignment
        return Response(
            {
                "message": "Appointment created successfully",
                "data": serializer.data
            },
            status=201
        )

    return Response(serializer.errors, status=400)






from .serializer import AppointmentListSerializer
@api_view(['GET'])
def get_all_appointments(request):
    appointments = Appointment.objects.all().order_by('-created_at')

    serializer = AppointmentListSerializer(appointments, many=True)

    return Response(serializer.data)




from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from accounts.models import Appointment
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
@api_view(['PATCH'])
@permission_classes([AllowAny])
def update_appointment_sstatus(request, appointment_id):
    """
    Updates the sstatus of a specific appointment to True.
    """
    try:
        appointment = Appointment.objects.get(id=appointment_id)
    except Appointment.DoesNotExist:
        return Response(
            {"error": "Appointment not found."},
            status=status.HTTP_404_NOT_FOUND
        )

    # Update r_status to True
    appointment.r_status = True
    appointment.save()
    patient = appointment.patient
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        f'patient_{patient.id}',
        {
            'type': 'send_notification',
            'message': {
                'title': "Appointment Update",
                'body': f"Your appointment on {appointment.date} has been approved by receptionist.",
                'appointment_id': appointment.id,
            }
        }
    )

    return Response(
        {
            "message": "r_status updated successfully.",
            "appointment_id": appointment.id,
            "r_status": appointment.r_status  # will return True/False
        },
        status=status.HTTP_200_OK
    )

# patient_dashboard/views.py

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from accounts.models import Payment,Receptionist
from .serializer import PaymentDetailSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_payments(request):
    """
    Fetch all Payment objects from the database.
    """
    payments = Payment.objects.all().order_by('-created_at')
    serializer = PaymentDetailSerializer(payments, many=True)
    return Response({"message": "All payments fetched successfully", "data": serializer.data})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_logged_in_receptionist(request):
    """
    Get the details of the logged-in receptionist.
    """
    try:
        receptionist = Receptionist.objects.get(user=request.user)
    except Receptionist.DoesNotExist:
        return Response({"error": "Receptionist profile not found."}, status=404)

    serializer = ReceptionistDetailSerializer(receptionist)
    return Response(serializer.data, status=200)


@api_view(['PUT', 'PATCH'])
@permission_classes([IsAuthenticated])
def update_receptionist_profile(request):
    """
    Update the logged-in receptionist's profile.
    """
    try:
        receptionist = Receptionist.objects.get(user=request.user)
    except Receptionist.DoesNotExist:
        return Response({"error": "Receptionist profile not found."}, status=status.HTTP_404_NOT_FOUND)

    serializer = ReceptionistUpdateSerializer(receptionist, data=request.data, partial=True)  # partial allows partial update
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)