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


import pandas as pd
from langchain_community.vectorstores import Chroma
from langchain_ollama import OllamaEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain.prompts import ChatPromptTemplate, PromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_ollama.chat_models import ChatOllama
from langchain_core.runnables import RunnablePassthrough
from langchain.retrievers.multi_query import MultiQueryRetriever
from IPython.display import display, Markdown
import warnings
import os

# Suppress warnings
warnings.filterwarnings('ignore')

# Set environment variable for protobuf
os.environ["PROTOCOL_BUFFERS_PYTHON_IMPLEMENTATION"] = "python"

# Load the Excel data and initialize the RAG-based chat system
def initialize_rag_pipeline(excel_path, local_model="ally"):
    df = pd.read_csv(excel_path)
    
    from langchain.schema import Document
    data = [
        Document(page_content=f"Job Role: {row['label']}\nDescription: {row['description']}\nRequirements: {row['skills']}")
        for index, row in df.iterrows()
    ]
    
    # Split documents into chunks
    from langchain_text_splitters import RecursiveCharacterTextSplitter
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    chunks = text_splitter.split_documents(data)
    
    # Create vector database
    vector_db = Chroma.from_documents(
        documents=chunks,
        embedding=OllamaEmbeddings(model="nomic-embed-text"),
        collection_name="local-rag"
    )
    
    # Initialize LLM and prompt for retriever
    llm = ChatOllama(model=local_model)
    QUERY_PROMPT = PromptTemplate(
        input_variables=["question"],
        template="""Consider Yourself as Ally, an Assistance Chatbot. Generate 2
        alternative versions of the question for better document retrieval.
        Original question: {question}""",
    )
    
    retriever = MultiQueryRetriever.from_llm(vector_db.as_retriever(), llm, prompt=QUERY_PROMPT)
    
    # Create response prompt template
    response_template = """Answer the question based ONLY on the following context:
    {context}
    Question: {question}
    """
    response_prompt = ChatPromptTemplate.from_template(response_template)

    # Set up the RAG pipeline chain
    chain = (
        {"context": retriever, "question": RunnablePassthrough()}
        | response_prompt
        | llm
        | StrOutputParser()
    )
    
    return chain
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
    print(list(skills))
    
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
isQuizData = None
quiz_data = None
skills_list = None

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


import io
import matplotlib.pyplot as plt
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Image
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
import pandas as pd
import numpy as np
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet


from django.http import FileResponse, HttpResponseNotFound
from django.conf import settings
import os

def download_file(request, file_name):
    # Construct the path to your file
    file_path = os.path.join(settings.MEDIA_ROOT, file_name)
    
    # Ensure the file exists
    if not os.path.exists(file_path):
        return HttpResponseNotFound("File not found.")

    # Open the file and return as response with Content-Disposition header to trigger download
    with open(file_path, 'rb') as file:
        response = FileResponse(file, as_attachment=True, filename=file_name)
        return response


def evaluate_quiz(quiz, answers):
    score = 0
    incorrect_answers = 0
    quiz_data = []
    
    styles = getSampleStyleSheet()

    # Define styles for headings and normal text
    style_heading1 = styles['Heading1']  # Predefined Heading1 style
    style_heading2 = styles['Heading2']  # Predefined Heading2 style
    style_normal = styles['Normal']      # Predefined Normal style

    # Define measurement unit (inch) for setting margins or elements in the document
    inch = 72  # 1 inch = 72 points in reportlab

    for i, ans in enumerate(answers[1:]):
        correct_answer = quiz[i]["correct_answer"]
        question_data = {
            "question": quiz[i]["question"],
            "options": quiz[i]["options"],
            "correct_answer": correct_answer,
            "user_answer": ans
        }
        
        if correct_answer == ans:
            score += 1
        else:
            incorrect_answers += 1
        
        quiz_data.append(question_data)

    # Generate the pie chart for the score
    def create_pie_chart(score, incorrect_answers, total_questions):
        labels = ['Correct', 'Incorrect']
        sizes = [score, incorrect_answers]
        colors = ['green', 'red']
        plt.figure(figsize=(6, 6))
        plt.pie(sizes, labels=labels, autopct='%1.1f%%', colors=colors)
        plt.title('Quiz Score Breakdown')

        # Save the pie chart to a byte stream
        img_stream = io.BytesIO()
        plt.savefig(img_stream, format='png')
        img_stream.seek(0)
        plt.close()
        return img_stream

    # Create PDF report
    def create_pdf_report(quiz_data, score, total_questions):
        
        import matplotlib
        matplotlib.use('Agg')
        pdf_filename = 'quiz_report.pdf'
        pdf_path = os.path.join(settings.MEDIA_ROOT, pdf_filename)
        doc = SimpleDocTemplate(pdf_path, pagesize=letter)
        story = []

        # Add a title to the report
        story.append(Paragraph(f"Quiz Report: Score {score}/{total_questions}", style_heading1))
        story.append(Spacer(1, 12))  # Spacer between title and content

        # Add the pie chart for the score
        pie_chart_stream = create_pie_chart(score, incorrect_answers, total_questions)
        story.append(Spacer(1, 12))  # Add space before the image
        story.append(Paragraph("Quiz Score Breakdown:", style_heading2))
        pie_chart_image = Image(pie_chart_stream)
        pie_chart_image.drawHeight = 3 * inch
        pie_chart_image.drawWidth = 4 * inch
        story.append(pie_chart_image)

        # Add questions, options, correct answers, and user's answers
        story.append(Spacer(1, 12))
        for data in quiz_data:
            question = data["question"]
            options = data["options"]
            correct_answer = data["correct_answer"]
            user_answer = data["user_answer"]

            # Add question
            story.append(Paragraph(f"Question: {question}", style_heading2))

            # Add options
            options_text = "<ul>"
            for option in options:
                options_text += f"<li>{option}</li>"
            options_text += "</ul>"
            story.append(Paragraph(f"Options: {options_text}", style_normal))

            # Add correct and user answers
            story.append(Paragraph(f"Correct Answer: {correct_answer}", style_normal))
            story.append(Paragraph(f"Your Answer: {user_answer}", style_normal))
            story.append(Spacer(1, 12))  # Spacer between questions

        # Build the PDF
        doc.build(story)

        return pdf_filename

    # Create and save the report
    pdf_filename = create_pdf_report(quiz_data, score, len(quiz))
    
    return score, pdf_filename


