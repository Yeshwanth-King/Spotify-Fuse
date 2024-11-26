"use client";
import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import Sidebar from "./components/SideBar";
import axios from "axios";
import CurrentSong from "./components/CurrentSong";
import SongControls from "./components/SongControls";
import MainContent from "./components/MainContent";

export default function Home() {
  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  const handleNextSong = () => {
    setCurrentSongIndex(
      (prevIndex) => (prevIndex < songs.length - 1 ? prevIndex + 1 : 0) // Loop back to the first song
    );
  };

  const handlePrevSong = () => {
    setCurrentSongIndex(
      (prevIndex) => (prevIndex > 0 ? prevIndex - 1 : songs.length - 1) // Loop back to the last song
    );
  };
  useEffect(() => {
    (async () => {
      const response = await axios.get("/api/getAllSongs");
      setSongs(response.data.songs);
      const response2 = await axios.get("/api/getAllAlbums");
      setAlbums(response2.data.albums);
    })();
  }, []);

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
        <div className="bg-black absolute bottom-0 z-50 p-2 w-full flex justify-between items-center ">
          <div className="w-[33%]">
            <CurrentSong song={songs[currentSongIndex]} />
          </div>
          <div className="w-[34%]">
            <SongControls
              song={songs[currentSongIndex]}
              onNext={handleNextSong}
              onPrev={handlePrevSong}
            />
          </div>
          <div className="w-[33%]"></div>
        </div>
      </div>
    </>
  );
}
