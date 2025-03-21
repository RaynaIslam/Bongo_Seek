import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { signup } from './api'; // Import the signup API function
import { useNavigate } from 'react-router-dom';
import logo from "../assets/Bongoseek-Logo.png";
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
    setError('');
  
    const result = await signup(form.username, form.email, form.password);
  
    if (result.error) {
      setError(result.error);
    } else {
      alert('✅ Signup successful! Please verify your email.');
      navigate('/Verify2FA', { state: { email: form.email } }); // Redirect to verification page
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-white-100">
      <div className="card w-full max-w-md shadow-xl bg-white p-8 rounded-lg">
        <div className="flex justify-center mb-4">
          <img src={logo} alt="Logo" className="h-20" />
        </div>
        <h2 className="text-2xl font-bold text-center mb-2">Create Account</h2>
        <p className="text-center text-gray-500 mb-6">Create a free account and get started</p>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-700">Username</span>
            </label>
            <input
              type="text"
              name="username"
              className="input input-bordered w-full p-3 border rounded-lg"
              value={form.username}
              placeholder="Username"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-700">Email</span>
            </label>
            <input
              type="email"
              name="email"
              className="input input-bordered w-full p-3 border rounded-lg"
              value={form.email}
              placeholder="Email"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-control relative">
            <label className="label">
              <span className="label-text text-gray-700">Password</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                className="input input-bordered w-full p-3 border rounded-lg pr-10"
                value={form.password}
                placeholder="Password"
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
              Forgot password?
            </a>
          </div>

          <div className="form-control mt-6">
            <button type="submit" className="btn bg-green-600 hover:bg-green-700 text-white w-full py-3 rounded-lg">
              Create Account
            </button>
          </div>
        </form>

        <p className="text-center text-gray-500 mt-4">
          Already have an account? <a href="/login" className="text-blue-500">Log in</a>
        </p>
      </div>
    </div>
  );
}

export default SignUp;