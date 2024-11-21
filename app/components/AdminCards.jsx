"use client";
import { BsMusicNoteList } from "react-icons/bs";
import { ImBooks } from "react-icons/im";
import { HiOutlinePaintBrush } from "react-icons/hi2";
import { FaUsers } from "react-icons/fa";
import { useEffect } from "react";
import axios from "axios";

export default function AdminCards() {
  useEffect(() => {
    (async () => {
      const response = await axios.get("/api/getAdminInfo");
      console.log(response.data);
    })();
  }, []);

  return (
    <>
      <div className="grid grid-cols-2 max-sm:grid-cols-1 xl:grid-cols-4 px-10 gap-4">
        <div className="flex items-center gap-3 w-64 p-4 bg-[#1e1e1e] rounded-lg shadow-md border border-[#282828]">
          {/* Icon */}
          <div className="flex items-center justify-center w-12 h-12 bg-[#1DB954]/20 rounded-md">
            <BsMusicNoteList className="text-[#1DB954]" />
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <span className="text-sm text-gray-400">Total Songs</span>
            <span className="text-2xl font-bold text-white">12</span>
          </div>
        </div>
        <div className="flex items-center gap-3 w-64 p-4 bg-[#1e1e1e] rounded-lg shadow-md border border-[#282828]">
          {/* Icon */}
          <div className="flex items-center justify-center w-12 h-12 bg-purple-500/20 rounded-md">
            <ImBooks className="text-purple-500" />
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <span className="text-sm text-gray-400">Total Songs</span>
            <span className="text-2xl font-bold text-white">12</span>
          </div>
        </div>
        <div className="flex items-center gap-3 w-64 p-4 bg-[#1e1e1e] rounded-lg shadow-md border border-[#282828]">
          {/* Icon */}
          <div className="flex items-center justify-center w-12 h-12 bg-orange-500/20 rounded-md">
            <HiOutlinePaintBrush className="text-orange-500" />
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <span className="text-sm text-gray-400">Total Songs</span>
            <span className="text-2xl font-bold text-white">12</span>
          </div>
        </div>
        <div className="flex items-center gap-3 w-64 p-4 bg-[#1e1e1e] rounded-lg shadow-md border border-[#282828]">
          {/* Icon */}
          <div className="flex items-center justify-center w-12 h-12 bg-blue-500/20 rounded-md">
            <FaUsers className="text-blue-500" />
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <span className="text-sm text-gray-400">Total Songs</span>
            <span className="text-2xl font-bold text-white">12</span>
          </div>
        </div>
      </div>
    </>
  );
}
