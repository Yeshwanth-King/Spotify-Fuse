import { connectDB } from "@/app/lib/connectDB";
import { Song } from "@/app/models/Song";
import { NextResponse } from "next/server";

export async function GET(req, res) {
    await connectDB();
    const getFeaturedSongs = await Song.aggregate([
        { $sample: { size: 4 } },
        {
            $project: {
                _id: 1,
                title: 1,
                artist: 1,
                imageUrl: 1,
                song: 1,
            },
        },
    ])
    const getTrendingSongs = await Song.aggregate([
        { $sample: { size: 4 } },
        {
            $project: {
                _id: 1,
                title: 1,
                artist: 1,
                imageUrl: 1,
                song: 1,
            },
        },
    ])
    const getMadeForYouSongs = await Song.aggregate([
        { $sample: { size: 4 } },
        {
            $project: {
                _id: 1,
                title: 1,
                artist: 1,
                imageUrl: 1,
                song: 1,
            },
        },
    ])

    return NextResponse.json({ getFeaturedSongs, getMadeForYouSongs, getTrendingSongs })
}