import { NextResponse } from "next/server"
import Album from "@/models/Album"

import connectDB from "@/config/database"

export async function GET() {
  try {
    await connectDB()

    const albums = await Album.find({})

    const thumbnails = albums.map((album) => ({
      _id: album._id,
      name: album.name,
      thumbnail: album.images[0],
    }))

    return NextResponse.json(thumbnails)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch albums" },
      { status: 500 }
    )
  }
}
