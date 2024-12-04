"use client"

import React, { useMemo } from "react"
import Image from "next/image"

import { IAlbum } from "@/types/albums"
import { Masonry } from "@/app/components/Masonry"
import NotFound from "@/app/not-found"
import { useApiSWR } from "@/app/services/_req"

import Loading from "../loading"

interface Item {
  id: number
  src: string
  alt: string
  width: number
  height: number
}
const AlbumDetail = ({
  params,
}: {
  params: { album: string; category: string }
}) => {
  const { data, isLoading, error } = useApiSWR(`/album/${params.album}`)

  const albumDetail = data?.data as IAlbum
  const generateItems = useMemo((): Item[] => {
    if (!albumDetail?.images) return []
    return albumDetail.images.map((src, i) => {
      const width = 300
      const height = Math.floor(Math.random() * (600 - 400 + 1) + 400) // Random height between 400 and 600
      return {
        id: i + 1,
        src,
        alt: `Image ${i + 1}`,
        width,
        height,
      }
    })
  }, [albumDetail?.images])
  if (isLoading) {
    return <Loading />
  }
  if (error) {
    return <NotFound />
  }
  return (
    <div className="">
      <h1 className="text-center text-xl md:text-3xl">{}</h1>
      <Masonry
        items={generateItems}
        columnWidth={300}
        gap={16}
        renderItem={(item) => (
          <div
            style={{ width: item.width, height: item.height }}
            className="relative mt-4 overflow-hidden rounded-lg shadow-md"
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${btoa(
                `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${item.width} ${item.height}">
                  <rect width="100%" height="100%" fill="#f3f4f6"/>
                  <text x="50%" y="50%" font-family="Arial" font-size="24" fill="#9ca3af" dominant-baseline="middle" text-anchor="middle">
                    ${item.width}x${item.height}
                  </text>
                </svg>`
              )}`}
              className="h-auto w-full object-cover"
            />
          </div>
        )}
      />
    </div>
  )
}

export default AlbumDetail
