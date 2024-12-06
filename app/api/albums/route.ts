import { NextRequest, NextResponse } from "next/server"
import Album from "@/models/Album"
import Category from "@/models/Category"
import { uploadToCloudinary } from "@/utils/serverUpload"

import { IAlbum } from "@/types/albums"
import connectDB from "@/config/database"

export const POST = async (request: NextRequest) => {
  try {
    await connectDB()

    // const sessionUser = await getSessionUser();
    // if (!sessionUser || !sessionUser.userId) {
    // 	return new Response('User ID is required', { status: 401 });
    // }
    const formData = await request.formData()

    //Access all values from images
    const images = (formData.getAll("images") as File[]).filter(
      (image: File) => image.name !== ""
    )
    const coverImage = formData.get("coverImage") as File
    //Create albumData object for database
    const albumData: IAlbum = {
      name: formData.get("name") as string,
      location: formData.get("location") as string,
      images: [],
      date: formData.get("date") as string,
      folderName: formData.get("folderName") as string,
      pathname: formData.get("pathname") as string,
      category: formData.get("category") as string,
    }
    const cloudinaryFolder = `albums/${albumData.folderName}`
    const coverImageData = await uploadToCloudinary(
      coverImage,
      cloudinaryFolder
    )
    //Upload images to Cloudinary
    const uploadPromises = images.map((image) =>
      uploadToCloudinary(image, cloudinaryFolder)
    )
    const uploadedImages = await Promise.all(uploadPromises)
    //Add uploaded images to the propertyData object
    const albumWithImages = {
      ...albumData,
      images: uploadedImages.map((img) => img.urls.avif),
      coverImage: coverImageData.urls.avif,
    }
    const newAlbum = new Album(albumWithImages)
    await newAlbum.save()
    return NextResponse.json(
      {
        message: "Album created successfully",
        album: newAlbum,
      },
      { status: 201 }
    )
  } catch (error) {
    console.log("error", error)
    return new Response("Failed to add album", { status: 500 })
  }
}

export const GET = async (request: NextRequest) => {
  try {
    await connectDB()

    //Get query parameters for pagination
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page") || "") || 1
    const limit = parseInt(searchParams.get("limit") || "") || 10
    const categoryName = searchParams.get("category")
    let query = {}
    if (categoryName) {
      const category = await Category.findOne({
        title: { $regex: new RegExp(`^${categoryName}`, "i") },
      })
      if (category) {
        query = { category: category._id }
      } else {
        return NextResponse.json(
          { error: "Category not found" },
          { status: 404 }
        )
      }
    }

    //Calculate how many documents to skip
    const skip = (page - 1) * limit

    //Fetch albums with pagination
    const albums = await Album.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("category")

    //Get the total number of albums for calculating the total number of page
    const totalAlbums = await Album.countDocuments(query)
    const totalPages = Math.ceil(totalAlbums / limit)

    return NextResponse.json(
      {
        data: albums,
        meta: {
          page,
          limit,
          totalPages,
          totalAlbums,
        },
      },
      {
        status: 200,
      }
    )
  } catch (error) {
    return new Response("Error", { status: 500 })
  }
}
