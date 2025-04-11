'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SettingsPage() {
  const { session, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !session) {
      router.push('/auth?mode=login');
    }
  }, [loading, session, router]);

  if (loading) return <p>Loading...</p>;
  if (!session) return null;

  return (
    <div className="p-6">
      <h2 className="text-lg font-bold mb-4">Settings</h2>
      <p>Manage your account settings here.</p>
      <p>Email: {session.user.email}</p>
    </div>
  );
}