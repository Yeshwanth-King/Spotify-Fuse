import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MdDelete } from "react-icons/md"; // Ensure correct import paths for Shadcn components
import { Button } from "@/components/ui/button";

const AlbumList = ({ albums, onDelete, setAddSong }) => {
  return (
    <div className="text-white">
      <div className=" mb-4 flex justify-between">
        <h1 className="text-xl font-bold">Albums List</h1>
        <button
          onClick={() => {
            setAddSong(true);
          }}
          className="bg-green-700 hover:bg-green-900 transition-all duration-300 px-3 py-1 rounded-lg"
        >
          Add Album
        </button>
      </div>
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-lg">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-zinc-800/50">
              <TableHead className="w-[50px]"></TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Artist</TableHead>
              <TableHead>Release Year</TableHead>
              <TableHead>Songs</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {albums.map((album) => (
              <TableRow key={album._id} className="hover:bg-zinc-800/50">
                <TableCell>
                  <img
                    src={album.imageUrl}
                    alt={album.title}
                    className="w-10 h-10 rounded object-cover"
                  />
                </TableCell>
                <TableCell className="font-medium">{album.title}</TableCell>
                <TableCell>{album.artist}</TableCell>
                <TableCell>
                  <span className="inline-flex items-center gap-1 text-zinc-400">
                    {album.createdAt.split("T")[0]}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="inline-flex items-center gap-1 text-zinc-400">
                    {album.songs.length} songs
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex gap-2 justify-end">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteAlbum(album._id)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
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

export default AlbumList;
