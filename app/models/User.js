import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    confirmPassword: { type: String, require: true },

}, { timestamps: true })


export const User = mongoose.models.User || mongoose.model("User", UserSchema);

