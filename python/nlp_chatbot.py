import streamlit as st
import fitz  # PyMuPDF
from transformers import pipeline

# Load the NLP pipelines (NER and text classification)
# This example uses 'distilbert-base-cased' for token classification and a general text classification model
# Adjust to your preferred models based on performance and requirements
ner_pipeline = pipeline("ner", model="dslim/bert-base-NER")
text_classification_pipeline = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")

# Function to extract text from PDF
def extract_text_from_pdf(pdf_file):
    text = ""
    with fitz.open(stream=pdf_file.read(), filetype="pdf") as pdf:
        for page_num in range(pdf.page_count):
            page = pdf[page_num]
            text += page.get_text("text")
    return text

# Function to categorize text using NER and text classification
def categorize_content(text):
    # Initialize the categorized sections
    sections = {
        "Skills": [],
        "Experience": [],
        "Others": []
    }
    
    # Define candidate labels for text classification
    candidate_labels = ["skills", "experience", "other"]

    # Split the text into lines and categorize each
    for line in text.splitlines():
        line = line.strip()
        if not line:
            continue

        # Use NER to detect if line contains any skill/experience keywords
        ner_results = ner_pipeline(line)
        contains_skill = any(ent['entity'] == 'B-SKILL' for ent in ner_results)
        
        if contains_skill:
            sections["Skills"].append(line)
        else:
            # Use zero-shot classification for lines not identified by NER
            classification = text_classification_pipeline(line, candidate_labels)
            label = classification["labels"][0]

            if label == "skills":
                sections["Skills"].append(line)
            elif label == "experience":
                sections["Experience"].append(line)
            else:
                sections["Others"].append(line)
    
    # Combine lines into paragraphs for each section
    for section in sections:
        sections[section] = "\n".join(sections[section])
    
    return sections

# Streamlit UI
st.title("Advanced PDF Content Categorizer")

pdf_file = st.file_uploader("Upload a PDF file", type="pdf")

if pdf_file is not None:
    st.subheader("Extracting text from PDF...")
    text = extract_text_from_pdf(pdf_file)
    
    if text:
        st.subheader("Categorized Content:")
        sections = categorize_content(text)
        
        st.write("### Skills")
        st.text(sections["Skills"])
        
        st.write("### Experience")
        st.text(sections["Experience"])
        
        st.write("### Others")
        st.text(sections["Others"])
    else:
        st.error("Could not extract text from the PDF.")
else:
    st.info("Please upload a PDF file to proceed.")
