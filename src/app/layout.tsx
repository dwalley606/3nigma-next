import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import LogoutButton from './components/auth/LogoutButton';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: '3nigma - Secure Messaging',
  description: 'An end-to-end encrypted messaging app built with Next.js and Supabase',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex min-h-screen bg-gray-900 text-gray-100`}>
        {/* Sidebar with Navigation */}
        <div className="w-1/4 bg-gray-800 shadow-lg p-4 overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4 text-gray-100">3nigma</h2>
          <nav>
            <Link href="/conversations" className="block py-2 px-4 text-gray-300 font-semibold hover:bg-gray-700 rounded-md">
              Conversations
            </Link>
            <Link href="/contacts" className="block py-2 px-4 text-gray-300 font-semibold hover:bg-gray-700 rounded-md mt-2">
              Contacts
            </Link>
            <Link href="/login" className="block py-2 px-4 text-gray-300 font-semibold hover:bg-gray-700 rounded-md mt-2">
              Login
            </Link>
            <Link href="/signup" className="block py-2 px-4 text-gray-300 font-semibold hover:bg-gray-700 rounded-md mt-2">
              Sign Up
            </Link>
            <LogoutButton />
          </nav>
        </div>
        {/* Main Content */}
        <div className="flex-1 p-6 bg-gray-800 text-gray-100">{children}</div>
      </body>
    </html>
  );
}