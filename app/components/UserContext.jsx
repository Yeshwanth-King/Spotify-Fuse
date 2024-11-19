"use client";

import axios from "axios";
import { createContext, useEffect, useState } from "react";
export const UserContext = createContext({});
export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try {
      (async () => {
        if (!user) {
          const response = await axios.get("api/get-profile");
          setUser(response.data.userInfo);
          setReady(true);
        }
      })();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
}
