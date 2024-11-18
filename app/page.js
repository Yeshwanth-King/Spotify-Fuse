"use client"
// import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    (async () => {
      const response = await axios.post("/api/test", { id: 1 })
      console.log(response.data)
      // const { user } = useUser();
      // console.log(user)
    })();


  }, [])

  return (
    <>
      <div suppressHydrationWarning>
        Hello World

      </div>
    </>
  );
}
