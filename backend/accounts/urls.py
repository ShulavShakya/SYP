from django.urls import path
from .views import (
     login_user,
    patient_dashboard, DoctorDashboardView,
    ReceptionistDashboardView,AppointmentView, AdminDashboardView, register_patient, 
)

urlpatterns = [
    path('register-patient/', register_patient, name='register-patient'),
    path('login/', login_user, name='login'),
    path('dashboard/patient/', patient_dashboard, name='patient_dashboard'),
    path('dashboard/doctor/', DoctorDashboardView.as_view(), name='doctor_dashboard'),
    path('dashboard/receptionist/', ReceptionistDashboardView.as_view(), name='receptionist_dashboard'),
    path('dashboard/admin/', AdminDashboardView.as_view(), name='admin_dashboard'),
    path('appointments/', AppointmentView.as_view(), name='appointments_list'),  

]