import streamlit as st
import fitz  # PyMuPDF
import re
from transformers import pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Initialize zero-shot classification pipeline
classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")

# Initialize NER model for entity recognition
ner_model = pipeline("ner", model="dbmdz/bert-large-cased-finetuned-conll03-english")

# Function to extract text from PDF and dynamically detect sections
def extract_and_segment_text(pdf_file):
    text = ""
    with fitz.open(stream=pdf_file.read(), filetype="pdf") as pdf:
        for page_num in range(pdf.page_count):
            page = pdf[page_num]
            text += page.get_text("text")

    # Lists to store headings and subheadings
    headings = []
    subheadings = []

    # Split text into lines
    lines = text.splitlines()
    for i, line in enumerate(lines):
        line = line.strip()

        # Use NER to detect if the line is a potential heading or subheading
        ner_results = ner_model(line)
        
        # Check for entities that might indicate headings
        if any(ent['entity'] in ['B-PER', 'B-ORG', 'B-LOC'] for ent in ner_results):
            # Likely a heading if it's an organization or personal name
            headings.append(line)
        else:
            # Use zero-shot classification to determine if it's a heading or subheading
            candidate_labels = ["Heading", "Subheading", "Not a Heading"]
            classification = classifier(line, candidate_labels)
            label = classification["labels"][0]
            score = classification["scores"][0]

            # Logic to categorize headings and subheadings
            if label == "Heading" and score > 0.75:
                headings.append(line)  # Store the detected heading
            elif label == "Subheading" and score > 0.70:
                # Check if it is indeed a subheading based on contextual similarity
                if i > 0 and line.startswith("•") or line.startswith("-"):  # Check for bullet points
                    subheadings.append(line)
                elif i > 0 and headings:  # If it's after a heading
                    prev_heading = headings[-1]
                    if is_subheading(prev_heading, line):
                        subheadings.append(line)

    return headings, subheadings

# Function to determine if the line is a subheading based on text similarity
def is_subheading(heading, potential_subheading):
    # Create TF-IDF vectors for heading and potential subheading
    vectorizer = TfidfVectorizer().fit_transform([heading, potential_subheading])
    vectors = vectorizer.toarray()
    cosine_sim = cosine_similarity(vectors)

    # Consider a high similarity score as indicative of a subheading
    return cosine_sim[0, 1] > 0.5  # Threshold can be adjusted

# Streamlit UI
st.title("NLP-Enhanced Resume PDF Section Extractor")

pdf_file = st.file_uploader("Upload a Resume PDF file", type="pdf")

if pdf_file is not None:
    st.subheader("Extracting sections from the resume...")
    headings, subheadings = extract_and_segment_text(pdf_file)

    if headings:
        st.subheader("Extracted Headings:")
        for heading in headings:
            st.write(f"### {heading}")
    else:
        st.write("No recognizable headings found.")

    if subheadings:
        st.subheader("Extracted Subheadings:")
        for subheading in subheadings:
            st.write(f"### Subheading: {subheading}")
    else:
        st.write("No recognizable subheadings found.")
else:
    st.info("Please upload a PDF file to proceed.")
