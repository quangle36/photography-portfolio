import Link from "next/link"
import { Camera } from "lucide-react"

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white text-black">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50 blur-sm"
        style={{
          backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 space-y-6 text-center">
        <Camera className="mx-auto size-24 text-black/80" />
        <h1 className="text-6xl font-bold">404</h1>
        <h2 className="text-3xl font-light">Oops! This shot is out of frame</h2>
        <p className="mx-auto max-w-md text-xl text-white/80">
          The page you&apos;re looking for seems to have wandered off.
          Let&apos;s get you back to the gallery.
        </p>
        <Link
          href="/"
          className="bg-opacity/90 inline-block rounded-full bg-white px-6 py-2 font-semibold text-black transition-colors duration-300"
        >
          Return to Home
        </Link>
      </div>
    </div>
  )
}
