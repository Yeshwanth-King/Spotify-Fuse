"use client";

import { useState } from "react";
import axios from "axios";

export default function CreateAlbumPage() {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [image, setImage] = useState(null);
  const [songs, setSongs] = useState([]);
  const [songInput, setSongInput] = useState("");

  const handleAddSong = () => {
    if (songInput.trim()) {
      setSongs((prev) => [...prev, songInput.trim()]);
      setSongInput("");
    }
  };

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !artist || !image || songs.length === 0) {
      alert("Please fill out all fields and add at least one song.");
      return;
    }

    try {
      // Upload album cover image to Cloudinary
      const imageData = new FormData();
      imageData.append("file", image);
      imageData.append("upload_preset", "your_upload_preset"); // Replace with your Cloudinary preset

      const imageRes = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        imageData
      );

      const imageUrl = imageRes.data.secure_url;

      // Send album details to the API
      const res = await axios.post("/api/albums", {
        title,
        artist,
        imageUrl,
        songs,
      });

      if (res.data.success) {
        alert("Album created successfully!");
        setTitle("");
        setArtist("");
        setImage(null);
        setSongs([]);
      } else {
        alert("Failed to create album.");
      }
    } catch (error) {
      console.error("Error creating album:", error);
      alert("An error occurred while creating the album.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-8">Create an Album</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-lg"
      >
        {/* Album Title */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            Album Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 rounded-md bg-gray-700 border border-gray-600 text-gray-300 focus:ring focus:ring-blue-500"
            placeholder="Enter album title"
            required
          />
        </div>

        {/* Artist Name */}
        <div className="mb-4">
          <label htmlFor="artist" className="block text-sm font-medium mb-2">
            Artist Name
          </label>
          <input
            type="text"
            id="artist"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            className="w-full p-2 rounded-md bg-gray-700 border border-gray-600 text-gray-300 focus:ring focus:ring-blue-500"
            placeholder="Enter artist name"
            required
          />
        </div>

        {/* Album Cover */}
        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-medium mb-2">
            Album Cover
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full text-gray-300 bg-gray-700 p-2 rounded-md"
            required
          />
        </div>

        {/* Songs */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Songs</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={songInput}
              onChange={(e) => setSongInput(e.target.value)}
              className="flex-1 p-2 rounded-md bg-gray-700 border border-gray-600 text-gray-300 focus:ring focus:ring-blue-500"
              placeholder="Enter song name"
            />
            <button
              type="button"
              onClick={handleAddSong}
              className="bg-green-500 px-4 py-2 rounded-md text-white font-medium hover:bg-green-600"
            >
              Add
            </button>
          </div>
          <ul className="mt-3 space-y-1">
            {songs.map((song, index) => (
              <li
                key={index}
                className="text-sm text-gray-400 flex items-center justify-between"
              >
                {index + 1}. {song}
                <button
                  type="button"
                  onClick={() =>
                    setSongs((prev) => prev.filter((_, i) => i !== index))
                  }
                  className="text-red-500 hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 py-2 rounded-md text-white font-medium hover:bg-blue-500"
        >
          Create Album
        </button>
      </form>
    </div>
  );
}
