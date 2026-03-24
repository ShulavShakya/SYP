from rest_framework import serializers
from accounts.models import Patient, Receptionist
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