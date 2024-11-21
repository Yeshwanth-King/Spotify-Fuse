// import cloudinary from "@/app/lib/cloudinary";
import { Song } from "@/app/models/Song";
import { v2 as cloudinary } from 'cloudinary'
import { NextResponse } from "next/server";
import path from "path";


export async function POST(req) {


    // Parse form data
    const formData = await req.formData();
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    // Extract fields from form data
    const songName = formData.get("songName");
    const artistName = formData.get("artistName");
    const songFile = formData.get("songFile"); // File object
    const songImage = formData.get("songImage");
    console.log({
        songName,
        artistName,
        songFile,
        songImage,
    });

    const songBuffer = await songFile.arrayBuffer();
    const imageBuffer = await songImage.arrayBuffer();

    const songUploaded = await cloudinary.uploader.upload(`data:${songFile.type};base64,${Buffer.from(songBuffer).toString("base64")}`, {
        resource_type: "video",
        folder: "songs",
        transformation: [
            {
                quality: "auto", // Automatically compress the audio
                fetch_format: "mp3", // Convert to MP3 format (optional)
                audio_codec: "mp3",   // Use MP3 codec (optional)
                bitrate: "64k",     // Set the bitrate to 64 kbps (optional)
            }
        ]
    })

    const ImageUpload = await cloudinary.uploader.upload(`data:${songImage.type};base64,${Buffer.from(imageBuffer).toString("base64")}`, {
        folder: "songImages",
    })
    console.log(songUploaded, ImageUpload);

    const song = await Song.create({
        title: songName,
        artist: artistName,
        imageUrl: ImageUpload.secure_url,
        song: songUploaded.secure_url,
    });

    console.log("Song created:", song);

    return NextResponse.json({ song });

}
