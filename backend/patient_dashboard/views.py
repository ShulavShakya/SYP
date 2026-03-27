from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from accounts.models import Consultation, Patient
from curecloud.settings import KHALTI_SECRET_KEY
from .serializer import AmountSerializer, ChangePasswordSerializer, ConsultationSerializer, DoctorBasicSerializer, PatientProfileSerializer, RatingSerializer



#sdfghjgfdsghjgfdsfghj

from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from accounts.models import Doctor
from .serializer import DoctorBasicSerializer
@api_view(['GET'])
@authentication_classes([])  # no auth required
@permission_classes([AllowAny])
def get_doctors_basic(request):
    doctors = Doctor.objects.all()
    serializer = DoctorBasicSerializer(doctors, many=True, context={'request': request})
    return Response(serializer.data)

import base64
import hashlib
import hmac
import json
import uuid
from decimal import Decimal

import requests
from django.shortcuts import redirect
from django.conf import settings
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status


from accounts.models import Appointment, Payment, Patient









from .serializer import PatientProfileSerializer
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_patient_basic_info(request):
    try:
        patient = Patient.objects.get(user=request.user)  
    except Patient.DoesNotExist:
        return Response({"error": "Patient not found"}, status=404)

    serializer = PatientProfileSerializer(patient)
    return Response(serializer.data)


from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from accounts.models import Patient
from .serializer import  PatientUpdateSerializer

@api_view(['PUT', 'PATCH'])
@permission_classes([IsAuthenticated])
def update_patient_profile(request):
    try:
        patient = Patient.objects.get(user=request.user)
    except Patient.DoesNotExist:
        return Response({"error": "Patient not found"}, status=404)

    serializer = PatientUpdateSerializer(
        patient,
        data=request.data,
        partial=True   # 🔥 allows partial updates
    )

    if serializer.is_valid():
        serializer.save()
        return Response({
            "message": "Profile updated successfully",
            "data": serializer.data
        })

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def change_password(request):
    serializer = ChangePasswordSerializer(data=request.data)

    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    user = request.user

    old_password = serializer.validated_data['old_password']
    new_password = serializer.validated_data['new_password']

    # 🔹 Check old password
    if not user.check_password(old_password):
        return Response(
            {"error": "Old password is incorrect"},
            status=status.HTTP_400_BAD_REQUEST
        )

    # 🔹 Update password (IMPORTANT)
    user.set_password(new_password)
    user.save()

    return Response({"message": "Password updated successfully"})

from rest_framework.decorators import api_view
from rest_framework.response import Response
from accounts.models import Doctor
from .serializer import DoctorListSerializer

@api_view(['GET'])
def get_all_doctors(request):
    doctors = Doctor.objects.all()
    serializer = DoctorListSerializer(doctors, many=True)
    return Response(serializer.data)
from rest_framework.decorators import api_view
from rest_framework.response import Response
from accounts.models import Appointment
from .serializer import AppointmentFilteredSerializer

@api_view(['GET'])
def get_active_appointments(request):
    appointments = Appointment.objects.filter(
        status__in=['PENDING', 'SCHEDULED']
    ).order_by('date', 'time')

    serializer = AppointmentFilteredSerializer(appointments, many=True)
    return Response(serializer.data)



from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from accounts.models import Appointment
from .serializer import AppointmentCreateSerializer
from accounts.models import Patient  # adjust if needed

# views.py
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer

from accounts.models import Appointment, Patient
from .serializer import AppointmentCreateSerializer
from accounts.models import Receptionist, User

from accounts.service import create_notification

