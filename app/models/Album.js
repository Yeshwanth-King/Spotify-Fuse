import mongoose from "mongoose";

const AlbumSchema = new mongoose.Schema({
    title: { type: String, require: true },
    artist: { type: String, require: true },
    imageUrl: { type: String, require: true },
    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }],
}, { timestamps: true })

export const Album = mongoose.model("Album", AlbumSchema);