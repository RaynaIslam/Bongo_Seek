import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Signup from './Components/Signup'
import "./App.css"
import Login from './Components/login'

function App() {
  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center p-4">
      <nav className="mb-8 space-x-4">
        <Link to="/Signup" className="btn btn-primary">সাইন আপ</Link>
        <Link to="/login" className="btn btn-secondary">লগইন</Link>
      </nav>

      <Routes>
        <Route path="/Signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        {/* Optional: Default route */}
        <Route path="*" element={<div className="text-xl text-gray-700">পৃষ্ঠাটি খুঁজে পাওয়া যায়নি</div>} />
      </Routes>
    </div>
  )
}

export default App
