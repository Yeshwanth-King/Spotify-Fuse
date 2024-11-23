"use client";
import { useEffect, useState, useRef } from "react";
import {
  MdPause,
  MdPlayArrow,
  MdSkipNext,
  MdSkipPrevious,
} from "react-icons/md";

export default function SongControls({ song }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(247); // 4:07 in seconds
  const [progress, setProgress] = useState(0);

  // Create a ref for the audio object
  const audioRef = useRef(null);
  useEffect(() => {
    const audio = (audioRef.current = new Audio(song?.song));
    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [song, isPlaying]);

  const togglePlay = async () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="bg-[#121212] p-4 rounded-lg">
      {/* Controls */}
      <div className="flex items-center justify-center gap-3 mb-4">
        <button className="text-white text-2xl hover:text-gray-400">
          <MdSkipPrevious />
        </button>
        <button
          onClick={() => {
            togglePlay();
          }}
          className="text-2xl bg-white rounded-full p-1 hover:bg-[#1a6d37]"
        >
          {isPlaying ? <MdPause /> : <MdPlayArrow />}
        </button>
        <button className="text-white text-2xl hover:text-gray-400">
          <MdSkipNext />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="flex items-center justify-between">
        <span className="text-gray-400 text-sm">0:00</span>
        <div></div>
        <span className="text-gray-400 text-sm">0:00</span>
      </div>
    </div>
  );
}
