import React from "react"

import { ICategory } from "@/types/category"
import { fetchData } from "@/lib/api"

import CategoryCard from "./CategoryCard"

const PortfolioPage = async () => {
  const response = await fetchData({
    endpoint: "/categories",
    tags: "categories",
  })

  const categories = response.categories as ICategory[]
  return (
    <div className="flex flex-col">
      <h1 className="my-8 text-center text-3xl font-thin">PORTFOLIO</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:gap-8 lg:grid-cols-3">
        {categories?.map((item, index) => (
          <CategoryCard key={index} {...item} />
        ))}
      </div>
    </div>
  )
}

export default PortfolioPage
