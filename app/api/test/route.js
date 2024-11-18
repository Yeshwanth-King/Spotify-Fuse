import { connectDB } from "@/app/lib/connectDB";
import { currentUser } from "@clerk/nextjs/server";

import { NextResponse } from "next/server";

export async function POST(req, res) {
    console.log("Request Done")

    await connectDB();
    const user = await currentUser();
    console.log(user)

    return NextResponse.json({ message: "Done" })


}