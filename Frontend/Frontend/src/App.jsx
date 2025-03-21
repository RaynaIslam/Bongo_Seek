import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./Components/Signup";
import "./App.css";
import Login from "./Components/login";
import HomePage from "./Components/home";
import ChatPage from "./Components/ChatPage";
import Verify2FA from "./Components/Verify2FA";
// Protected Route Component
const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem("token"); // Get token from local storage
  return token ? element : <Navigate to="/login" replace />;
};

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Verify2FA" element={<Verify2FA />} />
        {/* Protected ChatPage Route */}
        <Route path="/ChatPage" element={<ProtectedRoute element={<ChatPage />} />} />
      </Routes>
    </div>
  );
}

export default App;
