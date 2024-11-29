"use client";
import { useContext, useState } from "react";
import { audioContext } from "./AudioPlayer";
import CurrentSong from "./CurrentSong";
import SongControls from "./SongControls";
import SmallSong from "./SmallSong";
import SongModal from "./SongModal";

export default function BottomPlayer() {
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
