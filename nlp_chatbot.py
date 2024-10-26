pip install transformers PyPDF2 pdfplumber torch

import pdfplumber
import re
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch


# Load the LLaMA model and tokenizer from Hugging Face
# Replace "your-model-name" with the appropriate LLaMA model
model_name = "meta-llama/Llama-3.2-3B"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)



# Function to extract text from PDF
def extract_text_from_pdf(pdf_file_path):
    with pdfplumber.open(pdf_file_path) as pdf:
        full_text = ""
        for page in pdf.pages:
            full_text += page.extract_text()
    return full_text




    # Function to extract skills and job roles
def extract_skills_and_job_roles(resume_text):
    skills = ['Python', 'Machine Learning', 'Data Analysis', 'SQL', 'Java', 'Deep Learning']
    job_roles = ['Data Scientist', 'Software Engineer', 'AI Researcher']

    extracted_skills = [skill for skill in skills if skill.lower() in resume_text.lower()]
    extracted_roles = [role for role in job_roles if role.lower() in resume_text.lower()]

    return extracted_skills, extracted_roles







# Function to generate quiz questions and answers using the LLaMA model
def generate_quiz_question_and_answer(skill):
    # Prompt template for generating questions and answers
    prompt_question = f"Generate a quiz question to test knowledge in {skill}."
    prompt_answer = f"Generate a correct answer for the question on {skill}."

    # Tokenize and generate question
    question_inputs = tokenizer(prompt_question, return_tensors="pt")
    question_outputs = model.generate(**question_inputs, max_length=50)
    generated_question = tokenizer.decode(question_outputs[0], skip_special_tokens=True)

    # Tokenize and generate answer
    answer_inputs = tokenizer(prompt_answer, return_tensors="pt")
    answer_outputs = model.generate(**answer_inputs, max_length=50)
    generated_answer = tokenizer.decode(answer_outputs[0], skip_special_tokens=True)

    return generated_question, generated_answer


    
# Function to evaluate the quiz and generate a report (simulated evaluation)
def generate_report(quiz_results):
    print("Generated Quiz Report:")
    for i, result in enumerate(quiz_results):
        print(f"Question {i + 1}: {result['question']}")
        print(f"Generated Answer: {result['answer']}")
        print(f"-----------------------------")

    return "Quiz and answers generated successfully."






def main():
    # Step 1: Extract text from the resume PDF
    resume_path = "your_resume.pdf"  # Replace with the path to your resume PDF
    resume_text = extract_text_from_pdf(resume_path)

    # Step 2: Extract skills and job roles from the resume
    skills, job_roles = extract_skills_and_job_roles(resume_text)
    print(f"Extracted Skills: {skills}")
    print(f"Extracted Job Roles: {job_roles}")

    # Step 3: Generate quiz questions and answers for each skill
    quiz_results = []
    for skill in skills:
        question, answer = generate_quiz_question_and_answer(skill)
        quiz_results.append({"question": question, "answer": answer})

    # Step 4: Generate the report based on the quiz results
    report = generate_report(quiz_results)
    print(report)

if __name__ == "__main__":
    main()

    
