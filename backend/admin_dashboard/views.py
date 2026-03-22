from time import timezone

from rest_framework.decorators import api_view, authentication_classes
from rest_framework.response import Response
from accounts.models import Doctor, Patient
from .serializers import DoctorSerializer, DoctorCountSerializer, ActiveDoctorSerializer, OnLeaveDoctorSerializer, PatientCountSerializer, ReceptionistListSerializer               
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

@api_view(['GET'])
@authentication_classes([])
@permission_classes([AllowAny])
def get_all_doctors(request):
    doctors = Doctor.objects.all()
    serializer = DoctorSerializer(doctors, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@authentication_classes([])
@permission_classes([AllowAny])
def count_doctors(request):
    count = Doctor.objects.count()
    serializer = DoctorCountSerializer({"total_doctors": count})
    return Response(serializer.data)


@api_view(['GET'])
@authentication_classes([])
@permission_classes([AllowAny])
def count_active_doctors(request):
    count = Doctor.objects.filter(status='ACTIVE').count()
    serializer = ActiveDoctorSerializer({"active_doctors": count})
    return Response(serializer.data)


@api_view(['GET'])
@authentication_classes([])
@permission_classes([AllowAny])
def count_on_leave_doctors(request):
    count = Doctor.objects.filter(status='ON_LEAVE').count()
    serializer = OnLeaveDoctorSerializer({"on_leave_doctors": count})
    return Response(serializer.data)


@api_view(['GET'])
@authentication_classes([])
@permission_classes([AllowAny])
def count_patients(request):
    total_patients = Patient.objects.count()
    serializer = PatientCountSerializer({
        "total_patients": total_patients
    })

    return Response(serializer.data)
from django.utils import timezone
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from accounts.models import Patient
from .serializers import PatientCountSerializer




from rest_framework.decorators import api_view
from rest_framework.response import Response
from accounts.models import Patient
from .serializers import PatientListSerializer

@api_view(['GET'])
@authentication_classes([])
@permission_classes([AllowAny])
def get_all_patients(request):
    patients = Patient.objects.all()
    serializer = PatientListSerializer(patients, many=True)

    return Response(serializer.data)


from rest_framework.decorators import api_view
from rest_framework.response import Response
from accounts.models import Receptionist


@api_view(['GET'])
@authentication_classes([])
@permission_classes([AllowAny])
def total_receptionists(request):
    count = Receptionist.objects.count()
    return Response({"total_receptionists": count})

@api_view(['GET'])
@authentication_classes([])
@permission_classes([AllowAny])
def on_duty_receptionists(request):
    count = Receptionist.objects.filter(status='ON_DUTY').count()
    return Response({"on_duty_receptionists": count})

@api_view(['GET'])
@authentication_classes([])
@permission_classes([AllowAny])
def off_duty_receptionists(request):
    count = Receptionist.objects.filter(status='ON_LEAVE').count()
    return Response({"off_duty_receptionists": count})

@api_view(['GET'])
@authentication_classes([])
@permission_classes([AllowAny])
def get_receptionists(request):
    queryset = Receptionist.objects.all()
    serializer = ReceptionistListSerializer(queryset, many=True)
    return Response(serializer.data)