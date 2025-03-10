import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">3NIGMA</h1>
        <p className="text-xl text-gray-600 max-w-2xl">
          A privacy-first, end-to-end encrypted messaging app inspired by Signal—built with Next.js, Supabase, and Tailwind CSS.
        </p>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mb-12">
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">E2EE Messaging</h2>
          <p className="text-gray-600">
            Secure 1:1 and group chats with end-to-end encryption—your privacy, guaranteed.
          </p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Real-Time Updates</h2>
          <p className="text-gray-600">
            Instant message delivery with Supabase Realtime—built for speed and reliability.
          </p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Modern Stack</h2>
          <p className="text-gray-600">
            Next.js App Router, Tailwind CSS, and Supabase—showcasing full-stack prowess.
          </p>
        </div>
      </div>

      {/* Why It’s Cool */}
      <div className="text-center mb-12 max-w-3xl">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Why 3NIGMA?</h2>
        <p className="text-gray-600">
          Designed and built by Daniel Walley, this app demonstrates expertise in modern web development—secure, scalable, and user-friendly. From E2EE to real-time features, it’s a testament to clean code and innovative design. Employers: hire me to bring this level of craft to your team!
        </p>
      </div>

      {/* CTA */}
      <div className="flex gap-4">
        <Link href="/signup">
          <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors">
            Sign Up
          </button>
        </Link>
        <Link href="/login">
          <button className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-700 transition-colors">
            Login
          </button>
        </Link>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-gray-500 text-sm">
        <p>Built by Daniel Walley | <a href="https://github.com/dwalley606" className="underline">GitHub</a> | <a href="https://linkedin.com/in/daniel-walley" className="underline">LinkedIn</a></p>
      </footer>
    </div>
  );
}
