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