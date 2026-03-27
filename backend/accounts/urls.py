from django.urls import path


from .views import (
     get_message_history,
     get_my_conversation,
     list_conversations,
     login_user,
    patient_dashboard,  register_patient, 
)

urlpatterns = [
    path('register-patient/', register_patient, name='register-patient'),
    path('login/', login_user, name='login'),
    path('dashboard/patient/', patient_dashboard, name='patient_dashboard'),
   
    # For the Patient: Gets their specific single conversation ID
    path('api/my-conversation/', get_my_conversation, name='get_my_conversation'),

    # For the Receptionist: Lists all patient chats for the sidebar
    path('api/conversations/', list_conversations, name='list_conversations'),

    # For Both: Loads the past message history when a chat is opened
    path('api/conversations/<int:conversation_id>/messages/', get_message_history, name='get_message_history'),



]