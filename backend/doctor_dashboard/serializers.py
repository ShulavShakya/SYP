from rest_framework import serializers
from accounts.models import Appointment, Rating
class AppointmentSerializer(serializers.ModelSerializer):
    patient_name = serializers.SerializerMethodField()
    patient_username = serializers.SerializerMethodField()

    class Meta:
        model = Appointment
        fields = [
            'id', 'patient', 'patient_name', 'patient_username',
            'department_name', 'doctor_name', 'doctor_id',
            'date', 'time', 'reason', 'r_status', 'status',
            'created_at', 'updated_at',
        ]

    def get_patient_name(self, obj):
        try:
            if obj.patient and obj.patient.user:
                return f"{obj.patient.user.first_name} {obj.patient.user.last_name}".strip() or obj.patient.user.username
            return "Unknown Patient"
        except:
            return "Unknown Patient"

    def get_patient_username(self, obj):
        try:
            return obj.patient.user.username
        except:
            return None
from rest_framework import serializers
from accounts.models import Consultation
from django.contrib.auth.models import User
from rest_framework import serializers
from accounts.models import Consultation, Appointment
from rest_framework import serializers
from accounts.models import Consultation, Rating,  Doctor
from django.contrib.auth.models import User

class ConsultationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Consultation
        fields = [
            'id',
            'appointment',
            'doctor_id',
            'clinic_diagnosis',
            'detailed_notes',
            'medicine_name',
            'dosage',
            'frequency',
            'duration',
            'notes',
            'created_at'
        ]
        read_only_fields = ['id', 'created_at', 'doctor_id']



class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ['consultation', 'patient_id', 'star', 'comment', 'created_at']



class DoctorUpdateSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', required=False)
    password = serializers.CharField(source='user.password', write_only=True, required=False)

    class Meta:
        model = Doctor
        fields = [
            'profile_image',
            'gender',
            'availability_days',
            'dob',
            'phone',
            'email',
            'address',
            'qualifications',
            'shift',
            'specialty',
            'status',
            'experience_years',
            'username',
            'password',
        ]

    def update(self, instance, validated_data):
        # Handle User fields
        user_data = validated_data.pop('user', {})
        if 'username' in user_data:
            instance.user.username = user_data['username']
        if 'password' in user_data:
            instance.user.set_password(user_data['password'])  # hashed password
        instance.user.save()

        # Handle Doctor fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance


class DoctorDetailSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = Doctor
        fields = [
            'doctor_id',
            'profile_image',
            'username',
            'gender',
            'name',
            'availability_days',
            'dob',
            'phone',
            'email',
            'address',
            'qualifications',
            'shift',
            'specialty',
            'status',
            'experience_years',
            'created_at',
            'updated_at',
        ]