import { Album } from "@/app/models/Album";
import { NextResponse } from "next/server";

export async function GET(req, res) {
    const albums = await Album.find();
    return NextResponse.json({ albums })
}