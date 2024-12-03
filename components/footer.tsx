import Link from "next/link"
import { Facebook, Instagram } from "lucide-react"

export default function Footer() {
  return (
    <footer id="footer" className="bg-gray-900 py-12 text-gray-300">
      <div className="container mx-auto px-4">
        <nav className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <Link href="/" className="mb-2 block hover:text-white">
              HOME
            </Link>
            <Link href="/portfolio" className="mb-2 block hover:text-white">
              PORTFOLIO
            </Link>
            <Link href="/blog" className="mb-2 block hover:text-white">
              BLOG
            </Link>
          </div>
          <div>
            <Link href="/1-on-1-class" className="mb-2 block hover:text-white">
              1 ON 1 CLASS
            </Link>
            <Link href="/make-up" className="mb-2 block hover:text-white">
              MAKE UP
            </Link>
            <Link href="/contact" className="mb-2 block hover:text-white">
              CONTACT
            </Link>
          </div>
          <div>
            <Link href="/reviews" className="mb-2 block hover:text-white">
              REVIEWS
            </Link>
            <Link href="/faq" className="mb-2 block hover:text-white">
              FAQ
            </Link>
          </div>
        </nav>
        <div className="flex flex-col items-center justify-between border-t border-gray-700 pt-8 md:flex-row">
          <p className="mb-4 text-sm md:mb-0">
            &copy; {new Date().getFullYear()} MINH QUANG photography. All rights
            reserved.
          </p>
          <div className="flex space-x-4">
            <a
              href="https://web.facebook.com/quangmle36/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <Facebook className="size-5 hover:text-white" />
            </a>
            <a
              href="https://www.instagram.com/quangle36/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <Instagram className="size-5 hover:text-white" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
