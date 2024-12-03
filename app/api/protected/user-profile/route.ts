import { NextResponse } from "next/server"
import User from "@/models/User"
import mongoose from "mongoose"

import connectDB from "@/config/database"
import { getServerUser } from "@/lib/auth"

export async function GET() {
  try {
    await connectDB()
    const user = getServerUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = new mongoose.Types.ObjectId(user.id)
    console.log("userId", userId)
    const dbUser = await User.findById(userId).select("-password")

    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ user: dbUser })
  } catch (error) {
    console.error("Profile error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
