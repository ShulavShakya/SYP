from django.urls import path
from .views import count_active_doctors, count_on_leave_doctors, count_patients,  get_all_doctors, count_doctors, get_all_patients, get_receptionists, off_duty_receptionists, on_duty_receptionists, total_receptionists
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
      ]