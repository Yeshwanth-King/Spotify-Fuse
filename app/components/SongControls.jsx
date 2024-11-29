"use client";
import { useContext } from "react";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import {
  MdPause,
  MdPlayArrow,
  MdSkipNext,
  MdSkipPrevious,
} from "react-icons/md";
import { audioContext } from "./AudioPlayer";

export default function SongControls({ vol }) {
  const {
    formatTime,
    currentTime,
    isPlaying,
    progressBarRef,
    progress,
    duration,
    muted,
    volProgressBarRef,
    volume,
    toggleMute,
    handleDragEnd,
    handleDragMove,
    handleDragStart,
    handleNext,
    handlePlayPause,
    handlePrev,
    handleProgressClick,
  } = useContext(audioContext);

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
