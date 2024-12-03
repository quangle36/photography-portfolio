import React from "react"
import Image from "next/image"

const Hero = () => {
  return (
    <Image
      alt="Hero"
      width={0}
      height={0}
      sizes="100vw"
      src={"/DSC06143.avif"}
      className="h-screen w-screen object-cover backdrop-blur-sm backdrop-brightness-50"
    />
  )
}

export default Hero
