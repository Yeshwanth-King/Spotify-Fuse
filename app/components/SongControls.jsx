"use client";
import { min } from "date-fns";
import { useEffect, useState, useRef } from "react";
import { GoDotFill } from "react-icons/go";
import {
  MdPause,
  MdPlayArrow,
  MdSkipNext,
  MdSkipPrevious,
} from "react-icons/md";

export default function SongControls({ song, onNext, onPrev }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);
  const progressBarRef = useRef(null);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" + secs : secs}`;
  };

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(song?.song);
    } else {
      audioRef.current.src = song?.song; // Update the audio source for the new song
    }
    audioRef.current = new Audio(song?.song);

    audioRef.current.onloadedmetadata = () => {
      setDuration(audioRef.current.duration);
      setProgress(
        (audioRef.current.currentTime / audioRef.current.duration) * 100
      );
    };

    audioRef.current.ontimeupdate = () => {
      setCurrentTime(audioRef.current.currentTime);
      const updatedProgress =
        (audioRef.current.currentTime / audioRef.current.duration) * 100;

      setProgress(updatedProgress);
    };

    if (isPlaying) {
      audioRef.current.play(); // Auto-play the new song
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [song]);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handlePrev = () => {
    const audio = audioRef.current;
    audio.currentTime = 0;
    setCurrentTime(0);
    setIsPlaying(true);
    onPrev();
  };

  const handleNext = () => {
    const audio = audioRef.current;
    audio.currentTime = 0;
    setCurrentTime(duration);
    setIsPlaying(true);
    onNext();
  };

  const handleProgressClick = (e) => {
    if (audioRef.current && progressBarRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const newProgress = (clickX / rect.width) * 100;
      const newTime = (newProgress / 100) * duration;

      setProgress(newProgress);
      setCurrentTime(newTime);
      audioRef.current.currentTime = newTime;
    }
  };
  return (
    <div className=" p-2 rounded-lg">
      {/* Controls */}
      <div className="flex items-center justify-center gap-3 mb-4">
        <button
          onClick={handlePrev}
          className="text-white text-2xl hover:text-gray-400"
        >
          <MdSkipPrevious />
        </button>
        <button
          onClick={handlePlayPause}
          className="text-2xl bg-white rounded-full p-1 hover:bg-[#1a6d37]"
        >
          {isPlaying ? <MdPause /> : <MdPlayArrow />}
        </button>
        <button
          onClick={handleNext}
          className="text-white text-2xl hover:text-gray-400"
        >
          <MdSkipNext />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="flex items-center justify-between">
        <span className="text-gray-400 text-sm">{formatTime(currentTime)}</span>
        <div
          className="bg-[#4d4d4d] w-full p-[2px] relative mx-2 rounded-full  cursor-pointer"
          onClick={handleProgressClick}
          ref={progressBarRef}
        >
          {/* Progress indicator */}
          <div
            className={"bg-white h-full rounded-full p-[2px]"}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <span className="text-gray-400 text-sm">{formatTime(duration)}</span>
      </div>
    </div>
  );
}
