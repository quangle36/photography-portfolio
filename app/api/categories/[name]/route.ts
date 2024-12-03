import { NextRequest, NextResponse } from "next/server"
import Category from "@/models/Category"

import connectDB from "@/config/database"
import { ResponseBuilder } from "@/lib/responseBuilder"

export async function GET(
  request: NextRequest,
  { params }: { params: { name: string } }
) {
  try {
    await connectDB()
    const decodedName = decodeURIComponent(params.name)
    const category = await Category.findOne({
      title: {
        $regex: new RegExp(`^${decodedName}$`, `i`),
      },
    })

    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 })
    }

    return ResponseBuilder.success(category)
  } catch (error) {
    console.error("Category fetch error: ", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
