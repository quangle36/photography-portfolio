import { model, models, Schema } from "mongoose"

const AlbumSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    folderName: {
      type: String,
      required: true,
    },
    pathname: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
    },
    date: {
      type: String,
      required: true,
    },
    location: {
      type: String,
    },
    images: [
      {
        type: String,
      },
    ],
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  {
    timestamps: true,
  }
)
const Album = models.Album || model("Album", AlbumSchema)
export default Album
