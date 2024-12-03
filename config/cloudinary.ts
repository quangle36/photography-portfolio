import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Define optimal transformation settings for different image types
export const getOptimalTransformation = (fileType: string) => {
  const baseTransformation = {
    format: "avif",
    quality: "auto:best",
    fetch_format: "avif",
    dpr: "2.0",
    flags: "preserve_transparency",
  }

  // Adjust settings based on image type and size
  switch (fileType) {
    case "image/jpeg":
    case "image/jpg":
      return {
        ...baseTransformation,
        quality: "auto:eco", // Better compression for JPEG
        chroma_subsampling: "4:2:0",
      }
    case "image/png":
      return {
        ...baseTransformation,
        quality: "auto:good", // Preserve quality for PNG
        compression: "low",
      }
    default:
      return baseTransformation
  }
}

export default cloudinary
