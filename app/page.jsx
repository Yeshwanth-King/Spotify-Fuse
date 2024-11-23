"use client";
import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import Sidebar from "./components/SideBar";
import axios from "axios";
import CurrentSong from "./components/CurrentSong";
import SongControls from "./components/SongControls";

export default function Home() {
  const [songs, setSongs] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await axios.get("/api/getAllSongs");
      setSongs(response.data.songs);
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
            <div className=" bg-[#121212] p-4 w-full rounded-2xl flex flex-col items-center gap-2 min-h-[89vh]">
              Main Content
            </div>
          </div>
        </div>
        <div className="bg-black absolute bottom-0 z-50 p-2 w-full flex justify-between items-center ">
          <div className="w-[33%]">
            <CurrentSong song={songs[4]} />
          </div>
          <div className="w-[34%]">
            <SongControls song={songs[4]} />
          </div>
          <div className="w-[33%]"></div>
        </div>
      </div>
    </>
  );
}
