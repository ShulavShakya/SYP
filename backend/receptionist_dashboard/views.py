from django.shortcuts import render

from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from accounts.models import Appointment, Doctor, Patient

from .serializer import AppointmentCreateSerializer, AppointmentFilteredSerializer, DoctorBasicSerializer, PatientCreateSerializer, PatientListSerializer

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

@api_view(['PATCH'])
def mark_sstatus_yes(request, appointment_id):
    try:
        appointment = Appointment.objects.get(id=appointment_id)

        appointment.sstatus = "YES"
        appointment.save()

        return Response(
            {
                "message": "Appointment sstatus updated to YES successfully",
                "id": appointment.id,
                "sstatus": appointment.sstatus
            },
            status=status.HTTP_200_OK
        )

    except Appointment.DoesNotExist:
        return Response(
            {"error": "Appointment not found"},
            status=status.HTTP_404_NOT_FOUND
        )