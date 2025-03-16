import Link from 'next/link';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="w-1/4 bg-gray-800 shadow-lg p-4 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4 text-gray-100">3nigma</h2>
        <nav>
          <Link
            href="/dashboard/conversations"
            className="block py-2 px-4 text-gray-300 font-semibold hover:bg-gray-700 rounded-md"
          >
            Conversations
          </Link>
          <Link
            href="/dashboard/contacts"
            className="block py-2 px-4 text-gray-300 font-semibold hover:bg-gray-700 rounded-md mt-2"
          >
            Contacts
          </Link>
          <Link
            href="/dashboard/login"
            className="block py-2 px-4 text-gray-300 font-semibold hover:bg-gray-700 rounded-md mt-2"
          >
            Login
          </Link>
          <Link
            href="/dashboard/signup"
            className="block py-2 px-4 text-gray-300 font-semibold hover:bg-gray-700 rounded-md mt-2"
          >
            Sign Up
          </Link>
          {/* LogoutButton will be added once auth is integrated */}
        </nav>
      </div>
      <div className="flex-1 p-6 bg-gray-800 text-gray-100">{children}</div>
    </>
  );
}