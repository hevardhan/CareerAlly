import { createUserWithEmailAndPassword, getRedirectResult, GithubAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect } from "firebase/auth";
import { auth } from "./firebase";

export const CreateUser_Email = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

export const SignIn_Email = async (email, password) =>{
    return signInWithEmailAndPassword(auth, email, password)
}

export const SignIn_Google = async () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
    const result = await getRedirectResult(auth);
    return result
};

export const SignIn_Github = async () => {
    const provider = new GithubAuthProvider();
    await signInWithRedirect(auth, provider);
};
export const SignOut = () =>{
    return auth.signOut();
}

