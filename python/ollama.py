import subprocess

def generate_response_with_llama(prompt):
    # Run the prompt through Ollama's Llama 3 model
    result = subprocess.run(['ollama', 'run', 'llama-3', prompt], capture_output=True, text=True)
    return result.stdout.strip()  # Remove any extra whitespace

def main():
    print("Welcome to the Llama 3 Chatbot! Type 'exit' to quit.")
    while True:
        user_input = input("You: ")
        
        # Exit condition
        if user_input.lower() == 'exit':
            print("Goodbye!")
            break
        
        # Generate response from Llama
        response = generate_response_with_llama(user_input)
        print("Llama 3:", response)

if __name__ == "__main__":
    main()
