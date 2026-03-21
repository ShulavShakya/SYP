from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from .serializers import PatientRegisterSerializer, AppointmentSerializer, LoginSerializer
from .models import Admin, Appointment, Patient, Doctor, Receptionist
from datetime import date, time


# -----------------------------
# Appointment View
# -----------------------------
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied


class AppointmentView(generics.ListAPIView):
    """
    Only used to LIST appointments.
    Appointment creation is handled automatically after payment.
    """
    serializer_class = AppointmentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        # Patient → only their appointments
        if hasattr(user, 'patient'):
            return Appointment.objects.filter(patient=user.patient)

        # Staff → view all appointments
        elif hasattr(user, 'doctor') or hasattr(user, 'receptionist') or hasattr(user, 'admin'):
            return Appointment.objects.all()

        return Appointment.objects.none()
# -----------------------------
# Patient Registration
# -----------------------------
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .serializers import PatientRegisterSerializer


@api_view(['POST'])
def register_patient(request):
    serializer = PatientRegisterSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(
            {"message": "Patient registered successfully"},
            status=status.HTTP_201_CREATED
        )

    print(serializer.errors)  # Debugging line to see validation errors
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

@api_view(['POST'])
def login_user(request):
    serializer = LoginSerializer(data=request.data)

    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    username = serializer.validated_data['username']
    password = serializer.validated_data['password']

    user = authenticate(username=username, password=password)

    if user and user.is_active:
        refresh = RefreshToken.for_user(user)

        if hasattr(user, 'patient'):
            role = 'patient'
        elif hasattr(user, 'doctor'):
            role = 'doctor'
        elif hasattr(user, 'receptionist'):
            role = 'receptionist'
        elif hasattr(user,'admin') or user.is_superuser:
            role = 'admin'
        else:
            role = 'unknown'

        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'role': role,
            'username': user.username
        })

    return Response(
        {"error": "Invalid credentials"},
        status=status.HTTP_401_UNAUTHORIZED
    )
@api_view(['GET'])
@permission_classes([IsAuthenticated, Patient])
def patient_dashboard(request):
    patient = request.user.patient

    return Response({
        'username': request.user.username,
        'dob': patient.dob,
        'phone': patient.phone,
        'address': patient.address,
        'message': 'Welcome to patient dashboard'
    })
# -----------------------------
# Doctor Dashboard
# -----------------------------
class DoctorDashboardView(APIView):
    permission_classes = [IsAuthenticated, Doctor]

    def get(self, request):
        doctor = request.user.doctor
        return Response({
            'username': request.user.username,
            'specialty': doctor.specialty,
            'phone': doctor.phone,
            'message': 'Welcome to doctor dashboard'
        })


# -----------------------------
# Receptionist Dashboard
# -----------------------------
class ReceptionistDashboardView(APIView):
    permission_classes = [IsAuthenticated, Receptionist]

    def get(self, request):
        receptionist = request.user.receptionist
        return Response({
            'username': request.user.username,
            'phone': receptionist.phone,
            'message': 'Welcome to receptionist dashboard'
        })


# -----------------------------
# Admin Dashboard
# -----------------------------
class AdminDashboardView(APIView):
    permission_classes = [IsAuthenticated, Admin]

    def get(self, request):
        return Response({
            'username': request.user.username,
            'message': 'Welcome to admin dashboard'
        })
