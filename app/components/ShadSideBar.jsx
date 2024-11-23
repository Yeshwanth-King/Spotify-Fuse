import { Home, Settings, LogOut } from "lucide-react";

export default function ShadSideBar() {
  return (
    <div className="h-screen w-64 bg-gray-900 text-white flex flex-col">
      {/* Logo */}
      <div className="px-6 py-4 text-xl font-bold border-b border-gray-700">
        My App
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-6 space-y-4">
        <a
          href="#"
          className="flex items-center gap-4 px-4 py-2 rounded-lg hover:bg-gray-700"
        >
          <Home size={20} />
          Home
        </a>
        <a
          href="#"
          className="flex items-center gap-4 px-4 py-2 rounded-lg hover:bg-gray-700"
        >
          <Settings size={20} />
          Settings
        </a>
      </nav>

      {/* Logout Button */}
      <div className="px-4 py-4 border-t border-gray-700">
        <button className="flex items-center w-full gap-4 px-4 py-2 text-sm font-medium text-red-500 rounded-lg hover:bg-gray-800">
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
}
