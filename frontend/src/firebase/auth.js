import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from "./firebase";

export const CreateUser_Email = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

export const SignIn_Email = async (email, password) =>{
    return signInWithEmailAndPassword(auth, email, password)
}

export const SignIn_Google = async () => {
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider)
    return result 
}

export const SignIn_Github = async() => {
    const provider = new GithubAuthProvider()
    const result = await signInWithPopup(auth, provider)
    return result
}

export const SignOut = () =>{
    return auth.signOut();
}

