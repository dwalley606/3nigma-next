'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/app/utils/supabase/client';
import Link from 'next/link';

export default function SignupPage() {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const router = useRouter();
  const supabase = createClient();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const trimmedEmail = email.trim();
      if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
        throw new Error('Please enter a valid email address');
      }
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }
      if (!username) {
        throw new Error('Username is required');
      }

      const publicKey = `mock-public-key-${username}`;
      const privateKey = `mock-private-key-${username}`;

      const { data, error } = await supabase.auth.signUp({
        email: trimmedEmail,
        password,
        options: {
          data: { username, phone_number: phoneNumber || '' },
        },
      });

      if (error) throw error;
      if (!data.user) throw new Error('Signup failed: No user returned');

      const { error: userError } = await supabase.from('users').insert({
        id: data.user.id,
        username,
        email: trimmedEmail,
        phone_number: phoneNumber || null,
        public_key: publicKey,
      });

      if (userError) throw userError;

      const { error: keyError } = await supabase.from('encryption_keys').insert({
        user_id: data.user.id,
        public_key: publicKey,
        private_key: privateKey,
      });

      if (keyError) throw keyError;

      if (data.session) {
        setMessage('Signed up and logged in!');
        router.push('/dashboard/conversations');
      } else {
        setMessage('Signed up! Please log in.');
        router.push('/dashboard/login');
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Signup failed';
      setMessage(errorMessage);
      console.error('Signup error:', err);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-100 mb-6">Sign Up for 3nigma</h2>
        {message && <p className={message.includes('failed') ? 'text-red-500' : 'text-green-500'}>{message}</p>}
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-300 mb-2">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-300 mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-300 mb-2">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="phoneNumber" className="block text-gray-300 mb-2">Phone Number (optional)</label>
            <input
              type="text"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:border-blue-500"
            />
          </div>
          <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-gray-400 text-center">
          Already have an account?{' '}
          <Link href="/dashboard/login" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}