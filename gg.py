import ollama
response = ollama.chat(model='llama3', messages=[
  {
    'role': 'user',
    'content': 'Say me 2 words',
  },
])
print(response['message'])