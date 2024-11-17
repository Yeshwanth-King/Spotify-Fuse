import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String, require: true },
    image: { type: String, require: true },
    clerkId: { type: String, require: true, unique: true }
}, { timestamps: true })


const User = mongoose.models.User || mongoose.model("User", UserSchema)

export default User;
