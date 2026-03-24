# serializers.py
from rest_framework import serializers
from accounts.models import Doctor, Patient

class DoctorBasicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = ['name','doctor_id', 'specialty', 'profile_image']  # department = specialty

# serializers.py
from rest_framework import serializers

class AppointmentPaymentSerializer(serializers.Serializer):
    department_name = serializers.CharField(max_length=100)
    doctor_name = serializers.CharField(max_length=100)
    date = serializers.DateField()
    time = serializers.TimeField()
    reason = serializers.CharField(max_length=255, required=False, allow_blank=True)
    amount = serializers.DecimalField(max_digits=10, decimal_places=2)

class PatientProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    full_name = serializers.CharField(read_only=True)
    profile_image = serializers.ImageField(read_only=True)

    class Meta:
        model = Patient
        fields = [
            'username',
            'full_name',
            'phone',
            'profile_image'
        ]

from rest_framework import serializers

class PatientUpdateSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(source='user.first_name', required=False)
    last_name = serializers.CharField(source='user.last_name', required=False)
    phone = serializers.CharField(required=False)

    class Meta:
        model = Patient
        fields = ['first_name', 'last_name', 'phone']

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', {})

        # 🔹 Update User fields
        user = instance.user
        user.first_name = user_data.get('first_name', user.first_name)
        user.last_name = user_data.get('last_name', user.last_name)
        user.save()

        # 🔹 Update Patient fields
        instance.phone = validated_data.get('phone', instance.phone)
        instance.save()

        return instance

from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password

class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

    def validate_new_password(self, value):
        validate_password(value)
        return value