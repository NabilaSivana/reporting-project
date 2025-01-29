import React, { useState } from "react";
import illustration from "../assets/images/animasi-login.png";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        navigate("");
      } else {
        const data = await response.json();
        setErrorMessage(data.message || "Invalid email or password");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="flex justify-between items-center h-screen bg-[#F3F5F9] p-0">
      <div className="login-form p-[150px]">
        <h1 className="text-4xl font-bold mb-6">Login</h1>
        {errorMessage && (
          <div className="text-red-500 font-bold mb-5">{errorMessage}</div>
        )}
        <form onSubmit={handleSubmit} className="relative">
          <div className="form-group mb-5">
            <label htmlFor="email" className="block mb-2 font-bold">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Type here"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-[150%] p-[10px] border border-[#ccc] rounded-[4px]"
            />
          </div>
          <div className="form-group mb-5">
            <label htmlFor="password" className="block mb-2 font-bold">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Type here"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-[150%] p-[10px] border border-[#ccc] rounded-[4px]"
            />
          </div>
          <div className="absolute bottom-30 left-80 mt-6">
            <button
              type="submit"
              className="p-[8px_40px] bg-[#9854CB] text-white rounded-[4px] hover:bg-[#7a2ba1] focus:outline-none"
            >
              Login
            </button>
          </div>
        </form>
      </div>

      <div className="illustration w-[50%] h-full bg-[#ddacf5] flex justify-center items-center rounded-[8px] shadow-lg">
        <img
          src={illustration}
          alt="Illustration"
          className="max-w-[400px] h-auto object-contain"
        />
      </div>
    </div>
  );
}

export default Login;
