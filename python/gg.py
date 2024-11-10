import pkg_resources

# List of libraries to check
libraries = [
    'Django', 'djangorestframework', 'scikit-learn', 'ollama', 'pdfplumber', 'pandas'
]

# Get and print the version for each library
for library in libraries:
    try:
        version = pkg_resources.get_distribution(library).version
        print(f'{library} version: {version}')
    except pkg_resources.DistributionNotFound:
        print(f'{library} is not installed')
