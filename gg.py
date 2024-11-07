import streamlit as st

# Sample user database (for demonstration purposes)
users = {"user1": "password123", "user2": "password456"}

# Function to validate login
def validate_login(username, password):
    return username in users and users[username] == password

# Function to register a new user
def register_user(username, password):
    if username in users:
        return False  # User already exists
    users[username] = password
    return True

# Streamlit UI
st.title("Welcome! Please choose an option")

# Check if the user has selected to login or register
if "option" not in st.session_state:
    st.session_state.option = None

# Display initial buttons for Login and Register
if st.session_state.option is None:
    col1, col2 = st.columns(2)
    with col1:
        if st.button("Login"):
            st.session_state.option = "Login"
    with col2:
        if st.button("Register"):
            st.session_state.option = "Register"

# Show Login form
if st.session_state.option == "Login":
    st.subheader("Login")
    username = st.text_input("Username")
    password = st.text_input("Password", type="password")

    if st.button("Submit Login"):
        if validate_login(username, password):
            st.success(f"Welcome, {username}!")
            # Add any post-login functionality here
        else:
            st.error("Invalid username or password")

    if st.button("Back to Menu"):
        st.session_state.option = None

# Show Register form
if st.session_state.option == "Register":
    st.subheader("Register")
    new_username = st.text_input("New Username")
    new_password = st.text_input("New Password", type="password")

    if st.button("Submit Registration"):
        if new_username and new_password:
            if register_user(new_username, new_password):
                st.success("Registration successful! You can now log in.")
                st.session_state.option = "Login"  # Redirect to login
            else:
                st.error("Username already exists. Try a different one.")
        else:
            st.error("Please enter both a username and a password.")

    if st.button("Back to Menu"):
        st.session_state.option = None
