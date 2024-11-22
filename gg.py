import numpy as np
import spacy
import scipy

def print_versions():
    print("numpy version:", np.__version__)
    print("spacy version:", spacy.__version__)
    print("sci version:", scipy.__version__)

if __name__ == "__main__":
    print_versions()
