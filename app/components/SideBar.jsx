// components/Sidebar.js
import Link from "next/link";
import { FaHeart } from "react-icons/fa";
import { GoSidebarCollapse, GoPlus, GoArrowRight } from "react-icons/go";
import { GiPin } from "react-icons/gi";
import { TfiMenuAlt } from "react-icons/tfi";

export default function Sidebar() {
  return (
    <div className="bg-[#121212] text-white w-[25%] min-h-[89vh] rounded-2xl ml-3 p-1 flex flex-col">
      {/* Spotify Logo */}
      {/* Your Library Header */}
      <div className="mb-4 px-6 pt-6">
        <div className=" flex justify-between px-2 text-[#b3b3b3]">
          <div className="flex gap-2">
            <GoSidebarCollapse className="text-3xl" />
            <span className="text-lg font-bold">Your Library</span>
          </div>
          <div className="flex text-3xl gap-2">
            <GoPlus />
            <GoArrowRight />
          </div>
        </div>
        <div className="flex space-x-2 mt-2">
          <button className="bg-[#2a2a2a] font-semibold text-sm px-3 py-1 rounded-full">
            Playlists
          </button>
          <button className="bg-[#2a2a2a] font-semibold text-sm px-3 py-1 rounded-full">
            Artists
          </button>
          <button className="bg-[#2a2a2a] font-semibold text-sm px-3 py-1 rounded-full">
            Albums
          </button>
        </div>
      </div>
      {/* Search
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search"
          className="bg-gray-900 text-sm text-white w-full py-2 px-4 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div> */}
      {/* Recents and Playlists */}
      <div className="flex-grow overflow-y-auto  scrollbar-thin scrollbar-thumb-[#2a2a2a] font-semibold scrollbar-track-black">
        <div className="flex justify-end items-center mb-4 px-6">
          <div className="flex justify-center items-center gap-1 text-lg text-[#b3b3b3]">
            <span className="text-base mb-1">Recents</span>
            <span>
              <TfiMenuAlt />
            </span>
          </div>
        </div>

        {/* Playlists */}
        <ul className="space-y-4">
          <li className="flex items-center space-x-3 hover:bg-[#1f1f1f] p-2 cursor-pointer">
            <div className="w-[4vw] overflow-hidden rounded-md">
              <img
                src="./images/heart.png"
                alt=""
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <p className="text-base font-medium">Liked Songs</p>
              <div className="text-sm flex  text-gray-400">
                <div className="flex gap-1 items-center">
                  <span className="text-[#1bc558]">
                    <GiPin />
                  </span>
                  Playlist
                </div>
                <div>
                  <span className="ml-1">•</span> 362 songs
                </div>
              </div>
            </div>
          </li>
          <li className="flex items-center space-x-3 hover:bg-[#1f1f1f] p-2 cursor-pointer">
            <div className="w-[4vw] overflow-hidden rounded-md">
              <img
                src="./images/onrepeat.png"
                alt=""
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <p className="text-base font-medium">On Repeat</p>
              <div className="flex text-sm text-gray-400">
                <div className="flex gap-1 items-center">
                  <span className="text-[#1bc558]">
                    <GiPin />
                  </span>
                  Playlist
                </div>
                <div>
                  <span className="ml-1">•</span> Spotify
                </div>
              </div>
            </div>
          </li>
          {/* Add more playlist items here */}
        </ul>
      </div>
    </div>
  );
}
