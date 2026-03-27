from django.urls import path


from .views import (
    change_password,
    create_appointment,
    
    get_active_appointments,
    get_all_doctors,
    get_doctors_basic,
    get_my_consultations,
    get_my_ratings,
    get_patient_appointments,
    get_patient_basic_info,
    initiate_payment,
    mark_notifications_read,
    rate_doctor,

    update_patient_profile,
    verify_payment,
    get_my_payments
)

urlpatterns = [
    # 🔹 Patient profile
 
    # newwww
     path('doctors/basic/', get_doctors_basic, name='get_doctors_basic'),
    path('payment/initiate/', initiate_payment, name='initiate_payment'),

     path('patient/profile-card/', get_patient_basic_info, name='get_patient_basic_info'),
     path('patient/update/', update_patient_profile, name='update_patient_profile'),
     path('patient/change-password/',change_password, name='change_password'),
     #appointment
     path('doctors/', get_all_doctors, name='get_all_doctors'),
     path('date-time/', get_active_appointments, name='get_active_appointments'),
     path('create-appointment/', create_appointment, name='create_appointment'),
     path('appointments/', get_patient_appointments, name='get_patient_appointments'),
     #payment
    path('payment/initiate/', initiate_payment, name='khalti-initiate'),
    path('payment/verify/', verify_payment, name='khalti-verify'),
     path('payment/amount/',get_my_payments, name='get_my_payments'  ),
    
    path('consultations/', get_my_consultations, name='get-my-consultations'),

    path('rate-doctor/', rate_doctor, name='rate_doctor'),
    path('notifications/mark-read/', mark_notifications_read, name='mark-notifications-read'),
    path('ratings/', get_my_ratings, name='get_my_ratings')
] 
