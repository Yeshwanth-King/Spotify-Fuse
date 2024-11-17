import mongoose from "mongoose";

const SongSchema = new mongoose.Schema({
    title: { type: String, require: true },
    artist: { type: String, require: true },
    imageUrl: { type: String, require: true },
    song: { type: String, require: true },
    album: { type: mongoose.Schema.Types.ObjectId, ref: "Album" }

}, { timestamps: true })

export const Song = mongoose.model("Song", SongSchema);