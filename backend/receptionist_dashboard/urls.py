from django.urls import path
from .views import create_patient, get_all_appointments, get_all_patients, get_doctors_basic, get_patients,get_active_appointments, mark_sstatus_yes,  receptionist_create_appointment
urlpatterns = [
    path('patients/', get_patients, name='get_patients'),
    path('patient/create/', create_patient, name='create_patient'),
    #appointment
    path('doctors/basic/', get_doctors_basic, name='get_doctors_basic'),
    path('appointments/active/', get_active_appointments, name='get_active_appointments'),
    path('search-patients/', get_all_patients, name='get_all_patients'),
    path('appointments/create/', receptionist_create_appointment, name='receptionist_create_appointment'),
    path('appointments/', get_all_appointments, name='get_all_appointments'),
    path('appointments/<int:appointment_id>/yes/', mark_sstatus_yes, name='mark_sstatus_yes'),
      ]