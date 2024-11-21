import cloudinary from "@/app/lib/cloudinary";
import { Album } from "@/app/models/Album";
import { NextResponse } from "next/server";


export async function POST(req) {


    const formData = await req.formData();

    const albumName = formData.get("albumName");
    const artistName = formData.get("artistName");
    const albumIamge = formData.get("albumIamge");
    const uniqueName = `${albumName}-${artistName}-${Date.now()}`;

    const imageBuffer = await albumIamge.arrayBuffer();


    const ImageUpload = await cloudinary.uploader.upload(`data:${albumIamge.type};base64,${Buffer.from(imageBuffer).toString("base64")}`, {
        folder: "albumImages",
        public_id: uniqueName,
    })

    const album = await Album.create({
        title: albumName,
        artist: artistName,
        imageUrl: ImageUpload.secure_url,
    });

    console.log("Album created:", album);

    return NextResponse.json({ album });

}
