

import React, { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
//import { FaFacebook } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function Login() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('লগইন তথ্য:', form)
    alert('লগইন সফল হয়েছে!')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="card w-full max-w-md shadow-xl bg-white p-8 rounded-lg">
        <div className="flex justify-center mb-4">
          <img src="/logo.png" alt="লোগো" className="w-12" />
        </div>
        <h2 className="text-2xl font-bold text-center mb-2">আপনার অ্যাকাউন্টে সাইন ইন করুন</h2>
        <p className="text-center text-gray-500 mb-6">লগইন করতে আপনার ইমেইল এবং পাসওয়ার্ড দিন</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-700">ইমেইল</span>
            </label>
            <input
              type="email"
              name="email"
              className="input input-bordered w-full p-3 border rounded-lg"
              placeholder="আপনার ইমেইল লিখুন"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-control relative">
            <label className="label">
              <span className="label-text text-gray-700">পাসওয়ার্ড</span>
            </label>
            <input
              type="password"
              name="password"
              className="input input-bordered w-full p-3 border rounded-lg"
              placeholder="আপনার পাসওয়ার্ড লিখুন"
              value={form.password}
              onChange={handleChange}
              required
            />
            <a href="#" className="text-blue-500 text-sm text-right block mt-2">পাসওয়ার্ড ভুলে গেছেন?</a>
          </div>

          <div className="form-control mt-6">
            <button className="btn bg-green-600 hover:bg-green-700 text-white w-full py-3 rounded-lg">লগইন করুন</button>
          </div>
        </form>
        
        <div className="text-center my-4 text-gray-500">অথবা</div>
        
        <div className="form-control">
          <button className="btn btn-outline flex items-center justify-center w-full py-3 border rounded-lg">
            <FcGoogle className="mr-2 text-xl" /> গুগল দিয়ে লগইন করুন
          </button>
        </div>

        <p className="text-center text-gray-500 mt-4">
          আপনার কি অ্যাকাউন্ট নেই? <Link to="/signup" className="text-blue-500">সাইন আপ করুন</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
