# middleware.py
from channels.db import database_sync_to_async
from django.contrib.auth.models import AnonymousUser
from rest_framework_simplejwt.tokens import UntypedToken
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from jwt import decode as jwt_decode
from django.conf import settings
from django.contrib.auth import get_user_model

User = get_user_model()

@database_sync_to_async
def get_user(user_id):
    """
    Fetch user from DB. Return AnonymousUser if not found.
    """
    try:
        return User.objects.get(id=user_id)
    except User.DoesNotExist:
        return AnonymousUser()

class JWTAuthMiddleware:
    """
    Middleware for WebSocket JWT Authentication.
    Works for both notifications and chat.
    """

    def __init__(self, app):
        self.app = app

    async def __call__(self, scope, receive, send):
        # Default to anonymous user
        scope["user"] = AnonymousUser()

        # Only try JWT if query_string contains token
        query_string = scope.get("query_string", b"").decode()
        query_params = dict(qc.split("=") for qc in query_string.split("&") if "=" in qc)
        token = query_params.get("token")

        if token:
            try:
                # Validate the token
                UntypedToken(token)
                decoded_data = jwt_decode(token, settings.SECRET_KEY, algorithms=["HS256"])
                user_id = decoded_data.get("user_id")
                user = await get_user(user_id)
                scope["user"] = user
            except (InvalidToken, TokenError, Exception):
                # fallback to anonymous user
                scope["user"] = AnonymousUser()

        return await self.app(scope, receive, send)