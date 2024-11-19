import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE(req, res) {
    const cookieStore = await cookies();
    cookieStore.delete("token");
    return NextResponse.json({ message: "Logged out" });
}