"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { generateKeyPair } from "@/lib/crypto";

export default function Signup() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const router = useRouter();

  const handleSignup = async (): Promise<void> => {
    try {
      const trimmedEmail = email.trim();
      console.log("Raw email input:", email); // Before trim
      console.log("Trimmed email sent:", trimmedEmail); // After trim
      if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
        throw new Error("Please enter a valid email address");
      }
      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters");
      }
  
      const { data, error } = await supabase.auth.signUp({ email: trimmedEmail, password });
      console.log("SignUp response:", { data, error });
      // ...rest of the function...
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Signup failed";
      setMessage(errorMessage);
      console.error("Signup error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign Up for 3NIGMA</h1>
        <input
          type="text"
          value={username}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
          placeholder="Username"
          className="w-full p-3 mb-4 bg-gray-50 border border-gray-300 rounded-md text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <input
          type="email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-3 mb-4 bg-gray-50 border border-gray-300 rounded-md text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <input
          type="password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-3 mb-4 bg-gray-50 border border-gray-300 rounded-md text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <input
          type="text"
          value={phoneNumber}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhoneNumber(e.target.value)}
          placeholder="Phone Number (optional)"
          className="w-full p-3 mb-6 bg-gray-50 border border-gray-300 rounded-md text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <button
          onClick={handleSignup}
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors"
        >
          Sign Up
        </button>
        <p className="mt-4 text-center text-gray-600">
          Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login</a>
        </p>
        <p className="mt-2 text-center text-gray-600">{message}</p>
      </div>
    </div>
  );
}