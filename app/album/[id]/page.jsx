"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function AlbumaPage() {
  const [album, setAlbum] = useState(null);
  const params = useParams();
  console.log(params.id);
  useEffect(() => {
    (async () => {
      const response = await axios.put("/api/getAllAlbums", { id: params.id });
      console.log(response.data.album);
      setAlbum(response.data.album);
    })();
  }, []);

  return (
    <>
      <div className="bg-black min-h-screen">
        <img src={album?.imageUrl} alt="" />
      </div>
    </>
  );
}
