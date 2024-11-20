import NavBar from "./components/NavBar";
import Sidebar from "./components/SideBar";

export default function Home() {
  return (
    <>
      <div className="bg-black min-h-screen">
        <NavBar />
        <div className="flex">
          <Sidebar />
          <div> Main COntetnt</div>
        </div>
      </div>
    </>
  );
}
