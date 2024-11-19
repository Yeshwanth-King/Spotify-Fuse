"use client";
import Link from "next/link";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import { toast } from "sonner";

export default function NavBar() {
  const logout = async (ev) => {
    ev.preventDefault();
    const response = await axios.delete("/api/logout");
    setUser(null);
    toast.success(response.data.message);
  };

  const { user, setUser } = useContext(UserContext);
  return (
    <>
      <div className="bg-black p-5">
        <div className="w-8 h-8 rounded-full overflow-hidden">
          {/* <img className="object-cover" src="./favicon.ico" alt="" /> */}
          <img
            className="object-cover w-full h-full bg-white"
            src="./images/logo.png"
            alt=""
          />
        </div>

        {user && (
          <button
            onClick={(ev) => logout(ev)}
            className="bg-gray-300 px-3 py-1 rounded-2xl"
          >
            Log out
          </button>
        )}
      </div>
    </>
  );
}
