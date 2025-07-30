import React, { useState } from "react";
import axios from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";


function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const registerUser = async () => {
    try {
      await axios.post("/user/register", { email, password });
      navigate("/login");
    } catch (err) {
      console.error("Registration Error:", err);
      if (err.response?.data?.message) {
        alert(err.response.data.message);
      } else if (err.response?.status === 500 && err.response?.data) {
        alert("Email is already registered.");
      } else {
        alert("Something went wrong.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring focus:border-blue-400"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring focus:border-blue-400"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={registerUser}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default Register;
