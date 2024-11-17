
const { NextResponse } = require("next/server")

export const ProtectedRoute = async (req, res, next) => {
    if (!req.auth.userId) {
        return NextResponse.json({ message: "Must be Logined" })
    }
    next();
}

export const requireAdmin = async (req, res, next) => {
}