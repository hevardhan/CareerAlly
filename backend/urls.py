from django.urls import path
from .views import *

urlpatterns = [
    path('upload/', html, name='add-the'),
]
