from django.urls import path
from .views import create_patient, get_patients
urlpatterns = [
    path('patients/', get_patients, name='get_patients'),
    path('patient/create/', create_patient, name='create_patient'),
      ]