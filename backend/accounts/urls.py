from django.urls import path
from .views import (
    PatientRegisterView, MyTokenObtainPairView,
    AdminDashboardView, DoctorDashboardView,
    ReceptionistDashboardView, PatientDashboardView
)
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('register/', PatientRegisterView.as_view(), name='patient_register'),
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('dashboard/admin/', AdminDashboardView.as_view(), name='admin_dashboard'),
    path('dashboard/doctor/', DoctorDashboardView.as_view(), name='doctor_dashboard'),
    path('dashboard/receptionist/', ReceptionistDashboardView.as_view(), name='receptionist_dashboard'),
    path('dashboard/patient/', PatientDashboardView.as_view(), name='patient_dashboard'),
]
