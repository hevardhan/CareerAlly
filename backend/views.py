from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from sklearn.linear_model import LinearRegression
import numpy as np
import ollama


def html(request):
   x = 3
   y = 4
   
   return HttpResponse(x+y)


from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

@api_view(['POST'])
def sum_numbers(request):
    try:
        # Get numbers from request data
        number1 = request.data.get("number1")
        number2 = request.data.get("number2")
        
        # Check if numbers are provided and convert them to float
        if number1 is None or number2 is None:
            return Response({"error": "Both numbers are required"}, status=status.HTTP_400_BAD_REQUEST)

        result = float(number1) + float(number2)
        return Response({"result": result}, status=status.HTTP_200_OK)
    
    except (ValueError, TypeError):
        return Response({"error": "Invalid input. Please provide numbers."}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def ollama_model(request):
   
   message = request.data.get('message')
   
   response = ollama.chat(model='llama3', messages=[
   {
      'role': 'user',
      'content': message,
   },
   ])
   print(response['message']['content'])
   
   return Response({"result": response['message']['content']}, status=status.HTTP_200_OK)