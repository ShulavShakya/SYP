from django.test import TestCase

import requests
KHALTI_SECRET_KEY = "72360eed065c4ca4a686f1c23b34ffc5"

import requests

url = "https://103.107.49.92/api/v2/epayment/initiate/"
headers = {
    "Authorization": f"Key {KHALTI_SECRET_KEY}",
    "Host": "dev.khalti.com"   # Important! Khalti expects this Host header
}
payload = {
    "amount": 1000,
    "product_identity": "test123",
    "product_name": "Test Product",
    "customer_email": "test@example.com",
    "customer_phone": "9800000000"
}

response = requests.post(url, json=payload, headers=headers)
print(response.status_code)
print(response.json())
