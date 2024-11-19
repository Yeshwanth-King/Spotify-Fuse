import { connectDB } from '@/app/lib/connectDB';
import { User } from '@/app/models/User';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const data = await req.json();
        console.log(data)

        await connectDB();

        const alreadyUser = await User.find({ email: data.email })

        if (alreadyUser.length > 0) {
            return NextResponse.json({ message: "Already a User exists" })
        }

        const user = await User.create(data)
        console.log(user)
    } catch (error) {

        console.log(error);
        return NextResponse.json({ error });

    }

    // Mock saving user
    return NextResponse.json({ success: true, message: 'User registered successfully', data });
}
