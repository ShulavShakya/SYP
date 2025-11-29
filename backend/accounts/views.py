from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from django.contrib.auth import get_user_model

from .serializers import PatientRegisterSerializer, MyTokenObtainPairSerializer
from .permissions import IsAdmin, IsDoctor, IsReceptionist, IsPatient

User = get_user_model()

class PatientRegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = PatientRegisterSerializer

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class AdminDashboardView(APIView):
    permission_classes = [IsAuthenticated, IsAdmin]
    def get(self, request):
        return Response({"message": f"Welcome Admin {request.user.username}!"})

class DoctorDashboardView(APIView):
    permission_classes = [IsAuthenticated, IsDoctor]
    def get(self, request):
        return Response({"message": f"Welcome Doctor {request.user.username}!"})

class ReceptionistDashboardView(APIView):
    permission_classes = [IsAuthenticated, IsReceptionist]
    def get(self, request):
        return Response({"message": f"Welcome Receptionist {request.user.username}!"})

class PatientDashboardView(APIView):
    permission_classes = [IsAuthenticated, IsPatient]
    def get(self, request):
        return Response({"message": f"Welcome Patient {request.user.username}!"})
