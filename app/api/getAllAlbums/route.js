import { connectDB } from "@/app/lib/connectDB";
import { Album } from "@/app/models/Album";
import { NextResponse } from "next/server";

export async function GET(req, res) {
    await connectDB();
    const albums = await Album.find().sort({ createdAt: -1 });
    return NextResponse.json({ albums })
}
export async function PUT(req, res) {
    await connectDB();
    const { id } = await req.json();
    const album = await Album.findById(id).populate("songs")
    return NextResponse.json({ album })
}