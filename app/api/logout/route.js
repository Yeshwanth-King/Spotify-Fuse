import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE(req, res) {
    const cookieStore = await cookies();
    cookieStore.delete("token");
    if (cookieStore.get("isAdmin")) {
        cookieStore.delete("isAdmin");
    }
    return NextResponse.json({ message: "Logged out" });
}