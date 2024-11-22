"use client";
import Image from "next/image";
import { LuMusic } from "react-icons/lu";
import AddSongForm from "../components/AddSongForm";
import AlbumPage from "../components/AlbumPage";
import NavBar from "../components/NavBar";
import AdminCards from "../components/AdminCards";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../components/UserContext";
import SongList from "../components/SongsList";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AlbumList from "../components/AlbumsList";

export default function Admin() {
  const { user, setUser } = useContext(UserContext);
  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [addSong, setAddSong] = useState(false);
  const [addAlbum, setAddAlbum] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await axios.get("/api/getAllSongs");
      const response2 = await axios.get("/api/getAllAlbums");
      setSongs(response.data.songs);
      setAlbums(response2.data.albums);
    })();
  }, []);

  return (
    <>
      <div className="bg-black min-h-screen relative">
        <NavBar />
        <div className="flex gap-1 ">
          <div className=" bg-gradient-to-b from-zinc-900 via-zinc-900 to-black p-4 w-full mx-2 rounded-2xl flex flex-col items-center gap-2 h-[89vh]">
            <div className="flex w-full">
              <div className="flex gap-2 items-center p-3">
                <div>
                  <Image
                    src={"/images/LOGO_Main.png"}
                    height={50}
                    width={50}
                    alt="logo"
                  />
                </div>
                <div>
                  <span className="text-white text-4xl font-bold">
                    Music Manager
                  </span>
                  <p className="text-gray-400 text-sm font-medium">
                    Manage Your Music Catalog
                  </p>
                </div>
              </div>
              <div className="sm:hidden"></div>
            </div>
            <AdminCards />
            <div className="w-full text-zinc-100 p-8">
              <Tabs defaultValue="songs" className="space-y-6">
                <TabsList className="p-1 bg-zinc-800/50">
                  <TabsTrigger
                    className="data-[state=active]:bg-zinc-700 flex gap-1 items-center text-white data-[state=active]:text-gray-200"
                    value="songs"
                  >
                    <LuMusic />
                    Songs
                  </TabsTrigger>
                  <TabsTrigger
                    className="data-[state=active]:bg-zinc-700 flex gap-1 items-center text-white data-[state=active]:text-gray-200"
                    value="albums"
                  >
                    Albums
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="songs">
                  <SongList songs={songs} setAddSong={setAddSong} />
                </TabsContent>
                <TabsContent value="albums">
                  <AlbumList albums={albums} setAddSong={setAddAlbum} />
                </TabsContent>
              </Tabs>
              {addSong && (
                <>
                  <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center">
                    <AddSongForm setAddSong={setAddSong} />
                  </div>
                </>
              )}
              {addAlbum && (
                <>
                  <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center">
                    <AlbumPage setAddSong={setAddAlbum} />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
