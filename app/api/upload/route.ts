import { NextRequest, NextResponse } from "next/server"
import { uploadToCloudinary } from "@/utils/serverUpload"

export async function POST(request: NextRequest) {
  try {
    //Check content length early
    const formData = await request.formData()

    const file = formData.get("file") as File
    const folder = formData.get("folder") as string
    const requiredFields = ["file", "folder"]
    const missingFields = requiredFields.filter((field) => !formData.get(field))

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: `Missing required fields: ${missingFields.join(", ")}`,
        },
        { status: 400 }
      )
    }
    const uploadResult = await uploadToCloudinary(file, folder)

    return NextResponse.json(
      { success: true, ...uploadResult },
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
  } catch (error) {
    console.log("Upload error", error)
    return NextResponse.json(
      { error: "Failed to upload image" },
      {
        status: 500,
      }
    )
  }
}
