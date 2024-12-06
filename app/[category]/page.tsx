"use client"

import React from "react"
import { usePathname, useRouter } from "next/navigation"

import { IAlbum } from "@/types/albums"
import { ICategory } from "@/types/category"

import { useApiSWR } from "../services/_req"
// import { httpGet, useApiSWR } from "../services/_req"
import AlbumGrid from "./AlbumGrid"
import Loading from "./loading"

const CategoryPage = () => {
  const pathname = usePathname()
  const router = useRouter()
  const categoryName = pathname.split("/")[1]
  const albumsQuery = useApiSWR(`/albums?category=${pathname.split("/")[1]}`)
  const categoryQuery = useApiSWR(`/categories/${categoryName}`)
  const category = categoryQuery?.data?.data as ICategory
  const handleOnAlbumClick = (path: string) => {
    const newPath = `${pathname}/${path}`
    router.push(newPath)
  }
  if (albumsQuery?.isLoading || categoryQuery?.isLoading) {
    return <Loading />
  }
  const albums = albumsQuery?.data?.data as IAlbum[]
  return (
    <div className="space-y-4">
      <h1 className="text-center text-xl font-extralight md:text-3xl">
        {category?.title}
      </h1>
      {albums.length > 0 ? (
        <AlbumGrid albums={albums} onAlbumClick={handleOnAlbumClick} />
      ) : (
        <div>Chưa có album nào, quay lại sau bạn nhé!</div>
      )}
    </div>
  )
}

export default CategoryPage
