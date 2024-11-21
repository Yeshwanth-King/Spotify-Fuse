import cloudinary from "@/app/lib/cloudinary";
import { Song } from "@/app/models/Song";
import { NextResponse } from "next/server";


export async function POST(req) {


    // Parse form data
    const formData = await req.formData();

    // Extract fields from form data
    const songName = formData.get("songName");
    const artistName = formData.get("artistName");
    const songFile = formData.get("songFile"); // File object
    const songImage = formData.get("songImage");
    const album = formData.get("album");
    const uniqueName = `${songName}-${artistName}-${Date.now()}`;
    console.log(album)

    const songBuffer = await songFile.arrayBuffer();
    const imageBuffer = await songImage.arrayBuffer();

    const songUploaded = await cloudinary.uploader.upload(`data:${songFile.type};base64,${Buffer.from(songBuffer).toString("base64")}`, {
        resource_type: "video",
        folder: "songs",
        public_id: uniqueName,
    })

    const ImageUpload = await cloudinary.uploader.upload(`data:${songImage.type};base64,${Buffer.from(imageBuffer).toString("base64")}`, {
        folder: "songImages",
    })

    const song = await Song.create({
        title: songName,
        artist: artistName,
        imageUrl: ImageUpload.secure_url,
        song: songUploaded.secure_url,
        album: album._id,
    });
    const populated = await Song.findById(song._id).populate("album")


    console.log("Song created:", populated);

    return NextResponse.json({ populated });

}
