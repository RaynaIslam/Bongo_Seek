import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { signup } from './api'; // Import the signup API function
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    const result = await signup(form.username, form.email, form.password);

    if (result.error) {
      setError(result.error);
    } else {
      alert('✅ সাইন আপ সফল হয়েছে! এখন লগইন করুন।');
      navigate('/login'); // Redirect to login page
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white-100">
      <div className="card w-full max-w-md shadow-xl bg-white p-8 rounded-lg">
        <div className="flex justify-center mb-4">
          <img src="/logo.png" alt="লোগো" className="w-12" />
        </div>
        <h2 className="text-2xl font-bold text-center mb-2">একাউন্ট তৈরি করুন</h2>
        <p className="text-center text-gray-500 mb-6">ফ্রি একাউন্ট তৈরি করুন এবং শুরু করুন</p>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-700">ইউজারনেম</span>
            </label>
            <input
              type="text"
              name="username"
              className="input input-bordered w-full p-3 border rounded-lg"
              value={form.username}
              placeholder="ইউজারনেম"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-700">ইমেইল</span>
            </label>
            <input
              type="email"
              name="email"
              className="input input-bordered w-full p-3 border rounded-lg"
              value={form.email}
              placeholder="ইমেইল"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-control relative">
            <label className="label">
              <span className="label-text text-gray-700">পাসওয়ার্ড</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                className="input input-bordered w-full p-3 border rounded-lg pr-10"
                value={form.password}
                placeholder="পাসওয়ার্ড"
                onChange={handleChange}
                required
              />
              <div
                className="absolute inset-y-0 right-3 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            <a href="#" className="text-blue-500 text-sm text-right block mt-2">
              পাসওয়ার্ড ভুলে গেছেন?
            </a>
          </div>

          <div className="form-control mt-6">
            <button type="submit" className="btn bg-green-600 hover:bg-green-700 text-white w-full py-3 rounded-lg">
              একাউন্ট তৈরি করুন
            </button>
          </div>
        </form>

        <p className="text-center text-gray-500 mt-4">
          ইতিমধ্যে একাউন্ট আছে? <a href="/login" className="text-blue-500">লগইন করুন</a>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
