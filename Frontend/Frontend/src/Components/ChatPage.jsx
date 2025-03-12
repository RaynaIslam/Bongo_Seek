import React from "react";
import { useNavigate } from "react-router-dom"; // ✅ import navigate hook
import { FiSend } from "react-icons/fi";

const ChatPage = () => {
  const navigate = useNavigate(); // ✅ initialize navigate

  const handleLogout = () => {
    // Optional: clear any auth/session data here
    navigate("/"); // ✅ redirect to homepage
};
  return (
    <div className="flex h-screen bg-green-50 text-gray-800">
      {/* Sidebar */}
      <div className="w-64 p-4 border-r border-green-100 bg-green-100 flex flex-col justify-between">
        <div>
          <button className="bg-green-300 hover:bg-green-400 text-white w-full py-2 rounded mb-4 font-semibold">
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
            onClick={handleLogout} // ✅ log out functionality
          >
            লগ আউট
          </li>
        </ul>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col justify-between">
        <div className="p-8 text-center">
          <h1 className="text-3xl font-bold">
            চ্যাটজিপিটি <span className="text-purple-500 text-sm bg-purple-100 px-2 py-1 rounded ml-1">প্লাস</span>
          </h1>

          {/* Sections */}
          <div className="grid grid-cols-3 gap-8 mt-8 max-w-4xl mx-auto text-sm text-center">
            {/* Narrative Writing */}
            <div>
              <h2 className="font-semibold mb-2">গল্পধর্মী লেখা</h2>
              <div className="space-y-2">
                <p className="bg-green-200 p-2 rounded">"কোয়ান্টাম কম্পিউটিং সহজভাবে ব্যাখ্যা করুন"</p>
                <p className="bg-green-200 p-2 rounded">"১০ বছর বয়সী বাচ্চার জন্মদিনের জন্য মজার আইডিয়া দিন"</p>
                <p className="bg-green-200 p-2 rounded">"জাভাস্ক্রিপ্টে HTTP অনুরোধ কীভাবে করব?"</p>
              </div>
            </div>

            {/* Expository Writing */}
            <div>
              <h2 className="font-semibold mb-2">ব্যাখ্যামূলক লেখা</h2>
              <div className="space-y-2">
                <p className="bg-green-200 p-2 rounded">ব্যবহারকারীর পূর্বের কথাগুলো মনে রাখে।</p>
                <p className="bg-green-200 p-2 rounded">ব্যবহারকারীর সংশোধন গ্রহণ করে।</p>
                <p className="bg-green-200 p-2 rounded">অনুপযুক্ত অনুরোধ প্রত্যাখ্যান করতে প্রশিক্ষিত।</p>
              </div>
            </div>

            {/* Descriptive Writing */}
            <div>
              <h2 className="font-semibold mb-2">বর্ণনামূলক লেখা</h2>
              <div className="space-y-2">
                <p className="bg-green-200 p-2 rounded">মাঝেমধ্যে ভুল তথ্য দিতে পারে।</p>
                <p className="bg-green-200 p-2 rounded">কখনও কখনও ক্ষতিকর বা পক্ষপাতমূলক কনটেন্ট তৈরি করতে পারে।</p>
                <p className="bg-green-200 p-2 rounded">২০২১ সালের পরের তথ্য সীমিত।</p>
              </div>
            </div>
          </div>
        </div>

        {/* Message input box */}
        <div className="w-full px-8 pb-6">
          <form className="flex items-center max-w-3xl mx-auto bg-white border border-gray-300 rounded-full shadow px-4 py-2">
            <input
              type="text"
              placeholder="এখানে লিখুন..."
              className="flex-1 outline-none bg-transparent px-2 py-1"
            />
            <button
              type="submit"
              className="text-green-600 hover:text-green-800 text-xl"
            >
              <FiSend />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatPage
