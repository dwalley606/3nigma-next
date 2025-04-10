'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../utils/supabase/client';
import { useRouter, useSearchParams } from 'next/navigation';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user, signOut, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const mode = searchParams.get('mode');
    setIsSignUp(mode === 'signup');
    console.log('AuthPage useEffect - User:', user, 'Loading:', loading);
    if (!loading && user) {
      console.log('Redirecting to /dashboard from useEffect');
      router.push('/dashboard');
    }
  }, [searchParams, user, loading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) {
          if (error.status === 422 && error.message.includes('User already registered')) {
            setError('Email already registered. Try signing in.');
          } else {
            throw error;
          }
        } else {
          console.log('Signup response:', data);
          alert('Sign-up successful! Check your email to confirm.');
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        console.log('Sign-in response:', data);
        console.log('Pushing to /dashboard from handleSubmit');
        // Force redirect after successful sign-in
        router.push('/dashboard');
        // Ensure navigation happens even if state lags
        setTimeout(() => {
          if (!window.location.pathname.startsWith('/dashboard')) {
            window.location.href = '/dashboard';
          }
        }, 500); // Fallback if router.push fails
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  if (loading) return <div>Loading...</div>;

  if (user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p>Welcome, {user.email}!</p>
        <button onClick={handleSignOut} className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl mb-4">{isSignUp ? 'Sign Up' : 'Sign In'}</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="px-4 py-2 border rounded"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="px-4 py-2 border rounded"
          required
        />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </button>
      </form>
      <button onClick={() => setIsSignUp(!isSignUp)} className="mt-4 text-blue-500 hover:underline">
        {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
      </button>
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
}