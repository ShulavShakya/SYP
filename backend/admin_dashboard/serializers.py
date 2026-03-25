from rest_framework import serializers
from accounts.models import Doctor, Patient, Receptionist

class DoctorSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = Doctor
        fields = [
            'id',
            "doctor_id",
            "name",
            "username",
            "email",
            "address",
            "profile_image",
            "gender",
            "dob",
            "shift",
            "phone",
            "specialty",
            "status",
            "experience_years",
            "qualifications",
            "availability_days",
            "created_at",
            "updated_at",
        ]
    def get_profile_image(self, obj):
        request = self.context.get("request")
        if obj.profile_image:
            if request:
                return request.build_absolute_uri(obj.profile_image.url)
            return obj.profile_image.url
        return None
class DoctorCountSerializer(serializers.Serializer):
    total_doctors = serializers.IntegerField()
class ActiveDoctorSerializer(serializers.Serializer):
    active_doctors = serializers.IntegerField()
class OnLeaveDoctorSerializer(serializers.Serializer):
    on_leave_doctors = serializers.IntegerField()

class PatientCountSerializer(serializers.Serializer):
    total_patients = serializers.IntegerField()
from rest_framework import serializers



from rest_framework import serializers
from accounts.models import Patient

class PatientSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    name = serializers.SerializerMethodField()
    profile_image = serializers.SerializerMethodField()

    class Meta:
        model = Patient
        fields = [
            "id",
            "patient_id",
            "username",
            "name",
            "dob",
            "phone",
            "address",
            "blood_group",
            "gender",
            "profile_image",
            "emergency_contact_name",
            "emergency_contact_phone",
            "created_at",
        ]

    def get_name(self, obj):
        first = obj.user.first_name or ""
        last = obj.user.last_name or ""
        full_name = f"{first} {last}".strip()
        return full_name if full_name else obj.user.username

    def get_profile_image(self, obj):
        request = self.context.get("request")
        if obj.profile_image:
            if request:
                return request.build_absolute_uri(obj.profile_image.url)
            return obj.profile_image.url
        return None
class ReceptionistListSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    profile_image = serializers.SerializerMethodField()

    class Meta:
        model = Receptionist
        fields = [
            "id",
            "Receptionist_id",
            "username",
            "name",
            "email",
            "phone",
            "gender",
            "dob",
            "address",
            "profile_image",
            "shift",
            "status",
            "created_at",
            "updated_at",
        ]

    def get_profile_image(self, obj):
        request = self.context.get("request")
        if obj.profile_image:
            if request:
                return request.build_absolute_uri(obj.profile_image.url)
            return obj.profile_image.url
        return None
from django.contrib.auth.models import User
from accounts.models import Doctor
class DoctorCreateSerializer(serializers.ModelSerializer):
    # User fields
    username = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Doctor
        fields = [
            'profile_image',
            'name',
            'gender',
            'dob',
            'phone',
            'email',
            'address',
            'specialty',
            'experience_years',
            'qualifications',
            'availability_days',
            'shift',
            'username',
            'password'
        ]

    def create(self, validated_data):
        username = validated_data.pop('username')
        password = validated_data.pop('password')

        # Create User
        user = User.objects.create_user(
            username=username,
            password=password
        )

        # Create Doctor
        doctor = Doctor.objects.create(
            user=user,
            **validated_data
        )
        
        return doctor


from rest_framework import serializers
from django.contrib.auth.models import User
from accounts.models import Receptionist

class ReceptionistCreateSerializer(serializers.ModelSerializer):
    # User fields
    username = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Receptionist
        fields = [
            'profile_image',
            'name',
            'gender',
            'dob',
            'phone',
            'email',
            'address',
            'shift',
            'username',
            'password'
        ]

    def validate_shift(self, value):
        return value.upper()  # allow "Evening", "evening", etc.

    def create(self, validated_data):
        username = validated_data.pop('username')
        password = validated_data.pop('password')

        # Create User
        user = User.objects.create_user(
            username=username,
            password=password
        )

        # Create Receptionist
        receptionist = Receptionist.objects.create(
            user=user,
            **validated_data
        )

        return receptionist
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