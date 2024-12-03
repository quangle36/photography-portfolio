"use client"

import Hero from "./components/Hero"
import Quote from "./components/Quote"

export default function Home() {
  return (
    <>
      <div className="size-full">
        <div className="size-full">
          <div className="flex flex-col space-y-8">
            <Hero />
            <Quote />
          </div>
        </div>
      </div>
    </>
  )
}
