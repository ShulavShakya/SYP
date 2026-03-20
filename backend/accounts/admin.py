from django.contrib import admin
from .models import Patient, Doctor, Payment, Receptionist, Admin, Appointment, Message, Conversation

admin.site.register(Patient)
admin.site.register(Doctor)
admin.site.register(Receptionist)
admin.site.register(Admin)
admin.site.register(Appointment)
admin.site.register(Message)
admin.site.register(Conversation)
admin.site.register(Payment)

