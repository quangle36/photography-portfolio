import React from "react"
import Image from "next/image"
import Link from "next/link"

interface ICategoryCardProps {
  thumbnailSrc: string
  path: string
  title: string
}

const CategoryCard = ({ thumbnailSrc, path, title }: ICategoryCardProps) => {
  return (
    <div
      // href={path}
      className="group relative overflow-hidden rounded-md transition-all duration-300 ease-in-out hover:scale-[1.02]"
    >
      <Link href={path}>
        <div className="relative h-[400px] w-full">
          <Image
            alt="Category thumbnail"
            fill
            src={thumbnailSrc}
            className="block size-full object-cover"
            style={{ objectFit: "cover" }}
          />
        </div>

        <div className="absolute inset-x-0 bottom-0 translate-y-full bg-transparent-overlay p-8 text-white transition-all duration-300 ease-in-out group-hover:translate-y-0">
          <p className="text-xl sm:text-base">{title}</p>
        </div>
      </Link>
    </div>
  )
}

export default CategoryCard
