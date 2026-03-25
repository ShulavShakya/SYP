from django.urls import path
from .views import count_active_doctors, count_on_leave_doctors, count_patients, create_doctor,delete_doctor, create_patient, create_receptionist, delete_patient,delete_receptionist, get_all_appointments,  get_all_doctors, count_doctors, get_all_patients, get_receptionists, off_duty_receptionists, on_duty_receptionists, total_receptionists, update_doctor, update_patient, update_receptionist
urlpatterns = [
    #doctor related endpoints
    path('doctors/', get_all_doctors, name='get_all_doctors'),
    path('doctors/count/', count_doctors, name='count_doctors'),
    path('doctors/active/count/', count_active_doctors, name='count_active_doctors'),
    path('doctors/on-leave/count/', count_on_leave_doctors, name='count_on_leave_doctors'),
    #patient related endpoints
    path('patients/count/', count_patients, name='count_patients'),
    path('patients/', get_all_patients, name='get_all_patients'),
    #receptionist related endpoints
    path('receptionists/count/on-duty/', on_duty_receptionists, name='on_duty_receptionists'),
    path('receptionists/count/off-duty/', off_duty_receptionists, name='off_duty_receptionists'),
    path('receptionists/count/', total_receptionists, name='total_receptionists '),
    path('receptionists/', get_receptionists, name='get_all_receptionists'),
    #add
    path('create-doctor/', create_doctor, name='create_doctor'),
    path('create-receptionist/', create_receptionist, name='create_receptionist'),
    path('create-patient/', create_patient, name='create_patient'),
    path('delete-patient/<int:patient_id>/', delete_patient, name='delete_patient'),
    path('delete-receptionist/<int:receptionist_id>/', delete_receptionist, name='delete_receptionist'),
    path('delete-doctor/<int:doctor_id>/', delete_doctor, name='delete_doctor'),
    path('update-receptionist/<int:receptionist_id>/', update_receptionist, name='update_receptionist'),
    path('update-doctor/<int:doctor_id>/', update_doctor, name='update_doctor'),
    path('update-patient/<int:patient_id>/', update_patient, name='update_patient'),
    #appointments
       path('appointments/', get_all_appointments, name='get_all_appointments'),
      ]