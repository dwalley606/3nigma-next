// src/app/signup/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSignup = async () => {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();

    if (res.ok) {
      setMessage("Signup successful! Redirecting to login...");
      setTimeout(() => router.push("/"), 2000); // Redirect to login (Home)
    } else {
      setMessage(data.error || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
          Sign Up for 3NIGMA
        </h1>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-2 mt-1 mb-4 bg-gray-700 rounded-md text-white border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-2 mt-1 mb-4 bg-gray-700 rounded-md text-white border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <button
          onClick={handleSignup}
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors"
        >
          Sign Up
        </button>
        <p className="mt-4 text-center text-gray-400">
          Already have an account?{" "}
          <Link href="/" className="text-blue-400 hover:underline">Login</Link>
        </p>
        <p className="mt-2 text-center text-gray-400">{message}</p>
      </div>
    </div>
  );
}