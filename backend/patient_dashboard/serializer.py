# serializers.py
from rest_framework import serializers
from accounts.models import Doctor, Patient

class DoctorBasicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = ['name','doctor_id', 'specialty', 'profile_image'] 

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


from rest_framework import serializers
from accounts.models import Doctor

class DoctorListSerializer(serializers.ModelSerializer):
    doctor_name = serializers.CharField(source='name')

    class Meta:
        model = Doctor
        fields = ['doctor_id', 'doctor_name', 'specialty', 'profile_image']


from rest_framework import serializers
from accounts.models import Appointment

class AppointmentFilteredSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ['doctor_id', 'doctor_name', 'date', 'time','r_status']

from rest_framework import serializers
from accounts.models import Appointment

class AppointmentCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = [
            'department_name',
            'doctor_name',
            'doctor_id',
            'date',
            'time',
            'reason',
            'status',
            'r_status'
        ]
from rest_framework import serializers
from accounts.models import Payment

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ['id', 'appointment', 'patient', 'amount', 'status', 'khalti_token', 'created_at']
        read_only_fields = ['id', 'status', 'created_at', 'patient']

from rest_framework import serializers
from accounts.models import Payment

class AmountSerializer(serializers.ModelSerializer):
    appointment_id = serializers.IntegerField(source='appointment.id', read_only=True)

    class Meta:
        model = Payment
        fields = [
            'id',
            'appointment_id',
            'amount',
            'status',
            'payment_method',
            'pidx',
            'created_at'
        ]
from rest_framework import serializers
from accounts.models import Consultation
class ConsultationSerializer(serializers.ModelSerializer):
    doctor_name = serializers.SerializerMethodField()

    class Meta:
        model = Consultation
        fields = [
            'id', 'appointment', 'doctor_id', 'doctor_name', # Add doctor_name here
            'clinic_diagnosis', 'detailed_notes', 'medicine_name', 
            'dosage', 'frequency', 'duration', 'notes', 'created_at'
        ]

    def get_doctor_name(self, obj):
        # Access the name via the appointment relationship
        if obj.appointment and obj.appointment.doctor_name:
            return obj.appointment.doctor_name
        return "Unknown Doctor"



# serializers.py
from rest_framework import serializers
from accounts.models import Rating
\
from rest_framework import serializers
from accounts.models import Rating

class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ['consultation', 'doctor_id', 'star', 'comment']