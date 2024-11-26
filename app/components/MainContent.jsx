"use client";
import Link from "next/link";
import { FaPlay } from "react-icons/fa";

export default function MainContent({ songs, albums }) {
  return (
    <>
      <div>
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-4 ">
          {albums?.length > 0 && (
            <>
              {albums?.map((album) => (
                <Link
                  key={album._id}
                  href={"/album/" + album._id}
                  className="bg-[#333333] overflow-hidden rounded-lg flex gap-2 relative group cursor-pointer hover:scale-105 transition-all duration-300"
                >
                  <div className="w-12 h-12">
                    <img
                      src={album.imageUrl}
                      className="object-cover w-full h-full"
                      alt=""
                    />
                  </div>
                  <div className="font-bold text-white flex items-center">
                    {album.title}
                  </div>
                  <div className="absolute bg-green-400 text-black rounded-full p-2 right-1 top-2 opacity-0 scale-75 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:scale-90">
                    <FaPlay />
                  </div>
                </Link>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}