rag_chain = initialize_rag_pipeline(r"D:\New folder\Projects\CareerAlly\python\job.csv")

@api_view(['POST'])
def ollama_model(request):

    global skillsFound
    global jobRole
    global jobRoleBool
    global skills
    global isQuizData
    global quiz_data
    global skills_list
    
    quiz_num = 7
    
    message = request.data.get('message')
    
    df = pd.read_csv(r'D:\New folder\Projects\CareerAlly\python\Skill_MCQs_with_Answers_updated.csv')  # Replace 'questions.csv' with your CSV file path
    df['Skill'] = df['Skill'].str.lower()
    # List of skills you want to filter by
    
    if skillsFound:
        skills_list = list(skills)  # Replace with your actual skills
    
    
    
    if skills_list != None :
        if isQuizData == None or isQuizData == False:
            try:

                # Filter questions based on the list of skills
                filtered_questions = df[df['Skill'].isin(skills_list)]

                # Select 3 random questions
                random_questions = filtered_questions.sample(n=quiz_num)

                # Convert the selected questions to the desired format
                quiz_data = [
                    {
                        "question": row['Question'],
                        "options": row['Choices'].split(", "),  # Assumes choices are comma-separated in the CSV
                        "correct_answer": row['Answer']
                    }
                    for _, row in random_questions.iterrows()
                ]
                
                isQuizData = True
            except :
                print("Nothing")
    global quizStart
    
    print(get_quiz_stat())
    if skillsFound:

        print(quiz_data)
        if jobRoleBool:    
            if jobRole == None :
                jobRole = message
                return Response({"result": "Type 'start' to start the quiz"}, status=status.HTTP_200_OK)   
            else :
                if get_quiz_stat() :
                    print("Start")

                    add_answer(message)
                    num = get_quiz_track()
                    if get_quiz_track() < quiz_num:
                        set_quiz_track(get_quiz_track()+1)
    
                        # options_markdown = "\n".join([f"- {option}" for option in quiz_data[num]['options']])
    
                        return Response({
                            "result": quiz_data[num]["question"],
                            "options":quiz_data[num]['options']
                        }, status=status.HTTP_200_OK)
                    else:
                        score, pdf_filename = evaluate_quiz(quiz_data, get_answers())
                        
                        jobRoleBool = False
                        
                        # Return the PDF file URL or response
                        return Response({
                            "result": f"Your Score is {score}/{quiz_num}",
                            "pdf_url": pdf_filename  # Make sure this is accessible by the frontend
                        }, status=status.HTTP_200_OK)
            
        else : 
            if message.lower() == "yes" :
                print("YES")
                quizStart = False
                return Response({"result": "This Feature is still under development ! Kindly type 'NO' to start with the quiz"}, status=status.HTTP_200_OK)  
            
            elif message.lower() == "no" :
                jobRoleBool = True
                quizStart = True
                set_quiz_track(0)
                return Response({"result": "Please Mention the Job Role"}, status=status.HTTP_200_OK)          
                
            else :
                print("Invalid")
                return Response({"result": "Invalid Input"}, status=status.HTTP_200_OK)
                

    else :    
        # response = ollama.chat(model='ally', messages=[
        # {
        #     'role': 'user',
        #     'content': message,
        # },
        # ])
        # print(response['message']['content'])
        
        # return Response({"result": response['message']['content']}, status=status.HTTP_200_OK)
    
        response = rag_chain.invoke(message)
        return Response({"result": response}, status=status.HTTP_200_OK)