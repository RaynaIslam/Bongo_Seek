import React from "react";
import { Link } from "react-router-dom";
import landing_page_image from "../assets/Untitled_design__1_-removebg-preview.png";
import logo from "../assets/Bongoseek-Logo.png";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-green-50 text-green-800 font-sans">
      {/* Navigation Bar */}
      <nav className="w-full flex justify-between items-center px-6 md:px-10 py-4 bg-white shadow-md fixed top-0 left-0 right-0 z-10">
        <img src={logo} alt="BongoSeek Logo" className="h-10 md:h-12" />
        <div className="space-x-2 md:space-x-4">
          <Link to="/login" className="text-green-800 hover:text-green-900 transition text-sm md:text-base">
            Login
          </Link>
          <Link to="/signup" className="bg-green-800 text-white px-4 md:px-6 py-2 md:py-3 rounded hover:bg-green-900 transition text-sm md:text-base">
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row justify-between items-center px-6 md:px-16 pt-32 md:pt-40 lg:pt-36">
        {/* Left Content */}
        <div className="max-w-lg text-center lg:text-left flex flex-col items-center lg:items-start space-y-4">
          <img src={logo} alt="BongoSeek Logo" className="h-16 md:h-24 pb-2" />
          <p className="text-green-800 leading-relaxed text-base md:text-lg">
            BongoSeek is a smart AI-powered chatbot designed for fast, accurate, and seamless conversations. It helps with education, information retrieval, general knowledge, and more.
          </p>

          {/* Get Started Button */}
          <div className="mt-6 flex flex-col items-center lg:items-start pt-6 space-y-4">
            <Link to="/login" className="bg-green-800 text-white px-4 md:px-6 py-2 md:py-3 rounded hover:bg-green-900 transition text-sm md:text-base">
              Get Started
            </Link>
          </div>
        </div>

        {/* Image Section */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end mt-10 lg:mt-0">
          <img
            src={landing_page_image}
            alt="AI chatbot illustration"
            className="w-[90%] md:w-[80%] lg:w-[600px] xl:w-[700px] max-w-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