from rest_framework.decorators import api_view
from rest_framework.response import Response
from accounts.models import Patient, Appointment, Notification
from .serializer import AppointmentCreateSerializer
from accounts.service import create_notification  # assuming you have this function
from django.db.models import Q
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def mark_notifications_read(request):
    # Mark all unread notifications for this user as read
    Notification.objects.filter(
        Q(patient__user=request.user) |
        Q(doctor__user=request.user) |
        Q(receptionist__user=request.user) |
        Q(admin=request.user),
        is_read=False
    ).update(is_read=True)
    
    return Response({"status": "success"})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_appointment(request):
    try:
        patient = Patient.objects.get(user=request.user)
    except Patient.DoesNotExist:
        return Response({"error": "Patient not found"}, status=400)

    serializer = AppointmentCreateSerializer(data=request.data)
    if serializer.is_valid():
        appointment = serializer.save(patient=patient)  # save appointment with patient

        # Send notification to admin and receptionist
        create_notification(
            title="New Appointment",
            body=f"Appointment requested by {patient.full_name}",  # use patient name
            roles=["admin", "receptionist"]
        )

        return Response({"status": "success"}, status=201)
    else:
        return Response(serializer.errors, status=400)





from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from accounts.models import Appointment

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_patient_appointments(request):
    try:
        patient = request.user.patient

        appointments = Appointment.objects.filter(
            patient=patient
        ).values(
            "id",
            "department_name",
            "doctor_name",
            "doctor_id",
            "date",
            "time",
            "reason",
            "status",
            "r_status",

            "created_at",
            "updated_at"
        ).order_by('-created_at')

        return Response({
            "message": "Appointments fetched successfully",
            "data": list(appointments)
        })

    except AttributeError:
        return Response({
            "error": "Patient profile not found for this user"
        }, status=400)

    except Exception as e:
        return Response({
            "error": str(e)
        }, status=500)

import requests
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from accounts.models import Appointment, Payment
from .serializer import PaymentSerializer
# Khalti Sandbox Integration - Django
import requests
from django.conf import settings
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from accounts.models import Appointment, Payment
from .serializer import PaymentSerializer, AmountSerializer

# -------------------------------
# Khalti Sandbox Config
# -------------------------------
KHALTI_SECRET_KEY = "72360eed065c4ca4a686f1c23b34ffc5"  # TEST key
KHALTI_INITIATE_URL = "https://dev.khalti.com/api/v2/epayment/initiate/"
KHALTI_LOOKUP_URL = "https://dev.khalti.com/api/v2/epayment/lookup/"

# -------------------------------
# Initiate Khalti Payment
# -------------------------------
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def initiate_payment(request):
    appointment_id = request.data.get("appointment_id")
    if not appointment_id:
        return Response({"error": "Missing appointment_id"}, status=400)

    # Ensure patient owns this appointment
    try:
        appointment = Appointment.objects.get(id=appointment_id, patient__user=request.user)
    except Appointment.DoesNotExist:
        return Response({"error": "Appointment not found"}, status=404)

    # Amount in paisa (e.g., Rs. 250 = 25000 paisa)
    amount_paisa = 25000

    payload = {
        "return_url": "http://localhost:5173/patient/payment/verify",
        "website_url": "http://localhost:5173",
        "amount": amount_paisa,
        "purchase_order_id": str(appointment.id),
        "purchase_order_name": f"Appointment #{appointment.id}",
        "customer_info": {
            "name": request.user.get_full_name() or request.user.username,
            "email": request.user.username or "test@example.com",
            "phone": getattr(request.user.patient, "phone", "9800000000")
        }
    }

    headers = {
        "Authorization": f"Key {KHALTI_SECRET_KEY}",
        "Content-Type": "application/json",
    }

    try:
        response = requests.post(KHALTI_INITIATE_URL, json=payload, headers=headers, timeout=10)
        response.raise_for_status()
        data = response.json()
    except requests.exceptions.RequestException as e:
        return Response({"error": "Khalti initiation failed", "details": str(e)}, status=400)
    except ValueError:
        return Response({"error": "Invalid response from Khalti"}, status=500)

    return Response(data)

