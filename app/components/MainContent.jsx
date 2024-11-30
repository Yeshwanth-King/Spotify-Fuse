"use client";
import Link from "next/link";
import { FaPlay } from "react-icons/fa";
import { audioContext } from "./AudioPlayer";
import { Skeleton } from "@/components/ui/skeleton";
import { useContext } from "react";

export default function MainContent() {
  const { songs, albums, loading } = useContext(audioContext);
  const dummy = [1, 2, 3, 4];

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 mb-8">
        {loading
          ? // Skeleton Loader when data is loading
            Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center mb-8 bg-zinc-800/50 rounded-md overflow-hidden animate-pulse"
              >
                <div className="w-16 sm:w-20 h-16 sm:h-20 bg-zinc-700 flex-shrink-0" />
                <div className="flex-1 p-4">
                  <div className="h-4 bg-zinc-700 rounded w-3/4 mb-2" />
                </div>
              </div>
            ))
          : // Render Albums when data is available
            albums?.map((album) => (
              <Link
                key={album._id}
                href={"/album/" + album._id}
                className="bg-[#333333] overflow-hidden rounded-lg flex gap-2 relative group cursor-pointer hover:scale-105 transition-all duration-300"
              >
                <div className="w-24 h-24 max-sm:w-16 max-sm:h-16">
                  <img
                    src={album.imageUrl}
                    className="object-cover w-full h-full"
                    alt={album.title}
                  />
                </div>
                <div className=" flex flex-col justify-center">
                  <p className="font-bold  max-sm:text-sm text-white">
                    {album.title}
                  </p>
                  <p className="max-sm:text-xs">{album.artist}</p>
                </div>
                <div className="absolute bg-green-400 text-black rounded-full p-2 right-1 top-1/2 opacity-0 scale-75 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:scale-90">
                  <FaPlay />
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
}
