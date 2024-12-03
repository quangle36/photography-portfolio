import { Types } from "mongoose"

import { ICategory } from "./category"

export interface IAlbum {
  name: string
  folderName: string
  coverImage?: string
  location: string
  images: string[]
  date: string
  pathname: string
  _id?: string
  category: Types.ObjectId | ICategory | string
}
