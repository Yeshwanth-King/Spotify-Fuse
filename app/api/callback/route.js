import { User } from "@/app/models/User";
import { NextResponse } from "next/server";

export async function PUT(req, res) {
    const data = await req.json();
    console.log(data)
    const userInfo = await User.findById(data.id)
    if (!userInfo) {
        const userInfo = await User.create({
            name: `${data.firstName} ${data.lastName}`,
            clerkId: id,
            image: imageUrl
        });
        return NextResponse.json({ userInfo })
    }
    else {

        return NextResponse.json({ userInfo })
    }
}