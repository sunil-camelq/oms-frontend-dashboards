// src/pages/Login.tsx
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  role: string;
  [key: string]: any;
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
      });

      const { token } = response.data;
      localStorage.setItem("token", token);

      // 🔹 Decode token
      const decoded = jwtDecode<DecodedToken>(token);
      const role = decoded.role;
      console.log("User role from token:", role);

      // ✅ Role-based navigation using if/else
      if (role === "Employee") {
        navigate("/emp/dashboard");
      } else if (role === "Director") {
        navigate("/dir/dashboard");
      }  else {
        ("default-dashboard"); // fallback route
      }

      setSuccess("Login successful!");
    } catch (error: any) {
      setError(error.response?.data?.message || error.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0e3cf] px-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-2xl">
        {/* Logo */}
        <img src="/placeholder.svg" alt="CamelQ Logo" className="w-24 mx-auto" />

        {/* Title */}
        <h2 className="text-center text-2xl font-bold text-[#be2350]">
          Login to Your Account
        </h2>

        {/* Error & Success Messages */}
        {error && <p className="text-sm text-red-600 text-center">{error}</p>}
        {success && <p className="text-sm text-green-600 text-center">{success}</p>}

        {/* Form */}
        <form className="space-y-4" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Company Email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#be2350]"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#be2350]"
            required
          />
          <button
            type="submit"
            className="w-full py-2 bg-[#be2350] text-white rounded-md font-semibold hover:bg-[#a01e43] transition-colors duration-200"
          >
            Login
          </button>
        </form>

        {/* Forgot Password */}
        <div className="text-center text-sm text-gray-700">
          <Link to="/forgot-password" className="hover:underline text-[#be2350]">
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
}
