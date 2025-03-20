import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiSend } from "react-icons/fi";

const ChatPage = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState(""); // Stores user input
  const [response, setResponse] = useState(""); // Stores AI response
  const [token, setToken] = useState(""); // Stores JWT token

  // Check if the user is authenticated
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      navigate("/login"); // Redirect to login if no token
    } else {
      setToken(storedToken);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    navigate("/login"); // Redirect to login
  };

  // Function to send user input to Flask backend
  const handleSendMessage = async (e) => {
    e.preventDefault(); 
  
    if (!message.trim()) return; 
  
    try {
      const res = await fetch("http://127.0.0.1:8080/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ prompt: message }),
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        console.error("❌ Backend Error:", errorData.error || "Unknown error");
        setResponse(`❌ ${errorData.error || "সার্ভারের সাথে সমস্যা হয়েছে"}`);
        return;
      }
  
      const data = await res.json();
      console.log("📤 Response from Flask:", data); // Debugging log
      setResponse(data.response || "❌ কোনো উত্তর পাওয়া যায়নি!");
    } catch (error) {
      console.error("❌ Fetch Error:", error);
      setResponse("❌ সার্ভারের সাথে সংযোগ ব্যর্থ হয়েছে!");
    }
  
    setMessage(""); 
  };
  

  return (
    <div className="flex h-screen bg-[#F2FBF0] text-gray-800">
      {/* Sidebar */}
      <div className="w-64 p-4 border-r border-green-100 bg-[#E7F4E2] flex flex-col justify-between">
        <div>
          <button className="bg-[#2B8A3E] hover:bg-[#237035] text-white w-full py-2 rounded mb-4 font-semibold">
            + নতুন চ্যাট
          </button>
          <ul className="space-y-2 text-sm">
            <li className="cursor-pointer hover:underline">এআই চ্যাট টুল নীতিশাস্ত্র</li>
            <li className="cursor-pointer hover:underline">এআই চ্যাট টুল প্রভাব লেখা</li>
            <li className="cursor-pointer hover:underline">নতুন চ্যাট</li>
          </ul>
        </div>
        <ul className="space-y-2 text-sm">
          <li className="cursor-pointer hover:underline">চ্যাটগুলো মুছে ফেলুন</li>
          <li className="cursor-pointer hover:underline">লাইট মোড</li>
          <li className="cursor-pointer hover:underline">আমার অ্যাকাউন্ট</li>
          <li className="cursor-pointer hover:underline">আপডেট ও প্রায়শই জিজ্ঞাসিত প্রশ্ন</li>
          <li
            className="cursor-pointer hover:underline text-red-600"
            onClick={handleLogout}
          >
            লগ আউট
          </li>
        </ul>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col justify-between">
        <div className="p-8 text-center">
          <h1 className="text-3xl font-bold">অনুসন্ধানী</h1>

          {/* AI Response Display */}
          {response && (
            <div className="mt-6 p-4 bg-white border border-gray-300 rounded shadow-md text-left max-w-3xl mx-auto">
              <h2 className="font-semibold">AI উত্তর:</h2>
              <p className="mt-2">{response}</p>
            </div>
          )}
        </div>

        {/* Message input box */}
        <div className="w-full px-8 pb-6">
          <form
            onSubmit={handleSendMessage}
            className="flex items-center max-w-3xl mx-auto bg-white border border-gray-300 rounded-full shadow px-4 py-2"
          >
            <input
              type="text"
              placeholder="এখানে লিখুন..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 outline-none bg-transparent px-2 py-1"
            />
            <button
              type="submit"
              className="text-green-600 hover:text-green-800 text-xl bg-[#D2EDCE] rounded-full p-2"
            >
              <FiSend />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
