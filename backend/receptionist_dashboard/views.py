from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from accounts.models import Patient
from .serializer import PatientCreateSerializer, PatientListSerializer

@api_view(['GET'])
@permission_classes([AllowAny])  # ⚠️ change to IsAuthenticated or IsAdminUser in real apps
def get_patients(request):
    patients = Patient.objects.select_related('user').all().order_by('-created_at')
    serializer = PatientListSerializer(patients, many=True)
    return Response(serializer.data)


from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status

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