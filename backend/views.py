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
from django.contrib.sessions.models import Session

import spacy
import pdfplumber
import docx2txt
import re
from spacy.matcher import Matcher

# Load spaCy's pre-trained model
nlp = spacy.load("en_core_web_sm")
matcher = Matcher(nlp.vocab)

# Function to extract text from PDF
def extract_text_from_pdf(file_path):
    text = ""
    with pdfplumber.open(file_path) as pdf:
        for page in pdf.pages:
            text += page.extract_text() + "\n"
    return text

# Function to extract text from DOCX
def extract_text_from_docx(file_path):
    return docx2txt.process(file_path)

# Function to extract email and phone number using regex
def extract_contact_info(text):
    email = re.findall(r'\b[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b', text)
    phone = re.findall(r'\+?\d[\d -]{8,}\d', text)
    return email[0] if email else None, phone[0] if phone else None

# Define a comprehensive skill keywords list and pattern matcher for multi-word skills
skill_keywords = [
    "Python", "Java", "Machine Learning", "Data Analysis", "SQL",
    "Deep Learning", "Artificial Intelligence", "Natural Language Processing",
    "NLP", "SVM", "Random Forest", "KNN", "Google Colab", "Data Analytics",
    "Excel", "TensorFlow", "PyTorch", "AWS", "Azure", "Docker", "Kubernetes",
    "React", "JavaScript", "CSS", "HTML", "Git", "Flask", "Django",
    "Communication", "Leadership", "Project Management", "Cloud Computing",
    "API Development", "Data Engineering", "Big Data", "Scrum"
]

# Define patterns for Matcher to capture multi-word skills
patterns = [
    [{"LOWER": "machine"}, {"LOWER": "learning"}],
    [{"LOWER": "data"}, {"LOWER": "analysis"}],
    [{"LOWER": "deep"}, {"LOWER": "learning"}],
    [{"LOWER": "artificial"}, {"LOWER": "intelligence"}],
    [{"LOWER": "natural"}, {"LOWER": "language"}, {"LOWER": "processing"}]
]

# Add patterns to the matcher
for pattern in patterns:
    matcher.add("SKILL", [pattern])

# Main function to parse resume and extract specific details
def parse_resume(file_path):
    
    global name
    global email
    global phone
    global skills
    
    # Extract text from the resume based on file type
    if file_path.endswith('.pdf'):
        text = extract_text_from_pdf(file_path)
    elif file_path.endswith('.docx'):
        text = extract_text_from_docx(file_path)
    else:
        raise ValueError("Unsupported file format")

    # Process text with spaCy's NLP model
    doc = nlp(text)

    # Initialize fields
    person_name = None
    skills = set()
    experience = set()

    # Extract Name and Experience using NER
    for ent in doc.ents:
        if ent.label_ == "PERSON" and not person_name:
            person_name = ent.text  # Assuming the first PERSON entity is the name
        elif ent.label_ == "ORG" or ent.label_ == "GPE":
            experience.add(ent.text)  # ORG represents companies, GPE for geographic locations often part of experience

    # Extract skills using keywords and Matcher patterns
    for token in doc:
        skill = token.text.lower()  # Standardize to lowercase
        if skill in map(str.lower, skill_keywords):
            skills.add(skill)

    matches = matcher(doc)
    for match_id, start, end in matches:
        span = doc[start:end]
        skills.add(span.text.lower())  # Add multi-word skills in lowercase

    # Extract email and phone number using regex
    email, phone = extract_contact_info(text)
    name = person_name
    # Output the extracted information
    print("Name:", person_name)
    print("Email:", email)
    print("Phone:", phone)
    return skills


# def quiz()

name = None
email = None
phone = None
skills = None
question = None
skillsFound = None
quizStart = None
answers = None
quiz_track = None
jobRoleBool = None
jobRole = None

def get_answers():
    return answers

def add_answer(value):
    global answers
    if answers is None:
        answers = [value]
    else:
        answers.append(value)
    
def set_quiz_track(index):
    global quiz_track
    quiz_track = index
    
def get_quiz_stat():
    return quizStart

def get_quiz_track():
    return quiz_track

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
    user_skills = parse_resume(pdf_path)
    
    global skillsFound

    skillsFound = True
    
    # if user_skills:
    

    # Return the response with file URL and extracted skills
    return Response({
        'file_url': file_url,
        'extracted_skills': user_skills, 
    })


def evaluate_quiz(quiz):
    global answers
    score = 0
    ans = answers[1:]
    for x in range(len(ans)):
        print(quiz[x]["correct_answer"] + ans[x])
        if quiz[x]["correct_answer"] == ans[x]:
            score = score + 1
        else :
            score = score - 1
                
    return score


@api_view(['POST'])
def ollama_model(request):

    global skillsFound
    global jobRole
    global jobRoleBool
    message = request.data.get('message')
    quiz_data = [
    {
        "question": "What is the capital of France?",
        "options": ["Paris", "London", "Berlin", "Rome"],
        "correct_answer": "Paris",
    },
    {
        "question": "Which programming language is known as the 'language of the web'?",
        "options": ["Python", "Java", "JavaScript", "C++"],
        "correct_answer": "JavaScript",
    },
    {
        "question": "What is 2 + 2?",
        "options": ["3", "4", "5", "6"],
        "correct_answer": "4",
    }
]



    global quizStart
    
    print(get_quiz_stat())
    if skillsFound:
        
        if jobRoleBool:    
            if jobRole == None :
                jobRole = message
                return Response({"result": "Type something to start the quiz"}, status=status.HTTP_200_OK)   
            else :
                if get_quiz_stat() :
                    print("Start")

                    add_answer(message)
                    num = get_quiz_track()
                    if get_quiz_track() < 3:
                        set_quiz_track(get_quiz_track()+1)
                        return Response({
                            "result": quiz_data[num]["question"],
                            "options":quiz_data[num]['options']
                        }, status=status.HTTP_200_OK)
                    else:
                        print(get_answers())
                        skillsFound = False
                        sc = evaluate_quiz(quiz_data)
                        print(sc)
                        return Response({"result": f"Your Score is {sc}/3"}, status=status.HTTP_200_OK)
            
        else : 
            if message.lower() == "yes" :
                print("YES")
                quizStart = False
                return HttpResponse("hi")
            
            elif message.lower() == "no" :
                jobRoleBool = True
                quizStart = True
                set_quiz_track(0)
                return Response({"result": "Please Mention the Job Role"}, status=status.HTTP_200_OK)          
                
            else :
                print("Invalid")
                return Response({"result": "Invalid Input"}, status=status.HTTP_200_OK)
                

    else :    
        response = ollama.chat(model='ally', messages=[
        {
            'role': 'user',
            'content': message,
        },
        ])
        print(response['message']['content'])
        
        return Response({"result": response['message']['content']}, status=status.HTTP_200_OK)