"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/signup";
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();

    if (res.ok) {
      if (isLogin) {
        localStorage.setItem("token", data.token);
        router.push("/messages");
      } else {
        setMessage("Signed up! Switch to login.");
      }
    } else {
      setMessage(data.error || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">3NIGMA</h1>
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setIsLogin(true)}
            className={`px-4 py-2 text-lg font-medium ${isLogin ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"}`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`px-4 py-2 text-lg font-medium ${!isLogin ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"}`}
          >
            Sign Up
          </button>
        </div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-3 mb-4 bg-gray-50 border border-gray-300 rounded-md text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-3 mb-6 bg-gray-50 border border-gray-300 rounded-md text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors"
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>
        <p className="mt-4 text-center text-gray-600">{message}</p>
      </div>
    </div>
  );
}
