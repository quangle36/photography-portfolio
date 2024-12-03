import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import * as jose from "jose"

import { verifyToken } from "./lib/jwt"

export async function middleware(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Missing or invalid bearer token" },
        { status: 401 }
      )
    }

    const token = authHeader.split(" ")[1]
    // Verify token and decode payload
    const decoded = await verifyToken(token)
    // Check admin routes
    if (request.nextUrl.pathname.startsWith("/api/admin")) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 403 }
      )
    }

    // Create a new headers object
    const requestHeaders = new Headers(request.headers)

    // Add user info to headers
    requestHeaders.set("x-user-id", decoded.sub)

    // Return response with modified headers
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
  } catch (error) {
    console.log(error)
    if (error instanceof jose.errors.JWTExpired) {
      return NextResponse.json({ error: "Token expired" }, { status: 401 })
    }

    if (error instanceof jose.errors.JWSSignatureVerificationFailed) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 401 }
    )
  }
}

export const config = {
  matcher: ["/api/protected/:path*", "/api/admin/:path*"],
}
