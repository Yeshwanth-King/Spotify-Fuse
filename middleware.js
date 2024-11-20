import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request) {
    const token = request.cookies.get('token');
    const isAdmin = request.cookies.get("isAdmin");
    const url = request.nextUrl.clone();

    if (url.pathname === '/signin' || url.pathname === '/signup') {
        if (token) {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }
    if (url.pathname.startsWith('/admin')) {
        if (!isAdmin || isAdmin.value !== 'true') { // Adjust this check based on your logic
            url.pathname = '/403'; // Redirect to a forbidden page
            return NextResponse.rewrite(url);
        }
    }
    return NextResponse.next();

}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/signin', '/signup', '/admin/:path*'],
}