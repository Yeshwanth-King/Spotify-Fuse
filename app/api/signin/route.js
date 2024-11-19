import { connectDB } from '@/app/lib/connectDB';
import { User } from '@/app/models/User';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const data = await req.json();
        await connectDB();
        const user = await User.findOne({ email: data.email })

        if (user) {
            if (user.password === data.password) {
                return NextResponse.json({ user })
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
