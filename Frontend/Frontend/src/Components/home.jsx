import React from "react";
import { Link } from "react-router-dom";


const HomePage = () => {
  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center p-4">
      <nav className="w-full flex justify-end p-4 bg-green-600 text-white fixed top-0 left-0 right-0 space-x-4">
        <Link to="/Signup" className="btn btn-primary">সাইন আপ</Link>
        <Link to="/login" className="btn btn-secondary">লগইন</Link>
      </nav>
      <div className="min-h-screen w-full bg-gradient-to-b from-green-100 to-green-300 flex flex-col items-center justify-center text-center pt-16">
        <h1 className="text-5xl font-bold text-green-700 mt-10">অনুসন্ধানী</h1>
        <h2 className="text-2xl text-gray-700 mt-2">অজানার পথে</h2>
        <div className="mt-10 flex gap-6 w-full justify-center">
          <div className="p-6 bg-white rounded-lg shadow-lg w-64">
            <h3 className="text-green-600 font-semibold">এখনই শুরু করুন</h3>
            <p className="text-gray-600 text-sm mt-2">অনুসন্ধানী-V3 তে বিনামূল্যে প্রবেশ করুন। বুদ্ধিমান মডেলের অভিজ্ঞতা নিন।</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg w-64">
            <h3 className="text-green-600 font-semibold">অনুসন্ধানী অ্যাপ পান</h3>
            <p className="text-gray-600 text-sm mt-2">অনুসন্ধানী-V3 এর সাথে চ্যাট করুন। আপনার নিখরচায় সর্ব-একটি AI টুল।</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
