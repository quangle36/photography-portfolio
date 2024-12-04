"use client"

import React from "react"
import { usePathname, useRouter } from "next/navigation"

import { ICategory } from "@/types/category"

import { useApiSWR } from "../services/_req"
// import { httpGet, useApiSWR } from "../services/_req"
import AlbumGrid from "./AlbumGrid"
import Loading from "./loading"

const CategoryPage = () => {
  const pathname = usePathname()
  const router = useRouter()
  const categoryName = pathname.split("/")[1]
  const albumsQuery = useApiSWR(
    `/albums?category=${pathname.split("/")[1]}`
  ).data
  const categoryQuery = useApiSWR(`/categories/${categoryName}`).data
  const category = categoryQuery?.data as ICategory
  const handleOnAlbumClick = (path: string) => {
    const newPath = `${pathname}/${path}`
    router.push(newPath)
  }
  if (albumsQuery?.isLoading || categoryQuery?.isLoading) {
    return <Loading />
  }
  return (
    <div className="">
      <h1 className="text-center text-xl md:text-3xl">{category?.title}</h1>
      <AlbumGrid albums={albumsQuery?.data} onAlbumClick={handleOnAlbumClick} />
    </div>
  )
}

export default CategoryPage
