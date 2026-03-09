from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.contrib.auth.models import User

from .serializers import PatientRegisterSerializer, AppointmentSerializer
from .models import Appointment, Patient, Doctor
from datetime import date, time
import uuid
from rest_framework.decorators import api_view
from .models import Payment
@api_view(['POST'])
def create_payment_and_appointment(request):
    user = request.user
    if not hasattr(user, 'patient'):
        return Response({"error": "Only patients can create appointment"}, status=status.HTTP_403_FORBIDDEN)

    patient = user.patient
    amount = request.data.get('amount', 500)
    appointment_date = request.data.get('date', date.today())
    appointment_time = request.data.get('time', time(10, 0))
    reason = request.data.get('reason', '')

    # Simulate payment success
    payment = Payment.objects.create(
        patient=patient,
        amount=amount,
        status='success',
        transaction_id=str(uuid.uuid4())
    )

    # Create appointment after payment
    appointment = Appointment.objects.create(
        payment=payment,
        patient=patient,
        date=appointment_date,
        time=appointment_time,
        reason=reason
    )

    return Response({
        "message": "Payment successful, appointment created",
        "appointment_id": appointment.id,
        "transaction_id": payment.transaction_id
    }, status=status.HTTP_201_CREATED)
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
class PatientRegisterView(APIView):
    """
    Only patients can register themselves.
    Doctors, Receptionists, Admins cannot register via this API.
    """
    def post(self, request):
        serializer = PatientRegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Patient registered successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# -----------------------------
# Login (JWT for all roles)
# -----------------------------
class LoginView(APIView):
    """
    Login for all roles: patient, doctor, receptionist, admin
    """
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)
        if user:
            refresh = RefreshToken.for_user(user)

            # Identify role for frontend dashboard
            if hasattr(user, 'patient'):
                role = 'patient'
            elif hasattr(user, 'doctor'):
                role = 'doctor'
            elif hasattr(user, 'receptionist'):
                role = 'receptionist'
            elif hasattr(user, 'admin'):
                role = 'admin'
            else:
                role = 'unknown'

            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'role': role,
                'username': user.username
            })
        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)


# -----------------------------
# Patient Dashboard
# -----------------------------
class PatientDashboardView(APIView):
    permission_classes = [IsAuthenticated, IsPatient]

    def get(self, request):
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
    permission_classes = [IsAuthenticated, IsDoctor]

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
    permission_classes = [IsAuthenticated, IsReceptionist]

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
    permission_classes = [IsAuthenticated, IsAdmin]

    def get(self, request):
        return Response({
            'username': request.user.username,
            'message': 'Welcome to admin dashboard'
        })