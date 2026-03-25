from rest_framework import serializers
from accounts.models import Appointment, Doctor, Patient, Receptionist
class PatientListSerializer(serializers.ModelSerializer):
    full_name = serializers.CharField(read_only=True)
    username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = Patient
        fields = [
            'id',
            'patient_id',
            'full_name',
            'username',
            'dob',
            'phone',
            'address',
            'blood_group',
            'gender',
            'profile_image',
            'emergency_contact_name',
            'emergency_contact_phone',
            'created_at'
        ]
    def get_profile_image(self, obj):
        request = self.context.get('request')

        if obj.profile_image and request:
            return request.build_absolute_uri(obj.profile_image.url)

        return None


from rest_framework import serializers
from django.contrib.auth.models import User

class PatientCreateSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(write_only=True)
    last_name = serializers.CharField(write_only=True)
    username = serializers.CharField(write_only=True)  # email
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Patient
        fields = [
            'first_name',
            'last_name',
            'username',
            'password',
            'dob',
            'phone',
            'address',
            'blood_group',
            'gender',
            'profile_image',
            'emergency_contact_name',
            'emergency_contact_phone'
        ]

    def create(self, validated_data):
        first_name = validated_data.pop('first_name')
        last_name = validated_data.pop('last_name')
        username = validated_data.pop('username')
        password = validated_data.pop('password')

        # 🔹 Create User (IMPORTANT: use create_user)
        user = User.objects.create_user(
            username=username,
            password=password,
            first_name=first_name,
            last_name=last_name
        )

        # 🔹 Create Patient
        patient = Patient.objects.create(user=user, **validated_data)

        return patient







class DoctorBasicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = ['name','doctor_id', 'specialty', 'profile_image'] 
class AppointmentFilteredSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ['doctor_id', 'doctor_name', 'date', 'time']
from rest_framework import serializers
from accounts.models import Patient



from rest_framework import serializers
from accounts.models import Appointment
from accounts.models import Patient

class AppointmentCreateSerializer(serializers.ModelSerializer):
    patient_id = serializers.CharField(write_only=True)

    class Meta:
        model = Appointment
        fields = [
            'patient_id',
            'department_name',
            'doctor_name',
            'doctor_id',
            'date',
            'time',
            'reason',
            'status'
        ]

    def create(self, validated_data):
        patient_id = validated_data.pop('patient_id')

        try:
            patient = Patient.objects.get(patient_id=patient_id)
        except Patient.DoesNotExist:
            raise serializers.ValidationError({"patient_id": "Patient not found"})

        return Appointment.objects.create(patient=patient, **validated_data)
    

from rest_framework import serializers
from accounts.models import Appointment

class AppointmentListSerializer(serializers.ModelSerializer):
    patient_id = serializers.CharField(source='patient.patient_id', read_only=True)
    patient_name = serializers.CharField(source='patient.full_name', read_only=True)

    class Meta:
        model = Appointment
        fields = [
            'id',
            'patient_id',
            'patient_name',
            'department_name',
            'doctor_name',
            'doctor_id',
            'date',
            'time',
            'reason',
            'status',
            'created_at'
        ]