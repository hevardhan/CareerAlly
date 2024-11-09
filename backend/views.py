from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from sklearn.linear_model import LinearRegression
import numpy as np
import ollama
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from django.core.files.storage import FileSystemStorage
import pdfplumber
import re
import pandas as pd

# Function to extract text from PDF using pdfplumber
def extract_text_from_pdf(pdf_path):
    text = ""
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            text += page.extract_text() + "\n"
    return text

# Function to extract skills from the resume text based on a skill list
def extract_skills(text, skill_list):
    found_skills = set()
    for skill in skill_list:
        if re.search(r'\b' + re.escape(skill) + r'\b', text, re.IGNORECASE):
            found_skills.add(skill)
    return list(found_skills)

# List of skills to search for in the resume
skill_list = ['Python', 'Django', 'Java', 'Web Development', 'UI/UX', 'C', 'C++', 'React JS', 'SQL', 'DSA', 'Data Science', 'Statistics', 'Machine Learning']

@api_view(['POST'])
def file_upload(request):
    # Check if the request contains the file
    if 'file' not in request.FILES:
        return Response({'error': 'No file provided'}, status=400)
    
    file = request.FILES['file']
    fs = FileSystemStorage()

    # Save the uploaded file to the filesystem
    filename = fs.save(file.name, file)
    file_url = fs.url(filename)

    # Extract text from the uploaded PDF
    pdf_path = fs.path(filename)  # Get the full path of the uploaded file
    resume_text = extract_text_from_pdf(pdf_path)

    # Extract skills from the resume text
    user_skills = extract_skills(resume_text, skill_list)

    # Return the response with file URL and extracted skills
    return Response({
        'file_url': file_url,
        'extracted_skills': user_skills
    })

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