from django.urls import path
from .views import (
    change_password,
    create_appointment,
    get_active_appointments,
    get_all_doctors,
    get_doctors_basic,
    get_patient_appointments,
    get_patient_basic_info,
    initiate_payment,
    payment_failure,
   payment_success,
    update_patient_profile
)

urlpatterns = [
    # 🔹 Patient profile
 
    # newwww
     path('doctors/basic/', get_doctors_basic, name='get_doctors_basic'),
    path('payment/initiate/', initiate_payment, name='initiate_payment'),
   path('payment/success/', payment_success, name='payment_success'),
    path('payment/failure/', payment_failure, name='payment_failure'),
     path('patient/profile-card/', get_patient_basic_info, name='get_patient_basic_info'),
     path('patient/update/', update_patient_profile, name='update_patient_profile'),
     path('patient/change-password/',change_password, name='change_password'),
     #appointment
     path('doctors/', get_all_doctors, name='get_all_doctors'),
     path('date-time/', get_active_appointments, name='get_active_appointments'),
     path('create-appointment/', create_appointment, name='create_appointment'),
     path('appointments/', get_patient_appointments, name='get_patient_appointments'),
] 
