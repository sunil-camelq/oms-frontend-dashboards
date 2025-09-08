import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Mail, Key } from "lucide-react";

export default function ForgotPassword() {
  const [method, setMethod] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [timer, setTimer] = useState(0);
  const [maxTimer, setMaxTimer] = useState(0);
  const navigate = useNavigate();

  // Countdown timer
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    if (timer === 0) setDisabled(false);
  }, [timer]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return alert("Please enter your email");

    try {
      if (method === "email") {
        const res = await axios.post("http://localhost:3000/auth/forgot-password", { email });
        alert(res.data.message || "Reset link sent. Check your email.");
        setDisabled(true);
        setTimer(10);
        setMaxTimer(10);
      } else {
        const res = await axios.post("http://localhost:3000/auth/send-otp", { email });
        alert(res.data.message || "OTP sent to your email.");
        setDisabled(true);
        setTimer(15);
        setMaxTimer(15);
        navigate("/otp-verification", { state: { email } });
      }
    } catch (err: any) {
      alert(err.response?.data?.message || "Error sending request");
    }
  };

  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const progress = timer > 0 ? ((maxTimer - timer) / maxTimer) * circumference : 0;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      {/* Single card layout */}
      <div className="bg-white rounded-3xl shadow-xl max-w-md w-full p-8 flex flex-col">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Reset Password</h2>
          <p className="text-gray-500 mt-2">Enter your email to reset your password</p>
        </div>

        {/* Method Selection */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            type="button"
            onClick={() => setMethod("email")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition transform hover:scale-105 ${
              method === "email"
                ? "bg-blue-600 text-white shadow"
                : "bg-white text-blue-600 border border-blue-600"
            }`}
          >
            <Mail size={18} /> Email Link
          </button>
          <button
            type="button"
            onClick={() => setMethod("otp")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition transform hover:scale-105 ${
              method === "otp"
                ? "bg-green-600 text-white shadow"
                : "bg-white text-green-600 border border-green-600"
            }`}
          >
            <Key size={18} /> OTP
          </button>
        </div>

        {/* Email Input */}
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          required
        />

        {/* Submit Button */}
        <div className="relative w-full">
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={disabled}
            className={`w-full py-2 rounded-lg font-semibold text-lg transition transform hover:scale-105 flex justify-center items-center gap-2 ${
              disabled
                ? "bg-gray-400 cursor-not-allowed text-gray-700"
                : "bg-blue-600 hover:bg-blue-700 text-white shadow"
            }`}
          >
            {disabled ? "Please wait" : method === "email" ? "Send Reset Link" : "Send OTP"}
          </button>

          {disabled && (
            <svg className="absolute right-3 top-1/2 -translate-y-1/2" width={48} height={48}>
              <circle
                cx={24}
                cy={24}
                r={radius}
                stroke="#d1d5db"
                strokeWidth="4"
                fill="transparent"
              />
              <circle
                cx={24}
                cy={24}
                r={radius}
                stroke="#1e40af"
                strokeWidth="4"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={circumference - progress}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-linear"
              />
            </svg>
          )}
        </div>

        <p className="mt-6 text-gray-500 text-sm text-center">
          Remembered your password?{" "}
          <a href="/login" className="text-blue-600 font-semibold hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
