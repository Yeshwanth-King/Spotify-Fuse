import multer from "multer";
import { NextResponse } from "next/server";
import path from "path";

// Configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/uploads"); // Save files in the public/uploads directory
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

// Set up multer upload
const upload = multer({ storage });

export async function POST(req) {
    try {
        const form = await new Promise((resolve, reject) => {
            const handler = upload.fields([
                { name: "songFile", maxCount: 1 },
                { name: "songImage", maxCount: 1 },
            ]);
            handler(req, null, (err) => (err ? reject(err) : resolve(req)));
        });

        const { songName, artistName } = form.body;
        const songFile = form.files.songFile[0].filename;
        const songImage = form.files.songImage[0].filename;

        console.log({
            songName,
            artistName,
            songFile,
            songImage,
        });

        return NextResponse.json({ success: true, message: "Song uploaded!" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: "Upload failed!" });
    }
}
