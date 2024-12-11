"use client";
import React, { useContext, useState } from "react";
import SectionGridSkeleton from "./SectionGridSkeleton";
import { Button } from "@/components/ui/button";
import { audioContext } from "./AudioPlayer";
import { Pause, Play } from "lucide-react";
import SongGroup from "./SongGroup";

const SectionGrid = ({ title, isLoading }) => {
  const {
    madeForYou,
    handlePlay,
    isPlaying,
    setSongs,
    trendingSongs,
    getFeaturedSongs,
    setCurrentSongIndex,
  } = useContext(audioContext);
  const [madefy, setMadefy] = useState(madeForYou);
  const [trend, setTrend] = useState(trendingSongs);
  const [feat, setFeat] = useState(getFeaturedSongs);
  if (isLoading) {
    return <SectionGridSkeleton />;
  }
  const handleSongClick = (songsGroup, index) => {
    setSongs(songsGroup); // Set the entire group as the current songs list
    setCurrentSongIndex(index); // Set the current song index
    handlePlay(); // Play the song
  };
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
        {/* Render the "Made for You" group */}
        {title === "Made for you" && madeForYou.length > 0 && (
          <SongGroup
            group="Made for you"
            songs={madeForYou}
            onSongClick={handleSongClick}
          />
        )}

        {/* Render the "Trending Songs" group */}
        {title === "Trending Songs" && getFeaturedSongs.length > 0 && (
          <SongGroup
            group="Trending Songs"
            songs={getFeaturedSongs}
            onSongClick={handleSongClick}
          />
        )}

        {/* Render the "Featured Songs" group */}
        {title === "Featured Songs" && trendingSongs.length > 0 && (
          <SongGroup
            group="Featured Songs"
            songs={trendingSongs}
            onSongClick={handleSongClick}
          />
        )}
      </div>
    </div>
  );
};

export default SectionGrid;
