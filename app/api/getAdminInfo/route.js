import { connectDB } from "@/app/lib/connectDB";
import { Album } from "@/app/models/Album";
import { Song } from "@/app/models/Song";
import { User } from "@/app/models/User";
import { NextResponse } from "next/server";

export async function GET(req, res) {
    await connectDB();
    const songs = (await Song.find()).length;
    const albums = (await Album.find()).length;
    const users = (await User.find()).length;
    return NextResponse.json({ songs, albums, users });
}