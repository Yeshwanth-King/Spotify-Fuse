"use client";
import NavBar from "./components/NavBar";
import Sidebar from "./components/SideBar";
import MainContent from "./components/MainContent";
import { useContext } from "react";
import { audioContext } from "./components/AudioPlayer";
import BottomPlayer from "./components/BottomPlayer";

export default function Home() {
  const { songs, albums } = useContext(audioContext);
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
          <BottomPlayer />
        </div>
      </div>
    </>
  );
}
