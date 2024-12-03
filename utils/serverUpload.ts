import { calculateOptimalWidth } from "@/utils/imageProcessing"
import Sharp from "sharp"

import cloudinary from "@/config/cloudinary"

const CHUNK_SIZE = 5 * 1024 * 1024
const MAX_FILE_SIZE = 25 * 1024 * 1024 //25MB
const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/avif"]

export interface UploadResult {
  urls: {
    avif: string
    webp: string
    jpg: string
  }
  publicId: string
  width: number
  height: number
  format: string
  originalSize: number
  optimizedSize: number
  compressRatio: string
}

async function compressImage(
  buffer: Buffer,
  mimeType: string
): Promise<Buffer> {
  const sharp = Sharp(buffer)

  //Get image metadata
  const metadata = await sharp.metadata()

  //Calculate target dimensions while maintaining aspect ratio
  const MAX_DIMENSION = 2048
  let resizeOptions = {}

  if (metadata.width && metadata.height) {
    if (metadata.width > MAX_DIMENSION || metadata.height > MAX_DIMENSION) {
      resizeOptions = {
        width: metadata.width > MAX_DIMENSION ? MAX_DIMENSION : undefined,
        height: metadata.height > MAX_DIMENSION ? MAX_DIMENSION : undefined,
        fit: "inside",
      }
    }
  }

  switch (mimeType) {
    case "image/jpeg":
    case "image/jpg":
      return await sharp
        .resize(resizeOptions)
        .jpeg({ quality: 90, mozjpeg: true })
        .toBuffer()
    case "image/png":
      return await sharp
        .resize(resizeOptions)
        .png({ quality: 90, compressionLevel: 9 })
        .toBuffer()
    case "image/avif":
      return await sharp.resize(resizeOptions).avif({ quality: 90 }).toBuffer()
    default:
      return buffer
  }
}

export async function uploadToCloudinary(
  file: File,
  folder: string = "uploads"
): Promise<UploadResult> {
  // Validation
  if (file.size > MAX_FILE_SIZE) {
    throw new Error(
      `File size exceeds ${MAX_FILE_SIZE / (1024 * 1024)}MB limit`
    )
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error(
      `Invalid file type. Allowed types: ${ALLOWED_TYPES.join(", ")}`
    )
  }

  // Process image
  const imageBuffer = await file.arrayBuffer()
  const originalBuffer = Buffer.from(imageBuffer)
  const compressedBuffer = await compressImage(originalBuffer, file.type)
  const dimensions = await Sharp(compressedBuffer).metadata()
  const optimalWidth = calculateOptimalWidth(dimensions.width || 0)
  const imageBase64 = compressedBuffer.toString("base64")

  // Upload to Cloudinary
  const result = await cloudinary.uploader.upload(
    `data:${file.type};base64,${imageBase64}`,
    {
      folder: `photo-portfolio/${folder}`,
      resource_type: "auto",
      chunk_size: CHUNK_SIZE,
      timeout: 120000,
      format: "avif",
      transformation: [
        { width: optimalWidth, crop: "limit" },
        { quality: "auto" },
      ],
      eager: [
        {
          width: optimalWidth,
          format: "webp",
          quality: "auto",
        },
        {
          format: "jpg",
          quality: "auto",
        },
      ],
      eager_async: true,
      eager_notification_url: process.env.CLOUDINARY_NOTIFICATION_URL,
    }
  )

  return {
    urls: {
      avif: result.secure_url,
      webp: result.eager[0].secure_url,
      jpg: result.eager[1].secure_url,
    },
    publicId: result.public_id,
    width: result.width,
    height: result.height,
    format: result.format,
    originalSize: file.size,
    optimizedSize: result.bytes,
    compressRatio:
      (((file.size - result.bytes) / file.size) * 100).toFixed(2) + "%",
  }
}