# -------------------------------
# Verify Khalti Payment
# -------------------------------
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def verify_payment(request):
    if request.method == "GET":
        pidx = request.GET.get("pidx")
        appointment_id = request.GET.get("purchase_order_id")
    else:
        pidx = request.data.get("pidx")
        appointment_id = request.data.get("appointment_id")

    if not pidx or not appointment_id:
        return Response({"error": "Missing data"}, status=400)

    # Ensure patient owns this appointment
    try:
        appointment = Appointment.objects.get(id=appointment_id, patient=request.user.patient)
    except Appointment.DoesNotExist:
        return Response({"error": "Appointment not found"}, status=404)

    payload = {"pidx": pidx}
    headers = {"Authorization": f"Key {KHALTI_SECRET_KEY}"}

    try:
        response = requests.post(KHALTI_LOOKUP_URL, json=payload, headers=headers, timeout=10)
        response.raise_for_status()
        result = response.json()
    except requests.exceptions.RequestException as e:
        return Response({"error": "Khalti verification failed", "details": str(e)}, status=400)
    except ValueError:
        return Response({"error": "Invalid Khalti response"}, status=500)

    if result.get("status") == "Completed":
        # Record payment
        payment, created = Payment.objects.get_or_create(
            pidx=pidx,
            defaults={
                "appointment": appointment,
                "patient": request.user.patient,
                "amount": result.get("total_amount", 0) / 100,  # convert paisa to Rs.
                "status": "completed"
            }
        )
        # Update appointment status
        appointment.status = "SCHEDULED"
        appointment.sstatus = "YES"
        appointment.save()

        return Response({"success": True, "payment_id": payment.id})

    return Response({"success": False, "data": result})

# -------------------------------
# Get All Payments for Patient
# -------------------------------
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_my_payments(request):
    try:
        patient = request.user.patient
    except AttributeError:
        return Response({"error": "Patient not found"}, status=404)

    payments = Payment.objects.filter(patient=patient).order_by('-created_at')
    serializer = AmountSerializer(payments, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_my_consultations(request):
    """
    Returns all consultations for the logged-in patient.
    """
    try:
        # Get the Patient instance linked to the logged-in user
        patient = Patient.objects.get(user=request.user)
    except Patient.DoesNotExist:
        return Response({"error": "Patient profile not found"}, status=404)

    # Filter consultations via appointment -> patient
    consultations = Consultation.objects.filter(appointment__patient=patient).order_by('-created_at')

    serializer = ConsultationSerializer(consultations, many=True)
    return Response(serializer.data)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def rate_doctor(request):
    """
    Allow a logged-in patient to rate a doctor for a consultation.
    """
    try:
        patient = Patient.objects.get(user=request.user)
    except Patient.DoesNotExist:
        return Response({"error": "Patient profile not found."}, status=status.HTTP_404_NOT_FOUND)

    consultation_id = request.data.get('consultation')
    if not consultation_id:
        return Response({"error": "Consultation ID is required."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        consultation = Appointment.objects.get(id=consultation_id)
    except Appointment.DoesNotExist:
        return Response({"error": "Consultation not found."}, status=status.HTTP_404_NOT_FOUND)

    # Check if this consultation has already been rated
    if hasattr(consultation, 'rating'):
        return Response({"error": "This consultation has already been rated."}, status=status.HTTP_400_BAD_REQUEST)

    serializer = RatingSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(
            patient_id=patient.patient_id,
            doctor_id=consultation.doctor_id,
            consultation=consultation,
            status=True  # ✅ Add status here
        )
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from accounts.models import Rating
from .serializer import RatingSerializer  # Make sure you have a serializer for Rating

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_my_ratings(request):
    """
    Get all ratings submitted by the logged-in patient.
    """
    try:
        patient = request.user.patient  # Assuming OneToOneField from User to Patient
    except AttributeError:
        return Response({"error": "Patient profile not found."}, status=status.HTTP_404_NOT_FOUND)

    # Filter only ratings for this patient
    ratings = Rating.objects.filter(patient_id=patient.patient_id)
    serializer = RatingSerializer(ratings, many=True)

    return Response(serializer.data, status=status.HTTP_200_OK)