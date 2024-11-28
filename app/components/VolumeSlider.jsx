import React, { useEffect, useRef, useState } from "react";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";

export default function VolumeSlider({ song }) {
  const [volume, setVolume] = useState(1); // Initial volume (0 to 1)
  const [muted, setMuted] = useState(false); // Muted state
  const volProgressBarRef = useRef(null); // Ref for the progress bar container
  const isDragging = useRef(false); // Track dragging state
  const audioRef = useRef(new Audio());

  useEffect(() => {
    if (song?.song) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = ""; // Clear the previous source
      }
      audioRef.current = new Audio(song.song);
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = ""; // Clean up on unmount or song change
      }
    };
  }, [song]);

  // Calculate final volume (squared for a logarithmic curve)
  const finalVolume = muted ? 0 : volume ** 2;

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

  // Clean up audio when the component unmounts
  useEffect(() => {
    const audio = audioRef.current;
    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  return (
    <main className="text-white p-4 rounded-md w-full mx-auto">
      <section>
        <div className="flex items-center gap-3">
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
            className="bg-[#4d4d4d] w-full p-[2px] relative mx-2 rounded-full cursor-pointer"
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
              className="bg-white h-full rounded-full p-[2px]"
              style={{ width: `${muted ? 0 : volume * 100}%` }}
            ></div>
          </div>
        </div>
      </section>
    </main>
  );
}
