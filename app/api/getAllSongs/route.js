import { connectDB } from "@/app/lib/connectDB";
import { Song } from "@/app/models/Song";
import { NextResponse } from "next/server";

export async function GET(req, res) {
    await connectDB();
    const songs = await Song.find();
    return NextResponse.json({ songs })
}