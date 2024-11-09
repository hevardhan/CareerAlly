import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import About from "./pages/About";
import Splash from "./pages/Splash";
import Chat from "./pages/Chat";
import Conversations from "./pages/Conversations";
import Connections from "./pages/Connections";
import Settings from "./pages/Settings";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import HomeSpline from "./pages/HomeSpline";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "./firebase/firebase";

// Protected Route Component
const ProtectedRoute = ({ user, children }) => {
  if (user === undefined) {
    return <div>Loading...</div>;
  }
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

// Redirect to /convo if the user is logged in and tries to access /login
const NoAuthRoute = ({ user, children }) => {
  if (user === undefined) {
    return <div>Loading...</div>;
  }
  if (user) {
    return <Navigate to="/convo" />;
  }
  return children;
};

function App() {
  const [user, setUser] = useState(undefined); // Set initial state to undefined
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false); // Set loading to false once auth state is checked
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="signup" element={<NoAuthRoute user={user}><SignUp /></NoAuthRoute>} />
        
        {/* NoAuthRoute for /login */}
        <Route path="login" element={<NoAuthRoute user={user}><Login /></NoAuthRoute>} />
        
        <Route path="home" element={<HomeSpline />} />
        <Route path="about" element={<About />} />
        
        {/* Protected Route for /chat */}
        <Route path="chat" element={<ProtectedRoute user={user}><Chat /></ProtectedRoute>} />

        {/* Protected Route for /convo */}
        <Route path="convo" element={<ProtectedRoute user={user}><Conversations /></ProtectedRoute>} />
        
        <Route path="connect" element={<Connections />} />
        <Route path="settings" element={<Settings />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
