from django.urls import path
from .views import (
    change_password,
    get_doctors_basic,
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
] 
