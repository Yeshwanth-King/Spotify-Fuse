import AddSongForm from "../components/AddSongForm";
import NavBar from "../components/NavBar";
import Sidebar from "../components/SideBar";

export default function Admin() {
  return (
    <>
      <div className="bg-black min-h-screen">
        <NavBar />
        <div className="flex gap-1">
          <Sidebar />
          <div className="bg-[#121212] w-full mx-1 mr-2 rounded-2xl h-[89vh]">
            <AddSongForm />
          </div>
        </div>
      </div>
    </>
  );
}
