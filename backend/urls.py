from django.urls import path
from .views import *

urlpatterns = [
    path('sum/', sum_numbers, name='sum_numbers'),
    path('chatbot/', ollama_model), 
    path('upload/', file_upload, name='file-upload'),
]
