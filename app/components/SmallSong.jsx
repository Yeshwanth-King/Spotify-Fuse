"use client";
import { useEffect, useRef, useState } from "react";
import { MdPause, MdPlayArrow } from "react-icons/md";

export default function SmallSong({ song, openModal }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  useEffect(() => {
    if (!song.song) return;

    if (!audioRef.current) {
      audioRef.current = new Audio(song.song);
    } else {
      audioRef.current.src = song.song;
    }
  }, [song]);

  const handlePlayPause = () => {
    if (!audioRef.current) return;

    const audio = audioRef.current;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };
  return (
    <>
      <div
        onClick={() => {
          openModal(song);
        }}
        className="song flex gap-2 w-[70%] p-2 overflow-hidden relative"
      >
        <div className="w-10 h-10 overflow-hidden">
          <img
            className="object-cover w-full h-full"
            src={song?.imageUrl}
            alt="Song"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-white font-bold">{song?.title}</span>
          <span className="text-white text-sm">{song?.artist}</span>
        </div>
      </div>
      <div className="w-[30%] flex justify-end px-2">
        <button onClick={handlePlayPause} className="text-4xl text-white ">
          {isPlaying ? <MdPause /> : <MdPlayArrow />}
        </button>
      </div>
    </>
  );
}
