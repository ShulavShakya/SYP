from django.db import models

from django.contrib.auth.models import User
from django.db import models

# -----------------------------
# Patient
# -----------------------------
from django.db import models
from django.contrib.auth.models import User

class Patient(models.Model):
    BLOOD_GROUP_CHOICES = [
        ('A+', 'A+'),
        ('A-', 'A-'),
        ('B+', 'B+'),
        ('B-', 'B-'),
        ('AB+', 'AB+'),
        ('AB-', 'AB-'),
        ('O+', 'O+'),
        ('O-', 'O-'),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    dob = models.DateField()
    phone = models.CharField(max_length=15)
    address = models.TextField()
    blood_group = models.CharField(max_length=3, choices=BLOOD_GROUP_CHOICES, blank=True, null=True)
    profile_image = models.ImageField(upload_to='media/profile_images/patient/', blank=True, null=True)

    def __str__(self):
        return f"{self.user.username} (Patient)"

# -----------------------------
# Doctor
# -----------------------------
class Doctor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    specialty = models.CharField(max_length=100)
    phone = models.CharField(max_length=15)

    def __str__(self):
        return f"Dr. {self.user.username}"


# -----------------------------
# Receptionist
# -----------------------------
class Receptionist(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone = models.CharField(max_length=15)

    def __str__(self):
        return f"{self.user.username} (Receptionist)"


# -----------------------------
# Admin 
# -----------------------------
class Admin(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    def __str__(self):
        return f"{self.user.username} (Admin)"



# -----------------------------
# Conversation
# -----------------------------
class Conversation(models.Model):
    patient = models.OneToOneField(
        Patient,
        on_delete=models.CASCADE,
        related_name="conversation"
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Chat: {self.patient.user.username}"
# -----------------------------
# Message
# -----------------------------

class Message(models.Model):
    conversation = models.ForeignKey(
        Conversation,
        on_delete=models.CASCADE,
        related_name="messages"
    )
    sender = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    class Meta:
        ordering = ['timestamp']

    def __str__(self):
        return f"{self.sender.username}: {self.content[:20]}"
    
from django.db import models
from django.contrib.auth.models import User

class Payment(models.Model):
    STATUS_CHOICES = (
        ("PENDING", "Pending"),
        ("SUCCESS", "Success"),
        ("FAILED", "Failed"),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    appointment = models.OneToOneField("Appointment", on_delete=models.CASCADE)

    transaction_uuid = models.CharField(max_length=100, unique=True)

    amount = models.DecimalField(max_digits=10, decimal_places=2)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)

    status = models.CharField(max_length=10, default="PENDING")

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.transaction_uuid
# -----------------------------
# Appointment
# -----------------------------
class Appointment(models.Model):
    patient = models.ForeignKey(
        Patient,
        on_delete=models.CASCADE,
        related_name='appointments'
    )

    department_name = models.CharField(max_length=100)
    doctor_name = models.CharField(max_length=100)

    date = models.DateField()
    time = models.TimeField()
    reason = models.CharField(max_length=255, blank=True)
    status = models.CharField(max_length=20, default="PENDING")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.patient.user.username} - Dr. {self.doctor_name} ({self.department_name}) on {self.date} at {self.time}"