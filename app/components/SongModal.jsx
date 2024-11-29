"use client";
import React, { useContext } from "react";
import SongControls from "./SongControls";
import { FaAngleDown } from "react-icons/fa";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { audioContext } from "./AudioPlayer";

const SongModal = ({ closeModal, background }) => {
  const { songs, onPrev, onNext, currentSongIndex } = useContext(audioContext);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={closeModal}
    >
      <div
        className={
          "p-6  w-full h-screen max-w-md text-center flex flex-col justify-between "
        }
        style={{ backgroundColor: background }}
        onClick={(e) => e.stopPropagation()} // Prevent modal closing when clicking inside
      >
        <div className="flex justify-between items-center text-white">
          <FaAngleDown
            onClick={closeModal}
            className="text-2xl mb-2 text-white"
          />
          <h2 className=" text-lg mb-4">{songs[currentSongIndex]?.title}</h2>
          <BiDotsHorizontalRounded className="text-2xl mb-2 text-white" />
        </div>
        <img
          src={songs[currentSongIndex]?.imageUrl}
          alt={songs[currentSongIndex]?.title}
          className="w-full rounded-xl mb-4"
        />
        <div className="flex flex-col mb-5">
          <div className="flex flex-col items-start gap-1">
            <span className="text-white text-xl font-semibold">
              {songs[currentSongIndex]?.title}
            </span>
            <p className="text-gray-400 font-medium mb-4">
              {songs[currentSongIndex]?.artist}
            </p>
          </div>
          <SongControls
            onNext={onNext}
            song={songs[currentSongIndex]}
            vol={false}
            onPrev={onPrev}
          />
        </div>
      </div>
    </div>
  );
};

export default SongModal;
