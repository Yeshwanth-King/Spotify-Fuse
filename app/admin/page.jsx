import Image from "next/image";
import AddSongForm from "../components/AddSongForm";
import AlbumPage from "../components/AlbumPage";
import CreateAlbumPage from "../components/CreateAlbumPage";
import NavBar from "../components/NavBar";
import Sidebar from "../components/SideBar";
import AdminCards from "../components/AdminCards";

export default function Admin() {
  return (
    <>
      <div className="bg-black min-h-screen">
        <NavBar />
        <div className="flex gap-1">
          <div className="bg-[#121212] p-4 w-full mx-2 rounded-2xl flex flex-col justify-center items-center gap-2">
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
