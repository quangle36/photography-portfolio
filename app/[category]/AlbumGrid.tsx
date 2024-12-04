import React from "react"
import Image from "next/image"

import { IAlbum } from "@/types/albums"

interface AlbumGridProps {
  albums: IAlbum[]
  onAlbumClick: (path: string) => void
}

const AlbumGrid: React.FC<AlbumGridProps> = ({
  albums,
  onAlbumClick,
}): React.ReactNode => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {albums?.map((album) => {
        return (
          <div
            onClick={() => onAlbumClick(album.pathname)}
            key={album._id}
            className="group relative h-[300px] w-full cursor-pointer overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:-translate-y-1"
          >
            <Image
              fill
              alt={album.pathname}
              src={album.coverImage || ""}
              className="size-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="absolute inset-x-0 bottom-0 translate-y-full p-4 text-white transition-transform duration-300 group-hover:translate-y-0">
              <h3 className="text-lg font-semibold">{album.name}</h3>
              <p className="text-sm opacity-90">{album.date}</p>
              <p className="mt-1 text-sm">{album.images.length} photos</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default AlbumGrid
