from django.urls import path
from .views import *

urlpatterns = [
    path('chatbot/', ollama_model), 
    path('upload/', file_upload, name='file-upload'),
]
