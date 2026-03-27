from django.urls import path

from .views import create_consultation, doctor_appointments, get_doctor_info, get_doctor_ratings,update_doctor_profile


urlpatterns = [
    path('appointments/', doctor_appointments, name='doctor_appointments'),
    path('consultation/', create_consultation, name='create_consultation'),
    path('ratings/', get_doctor_ratings, name='get_doctor_ratings'),
    path('profile-update/', update_doctor_profile, name='update_doctor_profile'),
    path('info/', get_doctor_info, name='get_doctor_info')
]