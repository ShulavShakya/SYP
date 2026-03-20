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

    class Meta:
        model = Appointment
        fields = [
            'id',
            'patient_username',   # 👈 keep this
            'department_name',
            'doctor_name',
            'date',
            'time',
            'reason',             # 👈 add this (you had it in model)
            'status',             # 👈 useful for frontend
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
class PatientRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'first_name', 'last_name']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', '')
        )
        # Create Patient profile
        Patient.objects.create(
            user=user,
            dob=self.context['dob'],
            phone=self.context['phone'],
            address=self.context['address']
        )
        return user