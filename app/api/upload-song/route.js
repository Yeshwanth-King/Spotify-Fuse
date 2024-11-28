import cloudinary from "@/app/lib/cloudinary";
import { connectDB } from "@/app/lib/connectDB";
import { Album } from "@/app/models/Album";
import { Song } from "@/app/models/Song";
import { NextResponse } from "next/server";


export async function POST(req) {

    // Parse form data
    const formData = await req.formData();
    await connectDB();

    // Extract fields from form data
    const songName = formData.get("songName");
    const artistName = formData.get("artistName");
    const songFile = formData.get("songFile"); // File object
    const songImage = formData.get("songImage");
    const album = formData.get("album");
    const uniqueName = `${songName}-${artistName}-${Date.now()}`;

    const validSongTypes = ["audio/mpeg", "audio/mp3"];
    const validImageTypes = ["image/jpeg", "image/png"];



    const songBuffer = await songFile.arrayBuffer();
    const imageBuffer = await songImage.arrayBuffer();


    if (!songName || !artistName || !songFile || !songImage) {
        return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }


    try {
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
            album: album,
        });

        if (album) {
            const albumUpdate = await Album.findByIdAndUpdate(album, { $push: { songs: song._id } }, { new: true });
            console.log(albumUpdate);
        }

        return NextResponse.json({ song });
    } catch (error) {
        return NextResponse.json({ error: "error occured while uploading" }, { status: 500 });

    }

}
