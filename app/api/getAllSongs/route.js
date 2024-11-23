import { connectDB } from "@/app/lib/connectDB";
import { Song } from "@/app/models/Song";
import { NextResponse } from "next/server";

export async function GET(req, res) {
    await connectDB();
    const songs = await Song.find().sort({ createdAt: -1 });
    return NextResponse.json({ songs })
}