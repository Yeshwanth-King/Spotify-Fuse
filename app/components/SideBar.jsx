"use client";
import { useContext, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { GoSidebarCollapse, GoPlus, GoArrowRight } from "react-icons/go";
import { GiPin } from "react-icons/gi";
import { TfiMenuAlt } from "react-icons/tfi";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { audioContext } from "./AudioPlayer";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { albums } = useContext(audioContext);

  return (
    <div className="relative ">
      {/* Hamburger Menu for Mobile */}
      <div className="lg:hidden absolute z-50 -top-[70px] flex items-center p-4">
        <button
          className="text-black text-2xl bg-white p-2 rounded-md hover:bg-gray-300"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open Navigation Menu"
        >
          <TfiMenuAlt />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`bg-[#121212] text-white w-[75%] sm:w-[50%] lg:w-[100%] h-screen lg:h-[89vh] rounded-2xl p-1 flex flex-col fixed z-50 top-0 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:relative lg:translate-x-0`}
      >
        {/* Header */}
        <div className="mb-4 px-6 pt-6">
          <div className="flex justify-between px-2 text-[#b3b3b3]">
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
            <Button variant="secondary" className="bg-[#2a2a2a] text-sm">
              Playlists
            </Button>
            <Button variant="secondary" className="bg-[#2a2a2a] text-sm">
              Artists
            </Button>
            <Button variant="secondary" className="bg-[#2a2a2a] text-sm">
              Albums
            </Button>
          </div>
        </div>

        {/* Scrollable Content */}
        <ScrollArea className="flex-grow max-h-full overflow-y-auto scrollbar-thin scrollbar-thumb-[#2a2a2a] font-semibold scrollbar-track-black">
          {/* Recents */}
          <div className="flex justify-end items-center mb-4 px-6">
            <div className="flex justify-center items-center gap-1 text-lg text-[#b3b3b3]">
              <span className="text-base mb-1">Recents</span>
              <TfiMenuAlt />
            </div>
          </div>

          {/* Playlists */}
          <ul className="space-y-4 px-4">
            {albums.length > 0 &&
              albums.map((album) => {
                return (
                  <li
                    key={album._id}
                    className="flex items-center space-x-3 hover:bg-[#1f1f1f] p-2 cursor-pointer rounded-md"
                  >
                    <div className="w-[20%] overflow-hidden rounded-md">
                      <img
                        src={album.imageUrl}
                        alt="Liked Songs"
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <p className="text-base font-medium">{album.title}</p>
                      <div className="text-sm flex text-gray-400">
                        <div className="flex gap-1 items-center">Album</div>
                        <div>
                          <span className="ml-1">•</span> {album.songs.length}
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
          </ul>
        </ScrollArea>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
}
