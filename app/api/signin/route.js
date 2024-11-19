import { User } from '@/app/models/User';
import { NextResponse } from 'next/server';

export async function POST(req) {
    const data = await req.json();

    const user = await User.findOne({ email: data.email })

    if (user) {
        if (user.password === data.password) {
            return NextResponse.json({ user })
        }
        else {
            return NextResponse.json({ error: 'Invalid Password' })
        }
    }


    return NextResponse.json({ error: 'Invalid credentials' });
}
