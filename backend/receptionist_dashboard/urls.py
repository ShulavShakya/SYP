from django.urls import path
from .views import create_patient, get_all_appointments, get_all_patients, get_all_payments,update_receptionist_profile, get_doctors_basic, get_patients,get_active_appointments,  receptionist_create_appointment, update_appointment_sstatus, get_logged_in_receptionist
urlpatterns = [
    path('patients/', get_patients, name='get_patients'),
    path('patient/create/', create_patient, name='create_patient'),
    #appointment
    path('doctors/basic/', get_doctors_basic, name='get_doctors_basic'),
    path('appointments/active/', get_active_appointments, name='get_active_appointments'),
    path('search-patients/', get_all_patients, name='get_all_patients'),
    path('appointments/create/', receptionist_create_appointment, name='receptionist_create_appointment'),
    path('appointments/', get_all_appointments, name='get_all_appointments'),
    path('appointments/<int:appointment_id>/yes/', update_appointment_sstatus, name='update_appointment_sstatus'),
    #billing
    path('billing/', get_all_payments, name='get_all_payments'),

    path('info/', get_logged_in_receptionist, name='get_logged_in_receptionist'),
    path('update-profile/', update_receptionist_profile, name='update_receptionist_profile')
      ]