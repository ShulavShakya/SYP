from time import timezone

from rest_framework.decorators import api_view, authentication_classes
from rest_framework.response import Response
from accounts.models import Doctor, Patient
from .serializers import DoctorSerializer, DoctorCountSerializer, ActiveDoctorSerializer, OnLeaveDoctorSerializer, PatientCountSerializer, PatientCreateSerializer, PatientSerializer, ReceptionistCreateSerializer, ReceptionistListSerializer               
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
from .serializers import PatientSerializer

@api_view(['GET'])
@authentication_classes([])
@permission_classes([AllowAny])
def get_all_patients(request):
    patients = Patient.objects.all()
    serializer = PatientSerializer(patients, many=True)

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




from .serializers import DoctorCreateSerializer
from rest_framework import status
@api_view(['POST'])
@authentication_classes([])
@permission_classes([AllowAny])
def create_doctor(request):
    serializer = DoctorCreateSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response({
            "message": "Doctor created successfully"
        }, status=status.HTTP_201_CREATED)
    print(serializer.errors) 
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@authentication_classes([])
@permission_classes([AllowAny])
def create_receptionist(request):
    serializer = ReceptionistCreateSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response({
            "message": "Receptionist created successfully"
        }, status=status.HTTP_201_CREATED)

    print(serializer.errors)  # debug
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def create_patient(request):
    serializer = PatientCreateSerializer(data=request.data)

    if serializer.is_valid():
        patient = serializer.save()

        return Response({
            "message": "Patient created successfully",
            "patient_id": patient.patient_id,
            "full_name": patient.full_name
        }, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.response import Response
from rest_framework import status

@api_view(['DELETE'])
@permission_classes([AllowAny])
def delete_patient(request, patient_id):
    try:
        patient = Patient.objects.select_related('user').get(id=patient_id)
    except Patient.DoesNotExist:
        return Response(
            {"error": "Patient not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    patient.user.delete()   # this also deletes Patient automatically because of CASCADE

    return Response(
        {"message": "Patient deleted successfully"},
        status=status.HTTP_200_OK
    )

@api_view(['DELETE'])
@permission_classes([AllowAny])
def delete_receptionist(request, receptionist_id):
    try:
        receptionist = Receptionist.objects.select_related('user').get(id=receptionist_id)
    except Receptionist.DoesNotExist:
        return Response(
            {"error": "Receptionist not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    receptionist.user.delete()  
    # This will also delete Receptionist automatically if user is OneToOneField with CASCADE

    return Response(
        {"message": "Receptionist deleted successfully"},
        status=status.HTTP_200_OK
    )
@api_view(['DELETE'])
@permission_classes([AllowAny])
def delete_doctor(request, doctor_id):
    try:
        doctor = Doctor.objects.select_related('user').get(id=doctor_id)
    except Doctor.DoesNotExist:
        return Response(
            {"error": "Doctor not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    doctor.user.delete()  
    # This will also delete Doctor automatically if user is OneToOneField with CASCADE

    return Response(
        {"message": "Doctor deleted successfully"},
        status=status.HTTP_200_OK
    )
from django.utils import timezone
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status

from accounts.models import Receptionist
from .serializers import ReceptionistListSerializer


@api_view(['PUT', 'PATCH'])
@permission_classes([AllowAny])
def update_receptionist(request, receptionist_id):
    try:
        receptionist = Receptionist.objects.select_related('user').get(id=receptionist_id)
    except Receptionist.DoesNotExist:
        return Response(
            {"error": "Receptionist not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    data = request.data
    user = receptionist.user

    # Update receptionist fields
    receptionist.name = data.get("name", receptionist.name)
    receptionist.phone = data.get("phone", receptionist.phone)
    receptionist.shift = data.get("shift", receptionist.shift)
    receptionist.dob = data.get("dob", receptionist.dob)
    receptionist.address = data.get("address", receptionist.address)
    receptionist.email = data.get("email", receptionist.email)
    receptionist.gender = data.get("gender", receptionist.gender)
    receptionist.updated_at = timezone.now()

    # Update profile image if sent
    if "profile_image" in request.FILES:
        receptionist.profile_image = request.FILES["profile_image"]

    # Update linked user fields
    user.username = data.get("username", user.username)
    user.email = data.get("email", user.email)

    # Update password only if provided
    password = data.get("password")
    if password:
        user.set_password(password)

    user.save()
    receptionist.save()

    serializer = ReceptionistListSerializer(
        receptionist,
        context={"request": request}
    )

    return Response(
        {
            "message": "Receptionist updated successfully",
            "data": serializer.data
        },
        status=status.HTTP_200_OK
    )
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.utils import timezone

@api_view(['PUT', 'PATCH'])
@permission_classes([AllowAny])
def update_doctor(request, doctor_id):
    try:
        doctor = Doctor.objects.select_related('user').get(id=doctor_id)
    except Doctor.DoesNotExist:
        return Response(
            {"error": "Doctor not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    data = request.data
    user = doctor.user

    # 🔹 Update Doctor fields
    doctor.name = data.get("name", doctor.name)
    doctor.phone = data.get("phone", doctor.phone)
    doctor.dob = data.get("dob", doctor.dob)
    doctor.address = data.get("address", doctor.address)
    doctor.email = data.get("email", doctor.email)
    doctor.gender = data.get("gender", doctor.gender)
    doctor.shift = data.get("shift", doctor.shift)
    doctor.specialty = data.get("specialty", doctor.specialty)
    doctor.status = data.get("status", doctor.status)
    doctor.experience_years = data.get("experience_years", doctor.experience_years)
    doctor.qualifications = data.get("qualifications", doctor.qualifications)

    # 🔹 MultiSelectField (important)
    if "availability_days" in data:
        doctor.availability_days = data.get("availability_days")

    doctor.updated_at = timezone.now()

    # 🔹 Profile Image
    if "profile_image" in request.FILES:
        doctor.profile_image = request.FILES["profile_image"]

    # 🔹 Update User fields
    user.username = data.get("username", user.username)
    

    # 🔹 Password update (only if provided)
    password = data.get("password")
    if password:
        user.set_password(password)

    user.save()
    doctor.save()

    serializer = DoctorSerializer(
        doctor,
        context={"request": request}
    )

    return Response(
        {
            "message": "Doctor updated successfully",
            "data": serializer.data
        },
        status=status.HTTP_200_OK
    )
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.utils import timezone

@api_view(['PUT', 'PATCH'])
@permission_classes([AllowAny])
def update_patient(request, patient_id):
    try:
        patient = Patient.objects.select_related('user').get(id=patient_id)
    except Patient.DoesNotExist:
        return Response(
            {"error": "Patient not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    data = request.data
    user = patient.user

    # 🔹 Update Patient fields
    patient.dob = data.get("dob", patient.dob)
    patient.phone = data.get("phone", patient.phone)
    patient.address = data.get("address", patient.address)
    patient.blood_group = data.get("blood_group", patient.blood_group)
    patient.gender = data.get("gender", patient.gender)
    patient.emergency_contact_name = data.get(
        "emergency_contact_name", patient.emergency_contact_name
    )
    patient.emergency_contact_phone = data.get(
        "emergency_contact_phone", patient.emergency_contact_phone
    )

    # 🔹 Profile Image
    if "profile_image" in request.FILES:
        patient.profile_image = request.FILES["profile_image"]

    # 🔹 Update User fields (IMPORTANT)
    user.username = data.get("username", user.username)
    user.first_name = data.get("first_name", user.first_name)
    user.last_name = data.get("last_name", user.last_name)
   
   

    # 🔹 Password update (optional)
    password = data.get("password")
    if password:
        user.set_password(password)

    user.save()
    patient.save()

    serializer = PatientSerializer(
        patient,
        context={"request": request}
    )

    return Response(
        {
            "message": "Patient updated successfully",
            "data": serializer.data
        },
        status=status.HTTP_200_OK
    )

from rest_framework.decorators import api_view
from rest_framework.response import Response
from accounts.models import Appointment
from .serializers import AppointmentListSerializer

@api_view(['GET'])
def get_all_appointments(request):
    appointments = Appointment.objects.all().order_by('-created_at')

    serializer = AppointmentListSerializer(appointments, many=True)

    return Response(serializer.data)