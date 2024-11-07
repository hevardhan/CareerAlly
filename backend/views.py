from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from sklearn.linear_model import LinearRegression
import numpy as np



def html(request):
   x = 3
   y = 4
   
   return HttpResponse(x+y)