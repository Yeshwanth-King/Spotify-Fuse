"use client";
import Image from "next/image";
import AddSongForm from "../components/AddSongForm";
import AlbumPage from "../components/AlbumPage";
import NavBar from "../components/NavBar";
import AdminCards from "../components/AdminCards";
import { useContext } from "react";
import { UserContext } from "../components/UserContext";

export default function Admin() {
  const { user, setUser } = useContext(UserContext);

  return (
    <>
      <div className="bg-black min-h-screen">
        <NavBar />
        <div className="flex gap-1">
          <div className="bg-[#121212] p-4 w-full mx-2 rounded-2xl flex flex-col items-center gap-2 h-[89vh]">
            <div className="flex w-full">
              <div className="flex gap-2 items-center p-3">
                <div>
                  <Image
                    src={"/images/LOGO_Main.png"}
                    height={50}
                    width={50}
                    alt="logo"
                  />
                </div>
                <div>
                  <span className="text-white text-4xl font-bold">
                    Music Manager
                  </span>
                  <p className="text-gray-400 text-sm font-medium">
                    Manage Your Music Catalog
                  </p>
                </div>
              </div>
              <div className="sm:hidden"></div>
            </div>
            <AdminCards />
          </div>
        </div>
      </div>
    </>
  );
}
