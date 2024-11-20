import { connectDB } from "@/app/lib/connectDB";
import { NextResponse } from "next/server";

export async function GET(req, res) {
    await connectDB();
    return NextResponse.json({ message: "Connected to DB" })
}