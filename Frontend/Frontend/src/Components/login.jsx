import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "./api"; // Import the login API function
import logo from "../assets/Bongoseek-Logo.png";

//import logo from "./logo.png"; // Import the logo image

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(""); // To store error messages

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    const result = await login(form.email, form.password);

    if (result.error) {
      setError(result.error);
    } else {
      // Store JWT token for authentication
      localStorage.setItem("token", result.token);
      alert("✅ Login successful!");
      navigate("/ChatPage"); // Redirect to ChatPage
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="card w-full max-w-md shadow-xl bg-white p-8 rounded-lg">
        <div className="flex justify-center mb-4">
          <img src={logo} alt="Logo" className="w-28" /> {/* Added logo */}
        </div>
        <h2 className="text-2xl font-bold text-center mb-2">
          Login to your account
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Enter your email and password to log in
        </p>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-700">Email</span>
            </label>
            <input
              type="email"
              name="email"
              className="input input-bordered w-full p-3 border rounded-lg"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-control relative">
            <label className="label">
              <span className="label-text text-gray-700">Password</span>
            </label>
            <input
              type="password"
              name="password"
              className="input input-bordered w-full p-3 border rounded-lg"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <a href="#" className="text-blue-500 text-sm text-right block mt-2">
              Forgot password?
            </a>
          </div>

          <div className="form-control mt-6">
            <button className="btn bg-green-600 hover:bg-green-700 text-white w-full py-3 rounded-lg">
              Log in
            </button>
          </div>
        </form>

        <p className="text-center text-gray-500 mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;