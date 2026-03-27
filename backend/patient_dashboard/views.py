from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from accounts.models import Patient
from .serializer import ChangePasswordSerializer, DoctorBasicSerializer, PatientProfileSerializer



#sdfghjgfdsghjgfdsfghj

from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from accounts.models import Doctor
from .serializer import DoctorBasicSerializer
@api_view(['GET'])
@authentication_classes([])  # no auth required
@permission_classes([AllowAny])
def get_doctors_basic(request):
    doctors = Doctor.objects.all()
    serializer = DoctorBasicSerializer(doctors, many=True, context={'request': request})
    return Response(serializer.data)

import base64
import hashlib
import hmac
import json
import uuid
from decimal import Decimal

import requests
from django.shortcuts import redirect
from django.conf import settings
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status

from .serializer import AppointmentPaymentSerializer
from accounts.models import Appointment, Payment, Patient

ESEWA_FORM_URL = "https://rc-epay.esewa.com.np/api/epay/main/v2/form"
ESEWA_STATUS_URL = "https://rc.esewa.com.np/api/epay/transaction/status/"
ESEWA_PRODUCT_CODE = "EPAYTEST"
ESEWA_SECRET_KEY = "8gBm/:&EnhH.1/q"

FRONTEND_BASE_URL = "http://localhost:5173"


def generate_esewa_signature(total_amount: str, transaction_uuid: str, product_code: str) -> str:
    message = f"total_amount={total_amount},transaction_uuid={transaction_uuid},product_code={product_code}"
    digest = hmac.new(
        ESEWA_SECRET_KEY.encode("utf-8"),
        message.encode("utf-8"),
        hashlib.sha256,
    ).digest()
    return base64.b64encode(digest).decode("utf-8")


def verify_esewa_signature(signed_field_names: str, payload: dict, signature: str) -> bool:
    message = ",".join(
        f"{field}={payload[field]}"
        for field in signed_field_names.split(",")
    )
    digest = hmac.new(
        ESEWA_SECRET_KEY.encode("utf-8"),
        message.encode("utf-8"),
        hashlib.sha256,
    ).digest()
    expected = base64.b64encode(digest).decode("utf-8")
    return hmac.compare_digest(expected, signature)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def initiate_payment(request):
    serializer = AppointmentPaymentSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    data = serializer.validated_data
    transaction_uuid = str(uuid.uuid4())

    amount = str(data["amount"])
    tax_amount = "0"
    product_service_charge = "0"
    product_delivery_charge = "0"
    total_amount = amount

    success_url = request.build_absolute_uri("/api/patient/payment/success/")
    failure_url = request.build_absolute_uri("/api/patient/payment/failure/")

    request.session[transaction_uuid] = {
        "user_id": request.user.id,
        "department_name": data["department_name"],
        "doctor_name": data["doctor_name"],
        "date": str(data["date"]),
        "time": str(data["time"]),
        "reason": data.get("reason", ""),
        "amount": amount,
    }
    request.session.modified = True

    signature = generate_esewa_signature(
        total_amount=total_amount,
        transaction_uuid=transaction_uuid,
        product_code=ESEWA_PRODUCT_CODE,
    )

    return Response(
        {
            "gateway_url": ESEWA_FORM_URL,
            "fields": {
                "amount": amount,
                "tax_amount": tax_amount,
                "total_amount": total_amount,
                "transaction_uuid": transaction_uuid,
                "product_code": ESEWA_PRODUCT_CODE,
                "product_service_charge": product_service_charge,
                "product_delivery_charge": product_delivery_charge,
                "success_url": success_url,
                "failure_url": failure_url,
                "signed_field_names": "total_amount,transaction_uuid,product_code",
                "signature": signature,
            },
            "transaction_uuid": transaction_uuid,
        },
        status=status.HTTP_200_OK,
    )


