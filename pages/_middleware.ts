import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.JWT_SECRET });

    const { pathname,origin } = req.nextUrl;

    if (pathname.includes('/api/auth') || token) {
        return NextResponse.next();
    }
    // redirect to login page if not authenticated
    if (!token && pathname !== '/login') {
        return NextResponse.rewrite(`${origin}/login`);
    }
}