from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from accounts.models import Patient


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_patient_info(request): 
    try:


        patient = Patient.objects.get(user=request.user)

        data = {
            'name': f"{request.user.first_name} {request.user.last_name}",
            'email': request.user.email,
            'phone': patient.phone
        }

        return Response(data)

    except Patient.DoesNotExist:
        return Response({'error': 'Patient profile not found.'}, status=404)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_patient_info(request):
    user = request.user

    try:
        patient = Patient.objects.get(user=user)
    except Patient.DoesNotExist:
        return Response({'error': 'Patient profile not found.'}, status=404)

    data = request.data

    # Update user fields
    user.first_name = data.get('first_name', user.first_name)
    user.last_name = data.get('last_name', user.last_name)
    user.email = data.get('email', user.email)
    user.save()

    # Update patient fields
    patient.phone = data.get('phone', patient.phone)
    patient.address = data.get('address', patient.address)
    patient.save()

    return Response({'message': 'Patient information updated successfully.'})


from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import check_password

@api_view(['POST'])
def change_patient_password(request):
    user = request.user

    # Check if user is a patient
    if not hasattr(user, 'patient'):
        return Response(
            {"error": "Only patients can change password"},
            status=status.HTTP_403_FORBIDDEN
        )

    current_password = request.data.get('current_password')
    new_password = request.data.get('new_password')
    confirm_password = request.data.get('confirm_new_password')

    # Check if current password is correct
    if not user.check_password(current_password):
        return Response(
            {"error": "Current password is incorrect"},
            status=status.HTTP_400_BAD_REQUEST
        )

    # Check if new passwords match
    if new_password != confirm_password:
        return Response(
            {"error": "New passwords do not match"},
            status=status.HTTP_400_BAD_REQUEST
        )

    # Update password
    user.set_password(new_password)
    user.save()

    return Response(
        {"message": "Password updated successfully"},
        status=status.HTTP_200_OK
    )

import uuid
from django.shortcuts import redirect
from accounts.models import Appointment, Payment


from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.conf import settings
from django.http import HttpResponse

import uuid
import base64
import hashlib
import requests

from .models import Payment
from accounts.serializers import AppointmentSerializer


#  1. CREATE APPOINTMENT + PAYMENT (API)
@api_view(['POST'])
def create_appointment_and_pay(request):
    serializer = AppointmentSerializer(data=request.data)

    if serializer.is_valid():
        #  get logged-in patient
        patient = request.user.patient

        #  1. Create appointment
        appointment = serializer.save(patient=patient)

        #  2. Create payment
        transaction_uuid = str(uuid.uuid4())

        payment = Payment.objects.create(
            user=request.user,
            appointment=appointment,
            transaction_uuid=transaction_uuid,
            amount=1000,        
            total_amount=1000,
            status="PENDING"
        )

        #  3. Generate eSewa signature
        message = f"total_amount={payment.total_amount},transaction_uuid={payment.transaction_uuid},product_code={settings.ESEWA_PRODUCT_CODE}"

        signature = base64.b64encode(
            hashlib.sha256(message.encode()).digest()
        ).decode()

        #  4. Send response (frontend will redirect)
        return Response({
            "message": "Appointment created. Proceed to payment.",
            "payment_url": settings.ESEWA_BASE_URL,
            "data": {
                "amount": payment.amount,
                "tax_amount": 0,
                "total_amount": payment.total_amount,
                "transaction_uuid": payment.transaction_uuid,
                "product_code": settings.ESEWA_PRODUCT_CODE,
                "product_service_charge": 0,
                "product_delivery_charge": 0,
                "success_url": "http://127.0.0.1:8000/api/appointments/payment-success/",
                "failure_url": "http://127.0.0.1:8000/api/appointments/payment-failed/",
                "signed_field_names": "total_amount,transaction_uuid,product_code",
                "signature": signature
            }
        })

    return Response(serializer.errors, status=400)


#  2. PAYMENT SUCCESS (called by eSewa)
def payment_success(request):
    transaction_uuid = request.GET.get("transaction_uuid")

    if not transaction_uuid:
        return HttpResponse("Missing transaction UUID ")

    try:
        payment = Payment.objects.get(transaction_uuid=transaction_uuid)
    except Payment.DoesNotExist:
        return HttpResponse("Payment not found ")

    #  Verify with eSewa
    url = "https://rc-epay.esewa.com.np/api/epay/transaction/status/"

    res = requests.get(url, params={
        "product_code": settings.ESEWA_PRODUCT_CODE,
        "transaction_uuid": transaction_uuid
    })

    result = res.json()

    if result.get("status") == "COMPLETE":
        #  Update payment
        payment.status = "SUCCESS"
        payment.save()

        #  Confirm appointment
        appointment = payment.appointment
        appointment.status = "CONFIRMED"
        appointment.save()

        return HttpResponse(" Payment Successful. Appointment Confirmed 🎉")

    #  Failed case
    payment.status = "FAILED"
    payment.save()

    return HttpResponse(" Payment Verification Failed")


#  3. PAYMENT FAILED (called by eSewa)
def payment_failed(request):
    transaction_uuid = request.GET.get("transaction_uuid")

    if transaction_uuid:
        Payment.objects.filter(transaction_uuid=transaction_uuid).update(
            status="FAILED"
        )

    return HttpResponse(" Payment Failed")