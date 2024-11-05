import Link from 'next/link';
import { Facebook, Instagram, Youtube, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
	return (
		<footer id="footer" className="bg-gray-900 text-gray-300 py-12">
			<div className="container mx-auto px-4">
				<nav className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
					<div>
						<Link href="/" className="block mb-2 hover:text-white">
							HOME
						</Link>
						<Link href="/portfolio" className="block mb-2 hover:text-white">
							PORTFOLIO
						</Link>
						<Link href="/blog" className="block mb-2 hover:text-white">
							BLOG
						</Link>
					</div>
					<div>
						<Link href="/1-on-1-class" className="block mb-2 hover:text-white">
							1 ON 1 CLASS
						</Link>
						<Link href="/make-up" className="block mb-2 hover:text-white">
							MAKE UP
						</Link>
						<Link href="/contact" className="block mb-2 hover:text-white">
							CONTACT
						</Link>
					</div>
					<div>
						<Link href="/reviews" className="block mb-2 hover:text-white">
							REVIEWS
						</Link>
						<Link href="/faq" className="block mb-2 hover:text-white">
							FAQ
						</Link>
					</div>
				</nav>
				<div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-700 pt-8">
					<p className="text-sm mb-4 md:mb-0">
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
							<Facebook className="w-5 h-5 hover:text-white" />
						</a>
						<a
							href="https://www.instagram.com/quangle36/"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Instagram"
						>
							<Instagram className="w-5 h-5 hover:text-white" />
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
}
