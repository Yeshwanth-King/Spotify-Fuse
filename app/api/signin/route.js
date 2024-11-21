import { connectDB } from '@/app/lib/connectDB';
import { User } from '@/app/models/User';
import { NextResponse } from 'next/server';
import jws from "jsonwebtoken"

export async function POST(req, res) {
    try {
        const data = await req.json();
        await connectDB();
        const user = await User.findOne({ email: data.email })

        if (user) {
            if (user.password === data.password) {
                const token = jws.sign({ _id: user._id, email: user.email, name: user.name }, process.env.JWS_SECRET, {});
                const response = NextResponse.json({ user });
                response.cookies.set("token", token, {
                    httpOnly: true,
                    maxAge: 60 * 60 * 1,
                    sameSite: 'strict',
                })
                if (user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
                    response.cookies.set("isAdmin", "true", {
                        httpOnly: true,
                        maxAge: 60 * 60 * 1,
                    })
                }
                return response;
            }
            else {
                return NextResponse.json({ error: 'Invalid Password' })
            }
        }
    } catch (error) {

        console.log(error);
        return NextResponse.json({ error });
    }


    return NextResponse.json({ error: 'Invalid credentials' });
}
