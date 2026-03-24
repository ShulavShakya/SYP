import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from accounts.middleware import JWTAuthMiddleware  # adjust if app name differs
import accounts.routing  # your websocket routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'curecloud.settings')

django_asgi_app = get_asgi_application()

application = ProtocolTypeRouter({
    # HTTP requests (Django REST API)
    "http": django_asgi_app,

    # WebSocket requests (Chat system)
    "websocket": JWTAuthMiddleware(
        URLRouter(
            accounts.routing.websocket_urlpatterns
        )
    ),
})