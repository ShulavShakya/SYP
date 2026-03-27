from django.urls import path
from . import consumers

websocket_urlpatterns = [
    # The URL matches the one used in React: ws://host/ws/chat/ID/
    path('ws/chat/<int:conversation_id>/', consumers.ChatConsumer.as_asgi()),
    path('ws/notifications/', consumers.NotificationConsumer.as_asgi()),
]

