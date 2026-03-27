from django.shortcuts import get_object_or_404, render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from accounts.models import Appointment, Doctor
from .serializers import AppointmentSerializer, DoctorDetailSerializer, DoctorUpdateSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from accounts.models import Appointment
from .serializers import AppointmentSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def doctor_appointments(request):
    try:
        doctor = Doctor.objects.get(user=request.user)
        doctor_id = doctor.doctor_id
    except Doctor.DoesNotExist:
        return Response({"detail": "Doctor profile not found."}, status=400)

    appointments = Appointment.objects.filter(doctor_id=doctor_id)
    serializer = AppointmentSerializer(appointments, many=True)
    return Response(serializer.data)


from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from accounts.models import Consultation
from .serializers import ConsultationSerializer
from django.contrib.auth.models import User
""""
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_consultation(request):
    
    POST API to create a new Consultation record.
    Expected JSON payload:
    {
        "patient": <patient_id>,
        "patient_name": "John Doe",
        "symptoms": "...",
        "clinic_diagnosis": "...",
        "detailed_notes": "...",
        "medicine_name": "...",
        "dosage": "...",
        "frequency": "...",
        "duration": "...",
        "notes": "..."
    }
    
    serializer = ConsultationSerializer(data=request.data)
    if serializer.is_valid():
        # Optional: ensure the patient exists
        patient_id = serializer.validated_data.get('patient').id
        try:
            user = User.objects.get(id=patient_id)
        except User.DoesNotExist:
            return Response({"detail": "Patient not found."}, status=404)

        serializer.save(patient=user)
        return Response(serializer.data, status=201)

    return Response(serializer.errors, status=400)
"""
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from accounts.models import Consultation, Appointment, Doctor,Patient
from .serializers import ConsultationSerializer
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_consultation(request):
    """
    Doctor creates a consultation for a patient's appointment.
    """
    data = request.data
    appointment_id = data.get('appointment_id')

    if not appointment_id:
        return Response({"error": "appointment_id is required"}, status=400)

    # 1. Find the appointment
    appointment = get_object_or_404(Appointment, id=appointment_id)

    # 2. Get the logged-in doctor's ID
    try:
        # Assuming the logged-in user has a Doctor profile
        doctor = Doctor.objects.get(user=request.user)
    except Doctor.DoesNotExist:
        return Response({"error": "Doctor profile not found. You must be a doctor to perform this action."}, status=404)

    # 3. Create the consultation
    # We remove the "if appointment.patient != patient" check because the DOCTOR is the one saving this.
    consultation = Consultation.objects.create(
        appointment=appointment,
        doctor_id=doctor.doctor_id,  # Link to the doctor performing the consultation
        clinic_diagnosis=data.get('clinic_diagnosis', ''),
        detailed_notes=data.get('detailed_notes', ''),
        medicine_name=data.get('medicine_name', ''),
        dosage=data.get('dosage', ''),
        frequency=data.get('frequency', ''),
        duration=data.get('duration', ''),
        notes=data.get('notes', ''),
    )

    # 4. Optional: Mark the appointment as completed
    appointment.status = 'COMPLETED'
    appointment.save()

    serializer = ConsultationSerializer(consultation)
    return Response(serializer.data, status=201)

from .serializers import RatingSerializer
from accounts.models import Rating
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_doctor_ratings(request):
    """
    Get all ratings for the logged-in doctor.
    """
    try:
        doctor = Doctor.objects.get(user=request.user)
    except Doctor.DoesNotExist:
        return Response({"error": "Doctor profile not found."}, status=404)

    # Fetch ratings for this doctor
    ratings = Rating.objects.filter(doctor_id=doctor.doctor_id)
    serializer = RatingSerializer(ratings, many=True)
    return Response(serializer.data, status=200)


@api_view(['PUT', 'PATCH'])
@permission_classes([IsAuthenticated])
def update_doctor_profile(request):
    """
    Update the logged-in doctor's profile.
    """
    try:
        doctor = Doctor.objects.get(user=request.user)
    except Doctor.DoesNotExist:
        return Response({"error": "Doctor profile not found."}, status=status.HTTP_404_NOT_FOUND)

    serializer = DoctorUpdateSerializer(doctor, data=request.data, partial=True)  # partial=True allows partial updates
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_doctor_info(request):
    """
    Get the details of the logged-in doctor.
    """
    try:
        doctor = Doctor.objects.get(user=request.user)
    except Doctor.DoesNotExist:
        return Response({"error": "Doctor profile not found."}, status=404)

    serializer = DoctorDetailSerializer(doctor)
    return Response(serializer.data, status=200)