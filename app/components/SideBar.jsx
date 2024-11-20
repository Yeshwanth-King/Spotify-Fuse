// components/Sidebar.js
import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="bg-[#121212] text-white w-[25%] min-h-[80vh] rounded-2xl p-4 flex flex-col">
      {/* Spotify Logo */}
      <div className="mb-6">
        <div className="text-center text-xl font-bold">Spotify</div>
      </div>

      {/* Your Library Header */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Your Library</h2>
        <div className="flex space-x-2 mt-2">
          <button className="bg-gray-800 text-sm px-3 py-1 rounded-full">
            Playlists
          </button>
          <button className="bg-gray-800 text-sm px-3 py-1 rounded-full">
            Artists
          </button>
          <button className="bg-gray-800 text-sm px-3 py-1 rounded-full">
            Albums
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search"
          className="bg-gray-900 text-sm text-white w-full py-2 px-4 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Recents and Playlists */}
      <div className="flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-black">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm">Recents</h3>
          <button className="text-sm text-gray-400 hover:text-white">
            <i className="fas fa-list"></i>
          </button>
        </div>

        {/* Playlists */}
        <ul className="space-y-4">
          <li className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-600 flex items-center justify-center rounded-lg">
              <i className="fas fa-heart"></i>
            </div>
            <div>
              <p className="text-sm font-medium">Liked Songs</p>
              <p className="text-xs text-gray-400">Playlist • 362 songs</p>
            </div>
          </li>
          <li className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-600 flex items-center justify-center rounded-lg">
              <i className="fas fa-redo"></i>
            </div>
            <div>
              <p className="text-sm font-medium">On Repeat</p>
              <p className="text-xs text-gray-400">Playlist • Spotify</p>
            </div>
          </li>
          {/* Add more playlist items here */}
        </ul>
      </div>
    </div>
  );
}
