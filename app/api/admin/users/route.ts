import { NextResponse } from "next/server"
import { User } from "@/models/User"

export async function GET() {
  try {
    const users = await User.find().select("-password")
    return NextResponse.json({ users })
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
