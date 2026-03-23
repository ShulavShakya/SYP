from rest_framework import serializers
from accounts.models import Doctor, Patient, Receptionist

class DoctorSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = Doctor
        fields = [
            "doctor_id",
            "name",
            "username",
            "phone",
            "specialty",
            "status",
            "experience_years",
        ]
class DoctorCountSerializer(serializers.Serializer):
    total_doctors = serializers.IntegerField()
class ActiveDoctorSerializer(serializers.Serializer):
    active_doctors = serializers.IntegerField()
class OnLeaveDoctorSerializer(serializers.Serializer):
    on_leave_doctors = serializers.IntegerField()

class PatientCountSerializer(serializers.Serializer):
    total_patients = serializers.IntegerField()
from rest_framework import serializers



class PatientListSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()

    class Meta:
        model = Patient
        fields = ['patient_id', 'name', 'gender', 'phone', 'blood_group']

    def get_name(self, obj):
        return f"{obj.user.first_name} {obj.user.last_name}".strip()
    

class ReceptionistListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Receptionist
        fields = [
            "Receptionist_id",
            "name",
            "phone",
            "shift",
            "status",
        ]