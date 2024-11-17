"use client"
import axios from "axios";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    (async () => {
      const response = await axios.post("/api/test", { id: 1 })
      console.log(response.data)
    })();


  }, [])

  return (
    <>
      <div>
        Hello World

      </div>
    </>
  );
}
