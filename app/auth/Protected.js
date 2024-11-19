
const { NextResponse } = require("next/server")

export const ProtectedRoute = async (req, res, next) => {
    if (!req.auth.userId) {
        return NextResponse.json({ message: "Must be Logined" })
    }
    next();
}

export const requireAdmin = async (user) => {
    try {
        // const currentEmail = await clerkClient.users.getUser(req.auth.userId);
        const isAdmin = user.email === process.env.ADMIN_EMAIL;
        if (!isAdmin) {
            return NextResponse.json({ message: "Must be Admin" })
        }
        next();
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Error" })
    }
}