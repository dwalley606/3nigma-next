export default function Header({ username }: { username: string }) {
  return (
    <header className="bg-gray-900 text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-semibold">3nigma</h1>
      <div className="text-sm">Welcome, {username}</div>
    </header>
  );
}