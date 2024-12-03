import { NextResponse } from "next/server"
import Category from "@/models/Category"
import { uploadToCloudinary } from "@/utils/serverUpload"
import mongoose from "mongoose"

import connectDB from "@/config/database"

export async function GET() {
  try {
    await connectDB()
    const categories = await Category.find({})
    if (!categories) {
      return NextResponse.json(
        { error: "Categories not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({ categories }, { status: 200 })
  } catch (error) {
    console.error("Failed to fetch categories", error)
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    await connectDB()
    //parse request body
    // const body = await request.json();
    const formData = await request.formData()

    const path = formData.get("path") as string
    const title = formData.get("title") as string
    const folder = formData.get("folder") as string
    const thumbnailSrc = formData.get("thumbnailSrc") as File
    const requiredFields = ["path", "folder", "title", "thumbnailSrc"]
    const missingFields = requiredFields.filter(
      (field) =>
        !formData.get(field) ||
        (field === "thumbnailSrc" &&
          formData.get(field) instanceof File &&
          (formData.get(field) as File).size === 0)
    )

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: `Missing required fields: ${missingFields.join(", ")}`,
        },
        { status: 400 }
      )
    }
    const uploadResult = await uploadToCloudinary(thumbnailSrc, folder)

    const formattedPath = path.startsWith("/") ? path : `/${path}`

    const newCategory = await Category.create({
      thumbnailSrc: uploadResult.urls.avif,
      path: formattedPath,
      title: title.trim(),
      // Add optional fields if they exist
      // description: body.description?.trim(),
      // isActive: body.isActive ?? true,
    })

    return NextResponse.json(
      {
        success: true,
        message: "Category created successfully",
        data: newCategory,
      },
      {
        status: 201,
      }
    )
  } catch (error: any) {
    if ((error.code = 11000)) {
      return NextResponse.json(
        {
          success: false,
          error: "A category with this path already exists",
        },
        {
          status: 409,
        }
      )
    }

    if (error instanceof mongoose.Error.ValidationError) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation Error",
          details: Object.values(error.errors).map((err) => err.message),
        },
        {
          status: 400,
        }
      )
    }

    // console.error('Error creating category', error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to create category",
      },
      {
        status: 500,
      }
    )
  }
}
