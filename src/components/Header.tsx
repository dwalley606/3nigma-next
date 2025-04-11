export default function Header({ username }: { username: string }) {
    return (
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">3nigma</h1>
        <div className="text-sm">Welcome, {username}</div>
      </header>
    );
  }