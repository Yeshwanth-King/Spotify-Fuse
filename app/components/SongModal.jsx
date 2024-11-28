import React from "react";
import SongControls from "./SongControls";
import { FaAngleDown } from "react-icons/fa";
import { BiDotsHorizontalRounded } from "react-icons/bi";

const SongModal = ({ song, closeModal, background, onNext, onPrev }) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={closeModal}
    >
      <div
        className={
          "bg-[#1f1f1f] p-6  w-full h-screen max-w-md text-center flex flex-col justify-between " +
          `bg-[${background}]`
        }
        onClick={(e) => e.stopPropagation()} // Prevent modal closing when clicking inside
      >
        <div className="flex justify-between items-center text-white">
          <FaAngleDown
            onClick={closeModal}
            className="text-2xl mb-2 text-white"
          />
          <h2 className=" text-lg mb-4">{song?.title}</h2>
          <BiDotsHorizontalRounded className="text-2xl mb-2 text-white" />
        </div>
        <img
          src={song?.imageUrl}
          alt={song?.title}
          className="w-full rounded-xl mb-4"
        />
        <div className="flex flex-col mb-5">
          <div className="flex flex-col items-start gap-1">
            <span className="text-white text-xl font-semibold">
              {song?.title}
            </span>
            <p className="text-gray-400 font-medium mb-4">{song?.artist}</p>
          </div>
          <SongControls
            onNext={onNext}
            song={song}
            vol={false}
            onPrev={onPrev}
          />
        </div>
      </div>
    </div>
  );
};

export default SongModal;
