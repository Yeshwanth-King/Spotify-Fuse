"use client";
import axios from "axios";
import { FastAverageColor } from "fast-average-color";

const { useEffect, useState, createContext, useRef } = require("react");

export const audioContext = createContext({});

export function AudioContextProvider({ children }) {
  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [ready, setReady] = useState(false);
  const [background, setBackground] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);
  const progressBarRef = useRef(null);
  const [volume, setVolume] = useState(1); // Initial volume (0 to 1)
  const [muted, setMuted] = useState(false); // Muted state
  const volProgressBarRef = useRef(null); // Ref for the progress bar container
  const isDragging = useRef(false);

  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const onNext = () => {
    setCurrentSongIndex(
      (prevIndex) => (prevIndex < songs.length - 1 ? prevIndex + 1 : 0) // Loop back to the first song
    );
  };

  const onPrev = () => {
    setCurrentSongIndex(
      (prevIndex) => (prevIndex > 0 ? prevIndex - 1 : songs.length - 1) // Loop back to the last song
    );
  };

  const fac = new FastAverageColor();

  useEffect(() => {
    if (!songs[currentSongIndex]?.imageUrl) return; // Guard clause to check if image exists

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = songs[currentSongIndex]?.imageUrl;

    img.onload = () => {
      fac
        .getColorAsync(img)
        .then((color) => {
          setBackground(color.hex);
        })
        .catch((error) => {
          console.error("Error calculating average color:", error);
        });
    };

    img.onerror = () => {
      console.error("Image loading failed for FastAverageColor.");
    };

    return () => fac.destroy();
  }, [currentSongIndex, songs]);

  useEffect(() => {
    (async () => {
      try {
        if (!songs.length > 0) {
          const response = await axios.get("api/getAllSongs");
          setSongs(response.data.songs);
          const response2 = await axios.get("/api/getAllAlbums");
          setAlbums(response2.data.albums);
          setReady(true);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  //song controller

  const finalVolume = muted ? 0 : volume ** 2;
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" + secs : secs}`;
  };

  useEffect(() => {
    if (!songs[currentSongIndex]?.song) return;

    if (!audioRef.current) {
      audioRef.current = new Audio(songs[currentSongIndex].song);
    } else if (audioRef.current.src !== songs[currentSongIndex].song) {
      audioRef.current.src = songs[currentSongIndex].song; // Update only when the song changes
    }

    const audio = audioRef.current;
    audio.volume = finalVolume;

    const handleMetadataLoaded = () => {
      setDuration(audio.duration);
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    // Attach event listeners
    audio.addEventListener("loadedmetadata", handleMetadataLoaded);
    audio.addEventListener("timeupdate", handleTimeUpdate);

    if (isPlaying) {
      audio.play();
    }

    return () => {
      audio.pause();
      audio.removeEventListener("loadedmetadata", handleMetadataLoaded);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [songs[currentSongIndex], isPlaying, finalVolume]);

  const handlePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handlePrev = () => {
    if (!audioRef.current) return;

    if (audioRef.current.currentTime < 5) {
      onPrev();
    } else {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
    }
    setIsPlaying(true);
  };

  const handleNext = () => {
    if (!audioRef.current) return;

    onNext();
    audioRef.current.currentTime = 0;
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const handleProgressClick = (e) => {
    if (audioRef.current && progressBarRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const newProgress = (clickX / rect.width) * 100;
      const newTime = (newProgress / 100) * duration;

      setProgress(newProgress);
      setCurrentTime(newTime);
      audioRef.current.currentTime = newTime;
    }
  };

  // Update volume based on position
  const updateVolume = (clientX) => {
    if (volProgressBarRef.current) {
      const rect = volProgressBarRef.current.getBoundingClientRect();
      const newVolume = Math.min(
        Math.max((clientX - rect.left) / rect.width, 0),
        1
      );
      setVolume(newVolume);
    }
  };

  // Handle mouse or touch events
  const handleDragStart = (event) => {
    isDragging.current = true;
    const clientX = event.clientX || event.touches[0].clientX;
    updateVolume(clientX);
  };

  const handleDragMove = (event) => {
    if (isDragging.current) {
      const clientX = event.clientX || event.touches[0].clientX;
      updateVolume(clientX);
    }
  };

  const handleDragEnd = () => {
    isDragging.current = false;
  };

  // Toggle mute state
  const toggleMute = () => setMuted((prevMuted) => !prevMuted);

  // Effect to update the audio element's volume
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = muted ? 0 : finalVolume;
    }
  }, [finalVolume, muted]);

  return (
    <audioContext.Provider
      value={{
        songs,
        ready,
        setSongs,
        albums,
        currentSongIndex,
        onNext,
        onPrev,
        background,
        finalVolume,
        progressBarRef,
        progress,
        duration,
        muted,
        setMuted,
        volProgressBarRef,
        volume,
        currentTime,
        isDragging,
        isPlaying,
        formatTime,
        toggleMute,
        handleDragEnd,
        handleDragMove,
        handleDragStart,
        handleNext,
        handlePlayPause,
        handlePrev,
        handleProgressClick,
      }}
    >
      {children}
    </audioContext.Provider>
  );
}
