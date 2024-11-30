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
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {loading
          ? // Skeleton Loader when data is loading
            Array(4)
              .fill("")
              .map((_, index) => {
                return (
                  <div
                    key={index}
                    className="bg-[#333333] overflow-hidden rounded-lg flex flex-col gap-2 relative group cursor-pointer"
                  >
                    {/* Skeleton for Album Cover */}
                    <Skeleton className="w-full h-28 bg-gray-700 rounded-lg" />
                    {/* Skeleton for Album Title */}
                    <Skeleton className="w-full h-6 bg-gray-600 rounded-md" />
                    {/* Skeleton for Play Button */}
                    <div className="absolute bg-green-400 text-black rounded-full p-2 right-1 top-2 opacity-0 scale-75 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:scale-90">
                      <Skeleton className="w-6 h-6 rounded-full bg-gray-700" />
                    </div>
                  </div>
                );
              })
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
