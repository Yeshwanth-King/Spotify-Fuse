"use client";
import { useContext, useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import Sidebar from "./components/SideBar";
import axios from "axios";
import CurrentSong from "./components/CurrentSong";
import SongControls from "./components/SongControls";
import MainContent from "./components/MainContent";
import { FastAverageColor } from "fast-average-color";
import SmallSong from "./components/SmallSong";
import SongModal from "./components/SongModal";
import { audioContext } from "./components/AudioPlayer";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state

  const { songs, albums, currentSongIndex, onNext, onPrev, background } =
    useContext(audioContext);

  const openModal = () => {
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <>
      <div className="bg-black min-h-screen relative">
        {/* Navigation Bar */}
        <NavBar />
        {/* Sidebar and Content */}
        <div className="flex">
          <div className="lg:w-[25%]">
            <Sidebar />
          </div>
          <div className="lg:w-[75%] w-full text-white px-4">
            <div className=" bg-[#121212] p-4 w-full rounded-2xl gap-2 min-h-[89vh]">
              <MainContent songs={songs} albums={albums} />
            </div>
          </div>
        </div>
        <div className="bg-black absolute bottom-0 z-50 p-2 w-full flex justify-between items-center max-sm:hidden">
          <div className="w-[33%]">
            <CurrentSong song={songs[currentSongIndex]} />
          </div>
          <div className="w-[67%]">
            <SongControls
              song={songs[currentSongIndex]}
              onNext={onNext}
              onPrev={onPrev}
              vol={true}
            />
          </div>
        </div>
        <div className="absolute bottom-0 z-50 p-2 block w-full bg-transparent sm:hidden">
          <div
            className={"flex items-center rounded-lg "}
            style={{ backgroundColor: background }}
          >
            {songs.length > 0 && (
              <SmallSong song={songs[currentSongIndex]} openModal={openModal} />
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <SongModal
          background={background}
          song={songs[currentSongIndex]}
          closeModal={closeModal}
          onNext={onNext}
          onPrev={onPrev}
        />
      )}
    </>
  );
}
