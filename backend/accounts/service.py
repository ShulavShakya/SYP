# service.py
from .models import Notification, Patient, Doctor, Receptionist
from django.contrib.auth import get_user_model
from .utils import send_notification_to_user

User = get_user_model()

def create_notification(title="", body="", roles=[], specific_users=None):
    """
    Send notification to specific roles or specific users.
    
    roles = ["admin", "receptionist", "doctor", "patient"]
    specific_users = list of User or model instances (optional)
    """

    recipients = []

    # 1️⃣ Send to Admins
    if "admin" in roles:
        admins = User.objects.filter(is_superuser=True)
        recipients.extend([{"admin": admin} for admin in admins])

    # 2️⃣ Send to Receptionists
    if "receptionist" in roles:
        receps = Receptionist.objects.all()
        recipients.extend([{"receptionist": r} for r in receps])

    # 3️⃣ Send to Doctors
    if "doctor" in roles:
        doctors = Doctor.objects.all()
        recipients.extend([{"doctor": d} for d in doctors])

    # 4️⃣ Send to Patients
    if "patient" in roles:
        patients = Patient.objects.all()
        recipients.extend([{"patient": p} for p in patients])

    # 5️⃣ Add any specific users manually
    if specific_users:
        for u in specific_users:
            # If it's a User instance, send as admin
            if isinstance(u, User):
                recipients.append({"admin": u})
            # If it's a model instance with user attribute
            elif hasattr(u, "user"):
                model_name = u.__class__.__name__.lower()
                recipients.append({model_name: u})

    notifications = []

    # 🔥 Create notifications and push in real-time
    for r in recipients:
        # 1. Save to DB first
        obj = Notification.objects.create(
            title=title,
            body=body,
            patient=r.get("patient"),
            doctor=r.get("doctor"),
            receptionist=r.get("receptionist"),
            admin=r.get("admin")
        )

        # 2. Serialize the ACTUAL object from the DB
        # This ensures the frontend gets the exact same text stored in the DB
        serialized_data = {
            "id": obj.id,
            "title": obj.title,
            "body": obj.body,
            "is_read": obj.is_read,
            "created_at": obj.created_at.strftime("%Y-%m-%d %H:%M:%S"),
        }

        # 3. Push the serialized data
        user_id = None
        if r.get("admin"): user_id = r["admin"].id
        elif r.get("receptionist"): user_id = r["receptionist"].user.id
        elif r.get("doctor"): user_id = r["doctor"].user.id
        elif r.get("patient"): user_id = r["patient"].user.id

        if user_id:
            send_notification_to_user(user_id, serialized_data)