"use client";

import { useEffect, useState } from "react";
import { IoAlbumsOutline } from "react-icons/io5";
import axios from "axios";
import { toast } from "sonner";
import { RxCross2 } from "react-icons/rx";
import { useRouter } from "next/navigation";
export default function AlbumPage({ setAddSong }) {
  const [albumName, setAlbumName] = useState("");
  const [artist, setArtist] = useState("");
  const [albumImage, setAlbumImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [songs, setSongs] = useState([]);
  const [songsAdded, setSongsAdded] = useState([]);
  const router = useRouter();
  useEffect(() => {
    (async () => {
      const response = await axios.get("/api/getAllSongs");
      console.log(response.data.songs);
      setSongs(response.data.songs);
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("albumName", albumName);
    formData.append("artistName", artist);
    formData.append("albumIamge", albumImage);

    try {
      const response = await axios.post("/api/upload-album", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response.data);
      toast.success(`${response.data.album.title} added successfully`, {
        duration: 1000,
      });
      setAlbumName("");
      setArtist("");
      setAlbumImage(null);
      setAddSong(false);
      router.refresh();
    } catch (error) {
      console.error("Error uploading song:", error);
      toast.error("Failed to add the song.", { duration: 1000 });
    }
    setLoading(false);
  };
  return (
    <>
      <div>
        <form
          onSubmit={handleSubmit}
          className="max-w-lg relative mx-auto p-6 rounded-lg bg-[#121212] shadow-md text-white space-y-6"
        >
          <div className="absolute right-4 ">
            <RxCross2
              onClick={() => {
                setAddSong(false);
              }}
              className="text-2xl cursor-pointer"
            />
          </div>
          <div className="flex gap-2 justify-center items-center">
            <IoAlbumsOutline className="text-3xl text-[#1DB954]" />
            <h2 className="text-2xl font-semibold text-white text-center">
              Add Album
            </h2>
          </div>

          {/* Song Name */}
          <div>
            <label
              htmlFor="songName"
              className="block mb-1 text-sm font-medium"
            >
              Album Name
            </label>
            <input
              type="text"
              id="songName"
              value={albumName}
              onChange={(e) => setAlbumName(e.target.value)}
              required
              className="w-full px-4 py-2 bg-[#1e1e1e] border border-[#282828] rounded-lg focus:ring-2 focus:ring-[#1DB954] text-sm"
            />
          </div>

          {/* Artist Name */}
          <div>
            <label
              htmlFor="artistName"
              className="block mb-1 text-sm font-medium"
            >
              Artist Name
            </label>
            <input
              type="text"
              id="artistName"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              required
              className="w-full px-4 py-2 bg-[#1e1e1e] border border-[#282828] rounded-lg focus:ring-2 focus:ring-[#1DB954] text-sm"
            />
          </div>

          {/* Song Image */}
          <div>
            <label
              htmlFor="songImage"
              className="block mb-1 text-sm font-medium"
            >
              Album Image (JPG/PNG)
            </label>
            <input
              type="file"
              id="songImage"
              accept="image/*"
              onChange={(e) => setAlbumImage(e.target.files[0])}
              required
              className="w-full px-4 py-2 bg-[#121212] border border-[#282828] rounded-md text-sm text-gray-300 
             file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold 
             file:bg-[#282828] file:text-gray-400 hover:file:bg-[#3e3e3e] focus:outline-none focus:ring-2 focus:ring-[#1DB954]"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={
              "w-full px-4 py-2 flex justify-center items-center bg-[#1DB954] text-white font-semibold rounded-lg hover:bg-[#1aa34a] transition-all " +
              (loading ? "cursor-not-allowed" : "")
            }
          >
            {loading ? (
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-red-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            ) : (
              <>Add Song</>
            )}
          </button>
        </form>
      </div>
    </>
  );
}
