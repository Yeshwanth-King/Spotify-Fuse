import { connectDB } from "@/app/lib/connectDB";

import { NextResponse } from "next/server";

export async function POST(req, res) {
    console.log("Request Done")

    await connectDB();

    return NextResponse.json({ message: "Done" })


}