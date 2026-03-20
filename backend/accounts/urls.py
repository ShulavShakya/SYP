from django.urls import path
from .views import (
    PatientRegisterView, LoginView,
    PatientDashboardView, DoctorDashboardView,
    ReceptionistDashboardView,AppointmentView, AdminDashboardView, 
)

urlpatterns = [
    path('register/', PatientRegisterView.as_view(), name='patient_register'),
    path('login/', LoginView.as_view(), name='login'),
    path('dashboard/patient/', PatientDashboardView.as_view(), name='patient_dashboard'),
    path('dashboard/doctor/', DoctorDashboardView.as_view(), name='doctor_dashboard'),
    path('dashboard/receptionist/', ReceptionistDashboardView.as_view(), name='receptionist_dashboard'),
    path('dashboard/admin/', AdminDashboardView.as_view(), name='admin_dashboard'),
    path('appointments/', AppointmentView.as_view(), name='appointments_list'),  

]