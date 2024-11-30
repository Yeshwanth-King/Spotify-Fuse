"use client";

import { audioContext } from "@/app/components/AudioPlayer";
import BottomPlayer from "@/app/components/BottomPlayer";
import NavBar from "@/app/components/NavBar";
import Sidebar from "@/app/components/SideBar";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function AlbumaPage() {
  const [album, setAlbum] = useState(null);
  const params = useParams();
  const id = params.id;
  useEffect(() => {
    (async () => {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllAlbums`,
        { id }
      );
      setAlbum(response.data.album);
    })();
  }, []);

  return (
    <>
      <div className="bg-black min-h-screen">
        {/* Navigation Bar */}
        <NavBar />
        {/* Sidebar and Content */}
        <div className="flex">
          <div className="lg:w-[25%]">
            <Sidebar />
          </div>
          <div className="lg:w-[75%] w-full text-white px-4">
            <div className="w-full rounded-2xl overflow-hidden min-h-[89vh]">
              <ScrollArea className="h-full">
                <div className="relative min-h-[87vh]">
                  <div
                    className="absolute inset-0 bg-gradient-to-b from-[#5038a0]/80 via-zinc-900/80 to-zinc-900 pointer-events-none"
                    aria-hidden="true"
                  />
                  <div className="relative z-10">
                    <div className="flex p-6 pb-8 gap-6">
                      <div className="w-[240px] h-[240px] shadow-xl rounded overflow-hidden">
                        <img
                          src={album?.imageUrl}
                          alt={album?.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col justify-end">
                        <p className="text-sm font-medium">Album</p>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </div>
          </div>
          <BottomPlayer />
        </div>
      </div>
    </>
  );
}
