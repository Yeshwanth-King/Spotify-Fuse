"use client";
import { useEffect, useState, useRef } from "react";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import {
  MdPause,
  MdPlayArrow,
  MdSkipNext,
  MdSkipPrevious,
} from "react-icons/md";

export default function SongControls({ song, onNext, onPrev, vol }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);
  const progressBarRef = useRef(null);
  const [volume, setVolume] = useState(1); // Initial volume (0 to 1)
  const [muted, setMuted] = useState(false); // Muted state
  const volProgressBarRef = useRef(null); // Ref for the progress bar container
  const isDragging = useRef(false);

  const finalVolume = muted ? 0 : volume ** 2;
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" + secs : secs}`;
  };

  useEffect(() => {
    if (!song?.song) return;

    if (!audioRef.current) {
      audioRef.current = new Audio(song.song);
    } else {
      audioRef.current.src = song.song; // Update the source
    }

    const audio = audioRef.current;

    audio.volume = finalVolume; // Set initial volume

    const handleMetadataLoaded = () => {
      setDuration(audio.duration);
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    // Attach event listeners
    audio.addEventListener("loadedmetadata", handleMetadataLoaded);
    audio.addEventListener("timeupdate", handleTimeUpdate);

    if (isPlaying) {
      audio.play();
    }

    return () => {
      // Cleanup listeners and pause audio
      audio.pause();
      audio.removeEventListener("loadedmetadata", handleMetadataLoaded);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [song, isPlaying, finalVolume]);

  const handlePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handlePrev = () => {
    if (!audioRef.current) return;

    if (audioRef.current.currentTime < 5) {
      onPrev();
    } else {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
    }
    setIsPlaying(true);
  };

  const handleNext = () => {
    if (!audioRef.current) return;

    onNext();
    audioRef.current.currentTime = 0;
    setCurrentTime(0);
    setIsPlaying(true);
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

  // Update volume based on position
  const updateVolume = (clientX) => {
    if (volProgressBarRef.current) {
      const rect = volProgressBarRef.current.getBoundingClientRect();
      const newVolume = Math.min(
        Math.max((clientX - rect.left) / rect.width, 0),
        1
      );
      setVolume(newVolume);
    }
  };

  // Handle mouse or touch events
  const handleDragStart = (event) => {
    isDragging.current = true;
    const clientX = event.clientX || event.touches[0].clientX;
    updateVolume(clientX);
  };

  const handleDragMove = (event) => {
    if (isDragging.current) {
      const clientX = event.clientX || event.touches[0].clientX;
      updateVolume(clientX);
    }
  };

  const handleDragEnd = () => {
    isDragging.current = false;
  };

  // Toggle mute state
  const toggleMute = () => setMuted((prevMuted) => !prevMuted);

  // Effect to update the audio element's volume
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = muted ? 0 : finalVolume;
    }
  }, [finalVolume, muted]);

  return (
    <div className=" p-2 rounded-lg flex">
      <div className={vol ? "w-1/2" : "w-full"}>
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
            className="text-2xl bg-white rounded-full p-1 hover:bg-[#208644]"
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
          <span className="text-gray-400 text-sm">
            {formatTime(currentTime)}
          </span>
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
      {vol && (
        <div className="w-1/2 flex">
          <div className="flex items-center gap-3 w-11/12">
            {muted ? (
              <FaVolumeMute
                onClick={toggleMute}
                className="text-xl cursor-pointer text-gray-500 hover:text-white transition-all duration-200"
              />
            ) : (
              <FaVolumeUp
                onClick={toggleMute}
                className="text-xl cursor-pointer text-gray-500 hover:text-white transition-all duration-200"
              />
            )}
            <div
              className="bg-[#4d4d4d] w-full p-[2px] relative mx-2 rounded-full cursor-pointer group"
              ref={volProgressBarRef}
              onMouseDown={handleDragStart}
              onTouchStart={handleDragStart}
              onMouseMove={handleDragMove}
              onTouchMove={handleDragMove}
              onMouseUp={handleDragEnd}
              onMouseLeave={handleDragEnd}
              onTouchEnd={handleDragEnd}
            >
              {/* Progress indicator */}
              <div
                className="bg-white h-full rounded-full p-[2px] group-hover:bg-green-500 "
                style={{ width: `${muted ? 0 : volume * 100 + 1}%` }}
              >
                {/* Draggable Dot */}
                <div
                  className="absolute top-1 hidden group-hover:block transform translate-y-[-50%] bg-white  p-2 rounded-full cursor-pointer"
                  style={{ left: `${muted ? 0 : volume * 100}%` }}
                  onMouseDown={handleDragStart}
                  onTouchStart={handleDragStart}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
