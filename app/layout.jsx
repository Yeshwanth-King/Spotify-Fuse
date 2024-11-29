import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "sonner";
import { UserContextProvider } from "./components/UserContext";
import { AudioContextProvider } from "./components/AudioPlayer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Spotify Fuse",
  description: "Clone Created by Fuse Team",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="/faviconn.ico"
          className="text-green-400"
          sizes="any"
        />
      </head>
      <body
        className={
          `${geistSans.variable} ${geistMono.variable} antialiased` + "bg-black"
        }
      >
        <AudioContextProvider>
          <UserContextProvider>
            <Toaster position="top-right" richColors />
            {children}
          </UserContextProvider>
        </AudioContextProvider>
      </body>
    </html>
  );
}
