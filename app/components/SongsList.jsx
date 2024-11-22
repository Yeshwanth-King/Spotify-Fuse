import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MdDelete } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const SongList = ({ songs, onDelete, setAddSong }) => {
  const router = useRouter();
  return (
    <div className=" text-white">
      <div className=" mb-4 flex justify-between">
        <h1 className="text-xl font-bold">Songs List</h1>
        <button
          onClick={() => {
            setAddSong(true);
          }}
          className="bg-green-700 hover:bg-green-900 transition-all duration-300 px-3 py-1 rounded-lg"
        >
          Add Song
        </button>
      </div>
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-lg">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-zinc-800/50">
              <TableHead className="w-[50px]"></TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Artist</TableHead>
              <TableHead>Release Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {songs.map((song) => (
              <TableRow key={song._id} className="hover:bg-zinc-800/50">
                <TableCell>
                  <img
                    src={song.imageUrl}
                    alt={song.title}
                    className="size-10 rounded object-cover"
                  />
                </TableCell>
                <TableCell className="font-medium">{song.title}</TableCell>
                <TableCell>{song.artist}</TableCell>
                <TableCell>
                  <span className="inline-flex items-center gap-1 text-zinc-400">
                    {/* <Calendar className="h-4 w-4" /> */}
                    {song.createdAt.split("T")[0]}
                  </span>
                </TableCell>

                <TableCell className="text-right">
                  <div className="flex gap-2 justify-end">
                    <Button
                      variant={"ghost"}
                      size={"sm"}
                      className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                      onClick={() => deleteSong(song._id)}
                    >
                      <MdDelete className="size-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SongList;
