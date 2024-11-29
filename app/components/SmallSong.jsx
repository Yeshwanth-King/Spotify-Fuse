"use client";
import { useContext, useEffect, useRef, useState } from "react";
import { MdPause, MdPlayArrow } from "react-icons/md";
import { audioContext } from "./AudioPlayer";

export default function SmallSong({ openModal }) {
  const { songs, currentSongIndex, handlePlayPause, isPlaying } =
    useContext(audioContext);
  return (
    <>
      <div
        onClick={() => {
          openModal(songs[currentSongIndex]);
        }}
        className="song flex gap-2 w-[70%] p-2 overflow-hidden relative"
      >
        <div className="w-10 h-10 overflow-hidden">
          <img
            className="object-cover w-full h-full"
            src={songs[currentSongIndex]?.imageUrl}
            alt="Song"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-white font-bold">
            {songs[currentSongIndex]?.title}
          </span>
          <span className="text-white text-sm">
            {songs[currentSongIndex]?.artist}
          </span>
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
