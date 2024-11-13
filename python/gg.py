from transformers import T5ForConditionalGeneration, T5Tokenizer
import pandas as pd
import random

# Load pre-trained T5 model and tokenizer
model = T5ForConditionalGeneration.from_pretrained("valhalla/t5-small-qg-prepend")
tokenizer = T5Tokenizer.from_pretrained("valhalla/t5-small-qg-prepend")

# Load questions from the CSV file
file_path = 'Skill_MCQs_with_Answers_updated.csv'
mcq_data = pd.read_csv(file_path)

def rephrase_question(passage):
    """Generates a rephrased question from a passage using a Seq2Seq model."""
    input_text = f"question: {passage}"
    input_ids = tokenizer.encode(input_text, return_tensors="pt")
    question_output = model.generate(input_ids, max_length=50, num_beams=5, early_stopping=True)
    question = tokenizer.decode(question_output[0], skip_special_tokens=True)
    return question

def get_skills_input():
    """Prompts the user to input their skills."""
    skills_input = input("Enter the skills you're interested in (comma separated, e.g., 'Python, AI, Web Development'): ")
    # Clean and split the skills into a list
    skills = [skill.strip().lower() for skill in skills_input.split(',')]
    return skills

def run_quiz_with_seq2seq(num_questions=5):
    """Run a quiz that mixes pre-existing and Seq2Seq-rephrased questions based on user skills."""
    # Get the user's skills
    skills = get_skills_input()

    # Filter questions based on the user's skills
    filtered_data = mcq_data[mcq_data['Skill'].str.lower().isin(skills)]

    if filtered_data.empty:
        print("No questions available for the skills entered. Please try again with different skills.")
        return

    # Randomly sample questions from the filtered dataset
    questions = filtered_data.sample(n=min(num_questions, len(filtered_data))).reset_index(drop=True)

    for i in range(len(questions)):
        # Rephrase the question using Seq2Seq model
        passage = questions.loc[i, 'Question']
        question = rephrase_question(passage)
        
        # Retrieve choices and correct answer directly from the dataset
        choices = questions.loc[i, 'Choices']
        correct_answer = questions.loc[i, 'Answer'].strip().lower()
        
        # Split choices into separate options (assuming choices are comma-separated)
        choice_list = [choice.strip().lower() for choice in choices.split(',')]
        
        # Display the question and choices
        print(f"Question {i+1}: {question}")
        for idx, choice in enumerate(choice_list, 1):
            print(f"{chr(96+idx)}) {choice}")
        
        # Check if the correct_answer exists in the choices
        if correct_answer not in choice_list:
            print(f"Error: The correct answer '{correct_answer}' does not match any available options.")
            continue

        # Get the user's answer
        user_answer = input("Enter the correct option (e.g., 'a', 'b', etc.): ").strip().lower()
        
        # Check if the answer is correct
        correct_option = chr(96 + choice_list.index(correct_answer) + 1)  # Map correct answer to option letter
        if user_answer != correct_option:
            raise ValueError(f"Incorrect! The correct answer was '{correct_option}'. Quiz ended.")
        else:
            print("Correct!\n")

    print("Congratulations! You answered all questions correctly.")

# Run the quiz
run_quiz_with_seq2seq()
