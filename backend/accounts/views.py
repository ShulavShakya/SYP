from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate, get_user_model
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes

from .service import create_notification

from .utils import send_notification_to_user
from .serializers import PatientRegisterSerializer,  LoginSerializer
from .models import Admin, Appointment, Notification, Patient, Doctor, Receptionist
from datetime import date, time


# -----------------------------
# Appointment View
# -----------------------------
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from .models import Receptionist, Patient
from django.contrib.auth.models import User


User = get_user_model()
@api_view(['POST'])
def register_patient(request):
    serializer = PatientRegisterSerializer(data=request.data)
    if serializer.is_valid():
        patient = serializer.save()
        return Response({"message": "Patient registered"}, status=201)
    else:
        # Debug: show validation errors
        print(serializer.errors)
        return Response(serializer.errors, status=400)
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




from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Conversation, Message, Patient
from .serializers import ConversationSerializer, MessageSerializer

# --- FOR PATIENTS ---
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_my_conversation(request):
    """Returns the single unique conversation ID for the logged-in patient."""
    try:
        patient = request.user.patient
        conversation, _ = Conversation.objects.get_or_create(patient=patient)
        return Response({
            "conversation_id": conversation.id,
            "clinic_name": "Clinic Reception",
            "patient_id": patient.patient_id
        })
    except Patient.DoesNotExist:
        return Response({"error": "Not a patient profile"}, status=403)

# --- FOR RECEPTIONISTS ---
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_conversations(request):
    """Returns all patient conversations for the receptionist sidebar."""
    conversations = Conversation.objects.all().order_by('-updated_at')
    serializer = ConversationSerializer(conversations, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_message_history(request, conversation_id):
    """Returns the message history for a specific conversation."""
    messages = Message.objects.filter(conversation_id=conversation_id).order_by('created_at')
    serializer = MessageSerializer(messages, many=True)
    return Response(serializer.data)




