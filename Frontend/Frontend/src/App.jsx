import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Signup from './Components/Signup'
import "./App.css"
import Login from './Components/login'
import HomePage from './Components/home'
import ChatPage from './Components/ChatPage'


function App() {
  return (
    
    <div>
   
    
      <Routes>
      <Route path="/" element={<HomePage/>} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ChatPage" element={<ChatPage />} />
       
      </Routes>
    </div>
  );
}

export default App;