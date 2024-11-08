from django.urls import path
from .views import *

urlpatterns = [
    path('upload/', html, name='add-the'),
    path('sum/', sum_numbers, name='sum_numbers'),
    path('chatbot/', ollama_model), 
]
