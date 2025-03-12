import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Signup from './Components/Signup'
import "./App.css"
import Login from './Components/login'
import HomePage from './Components/home'

function App() {
  return (
    
    <div>
    <HomePage/>
    
      <Routes>
        <Route path="/Signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        {/* Optional: Default route */}
        {/* <Route path="*" element={<div className="text-xl text-gray-700">পৃষ্ঠাটি খুঁজে পাওয়া যায়নি</div>} /> */}
      </Routes>
    </div>
  )
}

export default App
