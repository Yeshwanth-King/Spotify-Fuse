// app/components/AuthForm.js
"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IoMdArrowBack } from "react-icons/io";
import axios from "axios";
import { toast } from "sonner";
import { UserContext } from "./UserContext";

export default function AuthForm({ mode }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const { user, setUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Replace with API integration
    if (mode === "Sign Up") {
      if (password !== confirmPassword) {
        toast.error("Password Doesn't Match");
        return;
      }
    }
    const data =
      mode === "Sign Up"
        ? { name, email, password, confirmPassword }
        : { email, password };
    const endpoint = mode === "Sign In" ? "/api/signin" : "/api/signup";
    const response = await axios.post(endpoint, data);

    if (response.status == 200) {
      console.log(response.data);
      setUser(response.data.user);
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        toast.success("Logined Succesfull", {
          duration: 1000,
        });
        router.push("/");
      }
    } else {
      console.log("Error: " + response.data);
    }
  };

  const goBack = (ev) => {
    ev.preventDefault();
    router.push("/");
  };
  useEffect(() => {
    (async () => {
      const res = await axios.get("/api/connectDB");
      console.log(res.data);
    })();
  }, []);

  return (
    <div className="flex min-h-screen items-center relative justify-center bg-gray-900 text-white">
      <div className="w-full max-w-md space-y-6">
        <button
          onClick={(ev) => {
            goBack(ev);
          }}
          className="px-3 py-1 bg-gray-700 rounded-2xl text-lg absolute top-5 left-5 flex gap-1 justify-center items-center"
        >
          <IoMdArrowBack />
          Back
        </button>
        <h1 className="text-center text-3xl font-bold">{mode}</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "Sign Up" && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium">
                Name
              </label>
              <input
                type="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1 w-full rounded-xl p-2 border-gray-700 bg-gray-800 text-white focus:ring-2 focus:ring-green-500"
              />
            </div>
          )}
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full rounded-xl p-2 border-gray-700 bg-gray-800 text-white focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full rounded-xl p-2 border-gray-700 bg-gray-800 text-white focus:ring-2 focus:ring-green-500"
            />
          </div>
          {mode === "Sign Up" && (
            <>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setconfirmPassword(e.target.value)}
                  required
                  className="mt-1 w-full rounded-xl p-2 border-gray-700 bg-gray-800 text-white focus:ring-2 focus:ring-green-500"
                />
              </div>
            </>
          )}
          <button
            type="submit"
            className="w-full rounded-md bg-green-600 py-2 text-center font-medium hover:bg-green-500"
          >
            {mode}
          </button>
        </form>
        <p className="text-center text-sm text-gray-400">
          {mode === "Sign In" ? (
            <>
              Don’t have an account?{" "}
              <Link href="/signup" className="text-green-500 hover:underline">
                Sign Up
              </Link>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Link href="/signin" className="text-green-500 hover:underline">
                Sign In
              </Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
