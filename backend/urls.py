from django.urls import path
from .views import *

urlpatterns = [
    path('chatbot/', ollama_model), 
    path('upload/', file_upload, name='file-upload'),
    path('download/<str:file_name>/', download_file, name='download_file'),
]