@api_view(["GET"])
@authentication_classes([])
@permission_classes([AllowAny])
def payment_success(request):
    data_b64 = request.GET.get("data")
    if not data_b64:
        return Response({"message": "Missing payment response."}, status=400)

    try:
        decoded = base64.b64decode(data_b64).decode("utf-8")
        payload = json.loads(decoded)
    except Exception:
        return Response({"message": "Invalid payment response."}, status=400)

    required = [
        "status",
        "transaction_uuid",
        "total_amount",
        "product_code",
        "signed_field_names",
        "signature",
    ]
    if not all(k in payload for k in required):
        return Response({"message": "Incomplete payment response."}, status=400)

    if not verify_esewa_signature(
        payload["signed_field_names"],
        payload,
        payload["signature"],
    ):
        return Response({"message": "Invalid payment signature."}, status=400)

    if payload["status"] != "COMPLETE":
        return redirect(f"{FRONTEND_BASE_URL}/patient/payment/failure")

    transaction_uuid = payload["transaction_uuid"]
    session_data = request.session.get(transaction_uuid)
    if not session_data:
        return Response({"message": "No pending appointment found."}, status=404)

    # Server-to-server verification
    verify_resp = requests.get(
        ESEWA_STATUS_URL,
        params={
            "product_code": ESEWA_PRODUCT_CODE,
            "total_amount": payload["total_amount"],
            "transaction_uuid": transaction_uuid,
        },
        timeout=10,
    )
    verify_resp.raise_for_status()
    verify_data = verify_resp.json()

    if verify_data.get("status") != "COMPLETE":
        return Response({"message": "Payment verification failed."}, status=400)

    completed_key = f"{transaction_uuid}_completed"
    if request.session.get(completed_key):
        return redirect(
            f"{FRONTEND_BASE_URL}/patient/payment/success"
            f"?transaction_uuid={transaction_uuid}"
            f"&refId={verify_data.get('ref_id', '')}"
        )

    patient = Patient.objects.get(user_id=session_data["user_id"])

    appointment = Appointment.objects.create(
        patient=patient,
        department_name=session_data["department_name"],
        doctor_name=session_data["doctor_name"],
        date=session_data["date"],
        time=session_data["time"],
        reason=session_data.get("reason", ""),
        status="SCHEDULED",
    )

    payment = Payment.objects.create(
        user_id=session_data["user_id"],
        appointment=appointment,
        transaction_uuid=transaction_uuid,
        amount=Decimal(session_data["amount"]),
        total_amount=Decimal(session_data["amount"]),
        status="SUCCESS",
    )

    del request.session[transaction_uuid]
    request.session[completed_key] = True
    request.session.modified = True

    return redirect(
        f"{FRONTEND_BASE_URL}/patient/payment/success"
        f"?appointment_id={appointment.id}"
        f"&payment_id={payment.id}"
        f"&transaction_uuid={transaction_uuid}"
        f"&refId={verify_data.get('ref_id', '')}"
    )


@api_view(["GET"])
@authentication_classes([])
@permission_classes([AllowAny])
def payment_failure(request):
    return redirect(f"{FRONTEND_BASE_URL}/patient/payment/failure")

from .serializer import PatientProfileSerializer
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_patient_basic_info(request):
    try:
        patient = Patient.objects.get(user=request.user)  
    except Patient.DoesNotExist:
        return Response({"error": "Patient not found"}, status=404)

    serializer = PatientProfileSerializer(patient)
    return Response(serializer.data)


from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from accounts.models import Patient
from .serializer import  PatientUpdateSerializer

@api_view(['PUT', 'PATCH'])
@permission_classes([IsAuthenticated])
def update_patient_profile(request):
    try:
        patient = Patient.objects.get(user=request.user)
    except Patient.DoesNotExist:
        return Response({"error": "Patient not found"}, status=404)

    serializer = PatientUpdateSerializer(
        patient,
        data=request.data,
        partial=True   # 🔥 allows partial updates
    )

    if serializer.is_valid():
        serializer.save()
        return Response({
            "message": "Profile updated successfully",
            "data": serializer.data
        })

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def change_password(request):
    serializer = ChangePasswordSerializer(data=request.data)

    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    user = request.user

    old_password = serializer.validated_data['old_password']
    new_password = serializer.validated_data['new_password']

    # 🔹 Check old password
    if not user.check_password(old_password):
        return Response(
            {"error": "Old password is incorrect"},
            status=status.HTTP_400_BAD_REQUEST
        )

    # 🔹 Update password (IMPORTANT)
    user.set_password(new_password)
    user.save()

    return Response({"message": "Password updated successfully"})

from rest_framework.decorators import api_view
from rest_framework.response import Response
from accounts.models import Doctor
from .serializer import DoctorListSerializer

@api_view(['GET'])
def get_all_doctors(request):
    doctors = Doctor.objects.all()
    serializer = DoctorListSerializer(doctors, many=True)
    return Response(serializer.data)
from rest_framework.decorators import api_view
from rest_framework.response import Response
from accounts.models import Appointment
from .serializer import AppointmentFilteredSerializer

@api_view(['GET'])
def get_active_appointments(request):
    appointments = Appointment.objects.filter(
        status__in=['PENDING', 'SCHEDULED']
    ).order_by('date', 'time')

    serializer = AppointmentFilteredSerializer(appointments, many=True)
    return Response(serializer.data)



from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from accounts.models import Appointment
from .serializer import AppointmentCreateSerializer
from accounts.models import Patient  # adjust if needed

@api_view(['POST'])
def create_appointment(request):
    try:
        patient = Patient.objects.get(user=request.user)
    except Patient.DoesNotExist:
        return Response({"error": "Patient not found"}, status=400)

    serializer = AppointmentCreateSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save(patient=patient)  # ✅ link via FK
        return Response(
            {
                "message": "Appointment created successfully",
                "data": serializer.data
            },
            status=status.HTTP_201_CREATED
        )

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)





from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from accounts.models import Appointment

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_patient_appointments(request):
    try:
        patient = request.user.patient

        appointments = Appointment.objects.filter(
            patient=patient
        ).values(
            "id",
            "department_name",
            "doctor_name",
            "doctor_id",
            "date",
            "time",
            "reason",
            "status",
            "sstatus",
            "created_at",
            "updated_at"
        ).order_by('-created_at')

        return Response({
            "message": "Appointments fetched successfully",
            "data": list(appointments)
        })

    except AttributeError:
        return Response({
            "error": "Patient profile not found for this user"
        }, status=400)

    except Exception as e:
        return Response({
            "error": str(e)
        }, status=500)