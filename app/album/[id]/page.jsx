"use client";

import { audioContext } from "@/app/components/AudioPlayer";
import BottomPlayer from "@/app/components/BottomPlayer";
import NavBar from "@/app/components/NavBar";
import Sidebar from "@/app/components/SideBar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";
import { Clock, Pause, Play } from "lucide-react";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function AlbumaPage() {
  const [album, setAlbum] = useState(null);
  const [albumSongs, setAlbumSongs] = useState([]);
  const [durations, setDurations] = useState([]);
  const {
    songs,
    setSongs,
    isPlaying,
    handlePlayPause,
    handlePlay,
    setIsPlaying,
    setCurrentSongIndex,
  } = useContext(audioContext);
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    (async () => {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllAlbums`,
        { id }
      );
      setAlbum(response.data.album);
      setAlbumSongs(response.data.album.songs);
    })();
  }, []);

  useEffect(() => {
    setSongs(albumSongs);
  }, [isPlaying]);

  useEffect(() => {
    const fetchDurations = async () => {
      if (!album?.songs) return;

      const fetchedDurations = await Promise.all(
        album.songs.map((song) => {
          return new Promise((resolve) => {
            const audio = new Audio(song?.song);
            audio.addEventListener("loadedmetadata", () => {
              resolve(audio.duration);
            });
            audio.addEventListener("error", () => resolve(0));
          });
        })
      );
      setDurations(fetchedDurations);
    };

    fetchDurations();
  }, [album]);

  const handlePlaySong = (index) => {
    setCurrentSongIndex(index);
    handlePlay();
  };

  return (
    <div className="bg-black min-h-screen">
      <ScrollArea className="h-[calc(100vh-100px)]">
        {/* Navigation Bar */}
        <NavBar />
        {/* Sidebar and Content */}
        <div className="flex">
          <div className="lg:w-[25%]">
            <Sidebar />
          </div>
          <div className="lg:w-[75%] w-full text-white px-4">
            <div className="w-full rounded-2xl overflow-hidden min-h-[89vh] bg-gradient-to-b from-[#5038a0]/80 via-zinc-900/80 to-zinc-900">
              <ScrollArea className="h-full">
                <div className="flex flex-col gap-6 p-6">
                  {/* Album Details */}
                  <div className="flex max-sm:flex-col max-sm:items-center gap-6">
                    <div className="w-[240px] h-[240px] shadow-xl rounded overflow-hidden">
                      <img
                        src={album?.imageUrl}
                        alt={album?.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <p className="text-sm font-medium">Album</p>
                      <h2 className="text-7xl font-bold my-4">
                        {album?.title}
                      </h2>
                      <div className="flex items-center gap-2 text-zinc-100 text-sm">
                        <span className="font-medium text-white">
                          {album?.artist}
                        </span>
                        <span>• {album?.songs.length} Songs</span>
                        <span>• {album?.createdAt.split("T")[0]}</span>
                      </div>
                    </div>
                  </div>

                  {/* Play Button */}
                  <div className="flex items-center gap-6">
                    <Button
                      onClick={handlePlayPause}
                      size="icon"
                      className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-400 hover:scale-105 transition-all"
                    >
                      {isPlaying ? (
                        <Pause className="h-7 w-7 text-black" />
                      ) : (
                        <Play className="h-9 w-9 text-black" />
                      )}
                    </Button>
                  </div>

                  {/* Song List Table */}
                  <div className="bg-black/20 backdrop-blur-sm">
                    <div className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-10 py-2 text-sm text-zinc-400 border-b border-white/5">
                      <div>#</div>
                      <div>Title</div>
                      <div>Relased Date</div>
                      <div>
                        <Clock className="h-4 w-4" />
                      </div>
                    </div>
                    <div className="px-6">
                      <div className="space-y-2 py-4">
                        {album?.songs.map((song, index) => {
                          return (
                            <div
                              key={song._id}
                              onClick={(ev) => {
                                ev.preventDefault();
                                handlePlaySong(index);
                              }}
                              className={`grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-4 py-2 text-sm text-zinc-400 hover:bg-white/5 rounded-md group cursor-pointer`}
                            >
                              <div className="flex items-center justify-center">
                                <span className="group-hover:hidden">
                                  {index + 1}
                                </span>
                                <Play className="hidden group-hover:block h-4 w-4" />
                              </div>
                              <div className="flex items-center gap-3">
                                <img
                                  src={song.imageUrl}
                                  alt={song.title}
                                  className="size-10"
                                />
                                <div>
                                  <div className="font-medium text-white">
                                    {song.title}
                                  </div>
                                  <div>{song.artist}</div>
                                </div>
                              </div>
                              <div className="flex items-center">
                                {song.createdAt.split("T")[0]}
                              </div>
                              <div className="flex items-center">
                                {durations[index]
                                  ? `${Math.floor(
                                      durations[index] / 60
                                    )}:${Math.floor(durations[index] % 60)
                                      .toString()
                                      .padStart(2, "0")}`
                                  : "Loading..."}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </div>
          </div>
          {songs.length > 0 && <BottomPlayer />}
        </div>
      </ScrollArea>
    </div>
  );
}
