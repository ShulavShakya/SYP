import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from .models import Conversation, Message, Receptionist, Patient

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.conversation_id = self.scope['url_route']['kwargs']['conversation_id']
        self.room_group_name = f"chat_{self.conversation_id}"
        self.user = self.scope["user"]

        if self.user.is_authenticated:
            # Join the shared room group
            await self.channel_layer.group_add(self.room_group_name, self.channel_name)
            await self.accept()
        else:
            await self.close()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def receive(self, text_data):
        data = json.loads(text_data)
        message_text = data.get("message")

        if not message_text:
            return

        # 1. Identity identification (Receptionist vs Patient)
        sender_info = await self.get_sender_details(self.user)

        # 2. Save to DB and update conversation 'updated_at' timestamp
        await self.save_message(message_text, sender_info)

        # 3. Broadcast to EVERYONE in the group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type": "chat_message",
                "message": message_text,
                "sender_type": sender_info['type'],
                "sender_id": sender_info['id'],
                "sender_name": sender_info['name'],
            }
        )

    async def chat_message(self, event):
        """Standard group message handler."""
        await self.send(text_data=json.dumps({
            "message": event["message"],
            "sender_type": event["sender_type"],
            "sender_id": event["sender_id"],
            "sender_name": event["sender_name"],
        }))

    @database_sync_to_async
    def get_sender_details(self, user):
        """Resolves the User profile to either a Patient or Receptionist model."""
        try:
            r = Receptionist.objects.get(user=user)
            return {'type': 'RECEPTIONIST', 'id': r.id, 'name': r.name}
        except Receptionist.DoesNotExist:
            pass

        try:
            p = Patient.objects.get(user=user)
            return {'type': 'PATIENT', 'id': p.id, 'name': p.full_name}
        except Patient.DoesNotExist:
            pass

        return {'type': 'SYSTEM', 'id': 0, 'name': 'System'}

    @database_sync_to_async
    def save_message(self, text, info):
        """Saves message and bumps conversation timestamp for sorting."""
        msg = Message.objects.create(
            conversation_id=self.conversation_id,
            message=text,
            sender_type=info['type'],
            sender_id=info['id']
        )
        # Bumping updated_at ensures this chat moves to the top of receptionist list
        msg.conversation.save() 
        return msg


