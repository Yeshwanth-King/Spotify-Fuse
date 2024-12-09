"use client";
import React, { useContext } from "react";
import SectionGridSkeleton from "./SectionGridSkeleton";
import { Button } from "@/components/ui/button";
import { audioContext } from "./AudioPlayer";
import { Pause, Play } from "lucide-react";

const SectionGrid = ({ title, isLoading }) => {
  const { madeForYou, handlePlay, isPlaying, trendingSongs, getFeaturedSongs } =
    useContext(audioContext);
  if (isLoading) {
    return <SectionGridSkeleton />;
  }
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl sm:text-2xl font-bold">{title}</h1>
        <Button
          variant="link"
          className="text-sm text-zinc-400 hover:text-white "
        >
          Show all
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {title === "Made for you" &&
          madeForYou.length > 0 &&
          madeForYou.map((song) => (
            <div
              key={song._id}
              className="bg-zinc-800/40 p-4 rounded-md hover:bg-zinc-700/40 transition-all group cursor-pointer"
            >
              <div className="relative mb-4">
                <div className="aspect-square rounded-md shadow-lg overflow-hidden">
                  <img
                    src={song.imageUrl}
                    alt={song.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </div>
              <h3 className="font-medium mb-2 truncate">{song.title}</h3>
              <p className="text-sm text-zinc-400 truncate">{song.artist}</p>
            </div>
          ))}
        {title === "Trending Songs" &&
          getFeaturedSongs.length > 0 &&
          getFeaturedSongs.map((song) => (
            <div
              key={song._id}
              className="bg-zinc-800/40 p-4 rounded-md hover:bg-zinc-700/40 transition-all group cursor-pointer"
            >
              <div className="relative mb-4">
                <div className="aspect-square rounded-md shadow-lg overflow-hidden">
                  <img
                    src={song.imageUrl}
                    alt={song.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </div>
              <h3 className="font-medium mb-2 truncate">{song.title}</h3>
              <p className="text-sm text-zinc-400 truncate">{song.artist}</p>
            </div>
          ))}
        {title === "Featured Songs" &&
          trendingSongs.length > 0 &&
          trendingSongs.map((song) => (
            <div
              key={song._id}
              className="bg-zinc-800/40 p-4 rounded-md hover:bg-zinc-700/40 transition-all group cursor-pointer"
            >
              <div className="relative mb-4">
                <div className="aspect-square rounded-md shadow-lg overflow-hidden">
                  <img
                    src={song.imageUrl}
                    alt={song.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </div>
              <h3 className="font-medium mb-2 truncate">{song.title}</h3>
              <p className="text-sm text-zinc-400 truncate">{song.artist}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SectionGrid;
