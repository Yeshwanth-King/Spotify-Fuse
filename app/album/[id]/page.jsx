"use client";

import { audioContext } from "@/app/components/AudioPlayer";
import BottomPlayer from "@/app/components/BottomPlayer";
import NavBar from "@/app/components/NavBar";
import Sidebar from "@/app/components/SideBar";
import axios from "axios";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function AlbumaPage() {
  const { albums } = useContext(audioContext);
  const [album, setAlbum] = useState([]);
  const params = useParams();
  const id = params.id;
  useEffect(() => {
    console.log(albums.filter((item) => item._id === id));
    setAlbum(albums.filter((item) => item._id === id));
  }, [albums]);

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
              <img src={album[0]?.imageUrl} alt="photo" />
            </div>
          </div>
          <BottomPlayer />
        </div>
      </div>
    </>
  );
}
