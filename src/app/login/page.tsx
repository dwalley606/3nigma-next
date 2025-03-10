"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      console.log("Supabase auth error:", error.message, error.status, error.code);
      setMessage(error.message);
      return;
    }
    if (data.session) {
      router.push("/conversations");
    } else {
      setMessage("Login failed: No session returned");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Login to 3NIGMA</h1>
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
          onClick={handleLogin}
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors"
        >
          Login
        </button>
        <p className="mt-4 text-center text-gray-600">
          Need an account? <a href="/signup" className="text-blue-600 hover:underline">Sign Up</a>
        </p>
        <p className="mt-2 text-center text-gray-600">{message}</p>
      </div>
    </div>
  );
}