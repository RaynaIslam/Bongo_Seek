import React, { useState } from "react";
import { verify2FA } from "./api"; // Import the API call function
import { useNavigate, useLocation } from "react-router-dom";

function Verify2FA() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");

    const result = await verify2FA(email, code);
    if (result.error) {
      setError(result.error);
    } else {
      alert("✅ Verification successful! You can now log in.");
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="card w-full max-w-md shadow-xl bg-white p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Verify Your Email</h2>
        <p className="text-center text-gray-500 mb-4">
          Enter the verification code sent to your email.
        </p>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleVerify} className="space-y-4">
          <div className="form-control">
            <input
              type="text"
              name="code"
              className="input input-bordered w-full p-3 border rounded-lg"
              value={code}
              placeholder="Enter verification code"
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn bg-green-600 hover:bg-green-700 text-white w-full py-3 rounded-lg"
          >
            Verify
          </button>
        </form>
      </div>
    </div>
  );
}

export default Verify2FA;
