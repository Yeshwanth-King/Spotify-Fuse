"use client";

import { useState } from "react";
import axios from "axios";

export default function AddSongForm() {
  const [songName, setSongName] = useState("");
  const [artistName, setArtistName] = useState("");
  const [songFile, setSongFile] = useState(null);
  const [songImage, setSongImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("songName", songName);
    formData.append("artistName", artistName);
    formData.append("songFile", songFile);
    formData.append("songImage", songImage);

    try {
      const response = await axios.post("/api/upload-song", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.status === 200) {
        alert("Song added successfully!");
      }
    } catch (error) {
      console.error("Error uploading song:", error);
      alert("Failed to add the song.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 rounded-lg bg-[#121212] shadow-md text-white space-y-6"
    >
      <h2 className="text-2xl font-semibold text-white">
        🎵 Add Your Favorite Song
      </h2>

      {/* Song Name */}
      <div>
        <label htmlFor="songName" className="block mb-1 text-sm font-medium">
          Song Name
        </label>
        <input
          type="text"
          id="songName"
          value={songName}
          onChange={(e) => setSongName(e.target.value)}
          required
          className="w-full px-4 py-2 bg-[#1e1e1e] border border-[#282828] rounded-lg focus:ring-2 focus:ring-[#1DB954] text-sm"
        />
      </div>

      {/* Artist Name */}
      <div>
        <label htmlFor="artistName" className="block mb-1 text-sm font-medium">
          Artist Name
        </label>
        <input
          type="text"
          id="artistName"
          value={artistName}
          onChange={(e) => setArtistName(e.target.value)}
          required
          className="w-full px-4 py-2 bg-[#1e1e1e] border border-[#282828] rounded-lg focus:ring-2 focus:ring-[#1DB954] text-sm"
        />
      </div>

      {/* Song File */}
      <div>
        <label htmlFor="songFile" className="block mb-1 text-sm font-medium">
          Song File (MP3)
        </label>
        <input
          type="file"
          id="songFile"
          accept="audio/*"
          onChange={(e) => setSongFile(e.target.files[0])}
          required
          className="w-full px-4 py-2 bg-[#1e1e1e] border border-[#282828] rounded-lg text-sm"
        />
      </div>

      {/* Song Image */}
      <div>
        <label htmlFor="songImage" className="block mb-1 text-sm font-medium">
          Song Image (JPG/PNG)
        </label>
        <input
          type="file"
          id="songImage"
          accept="image/*"
          onChange={(e) => setSongImage(e.target.files[0])}
          required
          className="w-full px-4 py-2 bg-[#1e1e1e] border border-[#282828] rounded-lg text-sm"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full px-4 py-2 bg-[#1DB954] text-black font-semibold rounded-lg hover:bg-[#1aa34a] transition-all"
      >
        Add Song
      </button>
    </form>
  );
}
