"use client";
import { GrHomeRounded } from "react-icons/gr";
import { FaUserCircle } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { LuInbox } from "react-icons/lu";
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "./UserContext";
import { toast } from "sonner";
import DynamicBadge from "./DynamicBadge";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const menuRef = useRef(null);
  const pathName = usePathname();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false); // Close menu
      }
    };

    // Add event listener
    window.addEventListener("click", handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const router = useRouter();
  const logout = async (ev) => {
    ev.preventDefault();
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/logout`
    );
    setUser(null);
    toast.success(response.data.message, {
      duration: 1000,
    });
    router.push("/");
    setIsMenuOpen(false);
  };

  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [user]);

  return (
    <>
      <div className="bg-black p-3 px-6  flex justify-between items-center relative">
        <Link href={"/"} className="w-8 h-8 rounded-full overflow-hidden">
          {/* <img className="object-cover" src="./favicon.ico" alt="" /> */}
          <img
            className="object-cover w-full h-full bg-white"
            src="https://res.cloudinary.com/dtsvmjven/image/upload/v1732852354/Logo/jlrtpso1v19n7izxhe9w.png"
            alt=""
          />
        </Link>
        {pathName === "/" && (
          <div className="gap-1 lg:flex hidden absolute right-[40%]">
            <div className="bg-[#1f1f1f] p-4 my-2 flex cursor-pointer justify-center items-center rounded-full">
              <GrHomeRounded className="text-white md:text-2xl  fill-current" />
            </div>
            <div className="bg-[#1f1f1f] p-3 my-1 rounded-full flex justify-center items-center gap-2">
              <IoSearchOutline className="text-[#b3b3b3] text-3xl" />
              <input
                type="text"
                className="bg-transparent outline-none border-none active:border-none focus:outline-none text-white w-full px-2"
                placeholder="What do you want to play?"
              />
              <LuInbox className="text-[#b3b3b3] text-3xl" />
            </div>
          </div>
        )}

        <div>
          {!user && (
            <>
              <div
                onClick={(e) => {
                  e.stopPropagation(); // Prevent immediate close on click
                  setIsMenuOpen((prev) => !prev);
                }}
                className="flex justify-center items-center cursor-pointer relative"
              >
                <FaUserCircle className="text-[#b3b3b3] text-5xl" />
              </div>
            </>
          )}

          {user && (
            <div className="flex gap-3 items-center justify-center">
              {isAdmin && (
                <div>
                  <button
                    onClick={(ev) => {
                      ev.preventDefault();
                      router.push("/admin");
                    }}
                    className="bg-white font-semibold px-3 py-1 rounded-full"
                  >
                    Admin Page
                  </button>
                </div>
              )}
              <div
                onClick={(e) => {
                  e.stopPropagation(); // Prevent immediate close on click
                  setIsMenuOpen((prev) => !prev);
                }}
                className="flex justify-center items-center cursor-pointer relative"
              >
                <DynamicBadge letter={user.name[0]} />
              </div>
            </div>
          )}

          {isMenuOpen && (
            <div
              ref={menuRef}
              className="absolute right-8 rounded-2xl mt-2 w-48 bg-[#282828] z-50 overflow-hidden text-white shadow-lg"
            >
              {!user && (
                <>
                  <Link
                    href={"/signup"}
                    className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex justify-between"
                    onClick={() => console.log("Account clicked")}
                  >
                    Sign Up
                  </Link>
                  <Link
                    href={"/signin"}
                    className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex justify-between"
                    onClick={() => console.log("Account clicked")}
                  >
                    Sign In
                  </Link>
                </>
              )}

              {user && (
                <>
                  <Link
                    href={"/account"}
                    className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex justify-between"
                  >
                    Account
                  </Link>
                  <button
                    className="px-4 py-2 hover:bg-red-600 transition-all duration-300 cursor-pointer w-full"
                    onClick={(ev) => logout(ev)}
                  >
                    Log out
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
