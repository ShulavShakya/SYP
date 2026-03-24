from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Patient, Appointment, Doctor
# -----------------------------
# Appointment Serializer
# -----------------------------
from rest_framework import serializers
from .models import Appointment

class AppointmentSerializer(serializers.ModelSerializer):
    patient_username = serializers.CharField(
        source='patient.user.username',
        read_only=True
    )
    status = serializers.ChoiceField(
        choices=Appointment.STATUS_CHOICES,
        default='SCHEDULED'
    )

    class Meta:
        model = Appointment
        fields = [
            'id',
            'patient_username',   
            'department_name',
            'doctor_name',
            'date',
            'time',
            'reason',            
            'status',             
            'created_at',
            'updated_at'
        ]

        read_only_fields = [
            'id',
            'status',
            'created_at',
            'updated_at',
            'patient_username'
        ]
# -----------------------------
# Patient Registration Serializer
# -----------------------------
from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Patient
from django.contrib.auth.password_validation import validate_password
from .models import Patient

class PatientRegisterSerializer(serializers.ModelSerializer):
    fullname = serializers.CharField(write_only=True)
    email = serializers.EmailField(write_only=True)
    password = serializers.CharField(write_only=True)
    profile_image = serializers.ImageField(write_only=True, required=False)

    class Meta:
        model = Patient
        fields = [
            'fullname',
            'email',
            'password',
            'phone',
            'dob',
            'gender',
            'address',
            'blood_group',
            'profile_image',
            'emergency_contact_name',
            'emergency_contact_phone',
        ]

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value

    def validate_password(self, value):
        validate_password(value)
        return value

    def create(self, validated_data):
        fullname = validated_data.pop("fullname").strip()
        email = validated_data.pop("email")
        password = validated_data.pop("password")
        profile_image = validated_data.pop("profile_image", None)

        parts = fullname.split(None, 1)
        first_name = parts[0]
        last_name = parts[1] if len(parts) > 1 else ""

        user = User.objects.create_user(
            username=email,
            email=email,
            password=password,
            first_name=first_name,
            last_name=last_name
        )

        patient = Patient.objects.create(
            user=user,
            profile_image=profile_image,
            **validated_data
        )

        return patient

# -----------------------------
# Login Serializer
# -----------------------------
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True, write_only=True)

from rest_framework import serializers
from .models import Conversation, Message, Patient, Receptionist

class MessageSerializer(serializers.ModelSerializer):
    sender_name = serializers.SerializerMethodField()

    class Meta:
        model = Message
        fields = ['id', 'sender_type', 'sender_id', 'message', 'created_at', 'sender_name']

    def get_sender_name(self, obj):
        if obj.sender_type == "PATIENT":
            return obj.conversation.patient.full_name
        # Fetch the specific receptionist name from the ID
        rec = Receptionist.objects.filter(id=obj.sender_id).first()
        return rec.name if rec else "System"

from rest_framework import serializers
from .models import Conversation, Message, Patient, Receptionist

class MessageSerializer(serializers.ModelSerializer):
    sender_name = serializers.SerializerMethodField()

    class Meta:
        model = Message
        fields = ['id', 'sender_type', 'sender_id', 'message', 'created_at', 'sender_name']

    def get_sender_name(self, obj):
        if obj.sender_type == "PATIENT":
            return obj.conversation.patient.full_name
        
        # Look up the specific receptionist name from their ID
        try:
            rec = Receptionist.objects.get(id=obj.sender_id)
            return rec.name
        except Receptionist.DoesNotExist:
            return "Staff"

class ConversationSerializer(serializers.ModelSerializer):
    patient_name = serializers.CharField(source='patient.full_name', read_only=True)
    patient_id_str = serializers.CharField(source='patient.patient_id', read_only=True)
    last_message = serializers.SerializerMethodField()

    class Meta:
        model = Conversation
        fields = ['id', 'patient_name', 'patient_id_str', 'last_message', 'updated_at']

    def get_last_message(self, obj):
        last = obj.messages.order_by('-created_at').first()
        return last.message if last else "No messages yet"




