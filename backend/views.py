from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

def html(request):
   return HttpResponse("Hello world")