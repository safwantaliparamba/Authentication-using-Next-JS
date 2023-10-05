import { NextRequest, NextResponse } from "next/server";


export const middleware = async (request: NextRequest) => {
    const path = request.nextUrl.pathname

    const isPublicRoute = path === "/sign-up" || path === "/sign-in"
    const token = request.cookies.get("token")?.value || ""

    if (isPublicRoute && token) {

        return NextResponse.redirect(new URL('/',request.nextUrl))
    }

    if (!isPublicRoute && !token){

        return NextResponse.redirect(new URL('/sign-in',request.nextUrl))
    }
}

export const config = {
    matcher : [
        "/sign-up",
        "/sign-in",
        "/profile",
        "/"
    ]
}