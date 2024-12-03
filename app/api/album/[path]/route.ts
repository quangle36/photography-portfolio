import { NextRequest } from "next/server"
import Album from "@/models/Album"

import { IAlbum } from "@/types/albums"
import connectDB from "@/config/database"
import { ResponseBuilder } from "@/lib/responseBuilder"

interface RouteParams {
  path: string
}

export async function GET(
  request: NextRequest,
  { params }: { params: RouteParams }
) {
  const { path } = params
  console.log("pathname", path)
  try {
    await connectDB()
    const album: IAlbum | null = await Album.findOne({
      pathname: path,
    }).populate("category")

    if (!album) {
      return ResponseBuilder.notFound("Album not found")
    }
    return ResponseBuilder.success(album)
  } catch (error) {
    console.error(error)
    return ResponseBuilder.error("Internal Server Error")
  }
}
