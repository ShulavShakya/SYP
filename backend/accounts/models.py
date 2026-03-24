from django.db import models

from django.contrib.auth.models import User
from django.db import models

# -----------------------------
# Patient
# -----------------------------
from django.db import models
from django.contrib.auth.models import User
from multiselectfield import MultiSelectField
class Patient(models.Model):
    BLOOD_GROUP_CHOICES = [
        ('A+', 'A+'), ('A-', 'A-'),
        ('B+', 'B+'), ('B-', 'B-'),
        ('AB+', 'AB+'), ('AB-', 'AB-'),
        ('O+', 'O+'), ('O-', 'O-'),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    patient_id = models.CharField(max_length=20, unique=True, blank=True, editable=False)
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    def save(self, *args, **kwargs):
        if not self.patient_id:
            last_patient = Patient.objects.all().order_by('id').last()

            if last_patient and last_patient.patient_id:
                last_number = int(last_patient.patient_id.replace("PAT", ""))
                new_number = last_number + 1
            else:
                new_number = 1

            self.patient_id = f"PAT{new_number:04d}"  # PAT0001, PAT0002...

        super().save(*args, **kwargs)
    dob = models.DateField()
    phone = models.CharField(max_length=15)
    address = models.TextField()
    blood_group = models.CharField(
        max_length=3,
        choices=BLOOD_GROUP_CHOICES,
        blank=True,
        null=True
    )
    GENDER_CHOICES = [
    ('Male', 'Male'),
    ('Female', 'Female'),
    ('Other', 'Other'),
    ]

    gender = models.CharField(
    max_length=10,
    choices=GENDER_CHOICES,
    blank=True,
    null=True
    )
    profile_image = models.ImageField(
        upload_to='profile_images/patient/',
        blank=True,
        null=True
    )

    emergency_contact_name = models.CharField(max_length=100, blank=True, null=True)
    emergency_contact_phone = models.CharField(max_length=15, blank=True, null=True)

    @property
    def full_name(self):
        return f"{self.user.first_name} {self.user.last_name}"

    def __str__(self):
        return self.full_name
# -----------------------------
# Doctor
# -----------------------------
class Doctor(models.Model):
    STATUS_CHOICES = [
        ('ACTIVE', 'Active'),
        ('ON_LEAVE', 'On Leave'),
        ('SUSPENDED', 'Suspended'),
    ]
    SHIFT_CHOICES = [
        ('MORNING', 'Morning'),
        ('EVENING', 'Evening'),
        ('NIGHT', 'Night'),
    ]
    profile_image = models.ImageField(
    upload_to='profile_images/doctor/',
    blank=True,
    null=True
    )
    gender = models.CharField(
    max_length=10,
    choices=[
        ('Male', 'Male'),
        ('Female', 'Female'),
        ('Other', 'Other'),
    ],
    blank=True,
    null=True
)
    from multiselectfield import MultiSelectField

    DAY_CHOICES = [
    ('MON','Mon'),
    ('TUE', 'Tue'), 
    ('WED', 'Wed'),
    ('THU', 'Thu'),
    ('FRI', 'Fri'),
    ('SAT', 'Sat'),
    ('SUN', 'Sun'),
]

    availability_days = MultiSelectField(
    choices=DAY_CHOICES,
    max_length=20,
    blank=True,
)

    dob = models.DateField()
    phone = models.CharField(max_length=15, default="n/a")
    name = models.CharField(max_length=100, default="n/a" )
    email = models.EmailField(default="n/a")
    address = models.TextField(default="n/a")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    qualifications = models.TextField(default="n/a")
    shift = models.CharField(
        max_length=10,
        choices=SHIFT_CHOICES,
        default='MORNING'
    )
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    specialty = models.CharField(max_length=100)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='ACTIVE')
    experience_years = models.PositiveIntegerField(default=0)
    doctor_id = models.CharField(max_length=20, unique=True, blank=True, editable=False)
    def save(self, *args, **kwargs):
        if not self.doctor_id:
            last_doctor = Doctor.objects.all().order_by('id').last()

            if last_doctor and last_doctor.doctor_id:
                last_number = int(last_doctor.doctor_id.replace("DOC", ""))
                new_number = last_number + 1
            else:
                new_number = 1

            self.doctor_id = f"DOC{new_number:04d}"  # DOC0001, DOC0002...

        super().save(*args, **kwargs)
    @property
    def full_name(self):
        return f"{self.user.first_name} {self.user.last_name}".strip()

    def __str__(self):
        return f"Dr. {self.full_name or self.user.username} ({self.doctor_id})"


# -----------------------------
# Receptionist
# -----------------------------
class Receptionist(models.Model):
    STATUS_CHOICES = [
        ('ON_DUTY', 'On Duty'),
        ('ON_LEAVE', 'On Leave'),
        ('OFF_DUTY', 'Off Duty'),
    ]
    SHIFT_CHOICES = [
        ('MORNING', 'Morning'),
        ('EVENING', 'Evening'),
        ('NIGHT', 'Night'),
    ]
    profile_image = models.ImageField(
        upload_to='profile_images/receptionist/',
        blank=True,
        null=True
    )
    email = models.EmailField(default="n/a")
    dob = models.DateField()
    address = models.TextField(default="n/a")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone = models.CharField(max_length=15)
    name = models.CharField(max_length=100, default="n/a" )
    gender = models.CharField(
    max_length=10,
    choices=[
        ('Male', 'Male'),
        ('Female', 'Female'),
        ('Other', 'Other'),
    ],
    blank=True,
    null=True
)
    status = models.CharField(
    max_length=10,
    choices=STATUS_CHOICES,
    default='ON_DUTY'
)
    shift = models.CharField(
        max_length=10,
        choices=SHIFT_CHOICES,
        default='MORNING'
    )

    Receptionist_id = models.CharField(max_length=20, unique=True, blank=True, editable=False)
    def save(self, *args, **kwargs):
        if not self.Receptionist_id:
            last_receptionist = Receptionist.objects.all().order_by('id').last()

            if last_receptionist and last_receptionist.Receptionist_id:
                last_number = int(last_receptionist.Receptionist_id.replace("REC", ""))
                new_number = last_number + 1
            else:
                new_number = 1

            self.Receptionist_id = f"REC{new_number:04d}"  # REC0001, REC0002...

        super().save(*args, **kwargs)
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
    patient = models.ForeignKey("Patient", on_delete=models.CASCADE)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Chat with {self.patient}"
# -----------------------------
# Message
# -----------------------------

class Message(models.Model):

    SENDER_TYPE_CHOICES = [
        ("PATIENT", "Patient"),
        ("RECEPTIONIST", "Receptionist"),
    ]

    conversation = models.ForeignKey(
        Conversation,
        on_delete=models.CASCADE,
        related_name="messages"
    )

    sender_type = models.CharField(max_length=20, choices=SENDER_TYPE_CHOICES)

    # store who sent it (important for tracking)
    sender_id = models.IntegerField()

    message = models.TextField()

    is_read = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.sender_type}: {self.message[:20]}"
    
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

    STATUS_CHOICES = [
        ('SCHEDULED', 'Scheduled'),
        ('COMPLETED', 'Completed'),
    ]

    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='SCHEDULED')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.patient.user.username} - Dr. {self.doctor_name} ({self.department_name}) on {self.date} at {self.time}"