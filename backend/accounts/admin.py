from django.contrib import admin
from .models import Patient, Doctor, Receptionist, Admin, Appointment

admin.site.register(Patient)
admin.site.register(Doctor)
admin.site.register(Receptionist)
admin.site.register(Admin)
admin.site.register(Appointment)