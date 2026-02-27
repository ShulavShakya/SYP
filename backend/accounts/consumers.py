import json
from channels.generic.websocket import AsyncWebsocketConsumer
from .models import Conversation, Message
from channels.db import database_sync_to_async

class ChatConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        self.user = self.scope["user"]
        self.conversation_id = self.scope["url_route"]["kwargs"]["conversation_id"]
        self.room_group_name = f"chat_{self.conversation_id}"

        if not self.user.is_authenticated:
            await self.close()
            return

        conversation = await database_sync_to_async(
            Conversation.objects.get
        )(id=self.conversation_id)

        # Security check
        if (
            hasattr(self.user, 'patient') and
            conversation.patient.user == self.user
        ) or (
            hasattr(self.user, 'receptionist')
        ):
            await self.channel_layer.group_add(
                self.room_group_name,
                self.channel_name
            )
            await self.accept()
        else:
            await self.close()

    async def receive(self, text_data):
        data = json.loads(text_data)
        message = data["message"]

        conversation = await database_sync_to_async(
            Conversation.objects.get
        )(id=self.conversation_id)

        await database_sync_to_async(Message.objects.create)(
            conversation=conversation,
            sender=self.user,
            content=message
        )

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type": "chat_message",
                "message": message,
                "sender": self.user.username
            }
        )

    async def chat_message(self, event):
        await self.send(text_data=json.dumps({
            "message": event["message"],
            "sender": event["sender"]
        }))