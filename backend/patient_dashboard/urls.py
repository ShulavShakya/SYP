from django.urls import path
from .views import (
    get_patient_info,
    update_patient_info,
    change_patient_password,
    create_appointment_and_pay,
    payment_success,
    payment_failed
)

urlpatterns = [
    # 🔹 Patient profile
    path("patient/", get_patient_info, name="get_patient_info"),
    path("patient/update/", update_patient_info, name="update_patient_info"),
    path("patient/change-password/", change_patient_password, name="change_patient_password"),

    path("appointment/book/", create_appointment_and_pay, name="create_appointment_and_pay"),
    path("payment/success/", payment_success, name="payment_success"),
    path("payment/failure/", payment_failed, name="payment_failed"),
] 