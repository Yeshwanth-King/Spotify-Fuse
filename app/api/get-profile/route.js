import { User } from "@/app/models/User";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req, res) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");
    if (token) {
        const user = jwt.verify(token.value, process.env.JWS_SECRET, {});
        const userInfo = await User.findById(user._id);
        return NextResponse.json({ userInfo });
    }
    return NextResponse.json({ userInfo: null });

}