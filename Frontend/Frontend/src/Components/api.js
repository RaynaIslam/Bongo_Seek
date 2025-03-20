import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8080"; // Flask backend URL

// Signup
export const signup = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signup`, {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    return error.response?.data || { error: "Signup failed" };
  }
};

// Login
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    return error.response?.data || { error: "Login failed" };
  }
};

// Chat API (Send Prompt)
export const chatWithAI = async (prompt) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/chat`, { prompt });
    return response.data;
  } catch (error) {
    return error.response?.data || { error: "Chat request failed" };
  }
};

