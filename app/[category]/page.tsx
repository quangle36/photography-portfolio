"use client"

import React, { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"

import { ICategory } from "@/types/category"

import { httpGet } from "../services/_req"
import AlbumGrid from "./AlbumGrid"

const CategoryPage = () => {
  const pathname = usePathname()
  const router = useRouter()
  console.log("pathname", pathname)
  const [albums, setAlbums] = useState([])
  const [category, setCategory] = useState<ICategory>({
    thumbnailSrc: "",
    path: "",
    title: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  })
  const categoryName = pathname.split("/")[1]
  // const [data1] = await Promise.all([
  // 	fetchData({
  // 		endpoint: `/albums?category=${pathname?.split('/')[1]}`,
  // 		tags: 'albums',
  // 	}),
  // 	// fetchData({
  // 	// 	endpoint: `/categories/${categoryName}`,
  // 	// 	tags: 'categories',
  // 	// }),
  // ]);
  // console.log('data1', data1);
  // console.log('data2', data2);

  useEffect(() => {
    const fetchData = async () => {
      const [albumsData, categoryData] = await Promise.all([
        httpGet(`/albums?category=${pathname.split("/")[1]}`).then(
          (data) => data.data
        ),
        httpGet(`/categories/${categoryName}`).then((data) => data.data),
      ])
      setAlbums(albumsData.data)
      setCategory(categoryData.data)
    }
    fetchData()
  }, [])

  const handleOnAlbumClick = (path: string) => {
    const newPath = `${pathname}/${path}`
    router.push(newPath)
  }
  return (
    <div className="">
      <h1 className="text-center text-xl md:text-3xl">{category.title}</h1>
      <AlbumGrid albums={albums} onAlbumClick={handleOnAlbumClick} />
    </div>
  )
}

export default CategoryPage
