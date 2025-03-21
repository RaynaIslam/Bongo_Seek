import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiSend } from "react-icons/fi";
import logo from "../assets/Bongoseek-Logo.png";

const ChatPage = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [submittedQuestion, setSubmittedQuestion] = useState(""); // New state
  const [response, setResponse] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      navigate("/login");
    } else {
      setToken(storedToken);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setSubmittedQuestion(message); // Save the question before clearing input
    setResponse(""); // Clear the previous response
    setMessage(""); // Clear input field but keep the question displayed

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
        setResponse(`❌ ${errorData.error || "Problem with server"}`);
        return;
      }

      const data = await res.json();
      setResponse(data.response || "❌ No answer found!");
    } catch (error) {
      setResponse("❌ Server was disconnected!");
    }
};


  return (
    <div className="flex h-screen bg-green-50 text-green-800">
      {/* Sidebar */}
      <div className="w-64 p-4 border-r border-green-200 bg-white flex flex-col justify-between shadow-md">
        <div>
          <button className="bg-green-800 hover:bg-green-900 text-white w-full py-2 rounded mb-4 font-semibold">
            + New Chat
          </button>
        </div>
        <ul className="space-y-2 text-sm">
          <li className="cursor-pointer hover:underline text-red-600" onClick={handleLogout}>
            Log Out
          </li>
        </ul>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col justify-between p-8">
        {/* Centered Logo */}
        <div className="flex justify-center">
          <img src={logo} alt="Logo" className="h-20" />
        </div>

        <div className="max-w-3xl mx-auto w-full space-y-4">
          {/* User Input Box */}
          <div className="p-4 bg-white border border-green-300 rounded shadow-md">
            <h2 className="text-lg font-semibold">Question:</h2>
            <p className="mt-2 text-green-700">{submittedQuestion || ""}</p>
          </div>

          {/* AI Response Box */}
          <div className="p-4 bg-white border border-green-300 rounded shadow-md">
            <h2 className="text-lg font-semibold">AI:</h2>
            <p className="mt-2 text-green-700">{response || "The answer is given here..."}</p>
          </div>
        </div>

        {/* Message input box */}
        <div className="w-full px-8 pb-6">
          <form onSubmit={handleSendMessage} className="flex items-center max-w-3xl mx-auto bg-white border border-green-300 rounded-full shadow px-4 py-2">
            <input
              type="text"
              placeholder="Ask Here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 outline-none bg-transparent px-2 py-1 text-green-800"
            />
            <button type="submit" className="text-white bg-green-800 hover:bg-green-900 rounded-full p-2">
              <FiSend />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
