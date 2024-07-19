'use client';
// import Hero from '@/components/hero';
import ProjectCovers from '@/components/project-covers';
import Image from 'next/image';
import { RefObject, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import BeforeProjectCovers from '@/components/before-project-covers';
import useFetchAlbums from '@/hooks/useFetchAlbums';
import Loading from './loading';
const Hero = dynamic(() => import('@/components/hero'), { ssr: false });
export default function Home() {
	const [scrollTop, setScrollTop] = useState(0);
	const [isClient, setIsClient] = useState(false);
	const { data: albums, loading, error } = useFetchAlbums();

	const handleScroll = () => {
		setScrollTop(window.scrollY);
	};
	useEffect(() => {
		setIsClient(true);
	}, []);
	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	const projectCoversRef = useRef(null);
	const scrollToSection = (
		sectionRef: React.RefObject<HTMLDivElement>,
		duration: number
	) => {
		if (!sectionRef.current) return;

		const targetPosition = sectionRef.current.offsetTop;
		const startPosition = window.scrollY;
		console.log('targetPosition', targetPosition);
		console.log('startPosition', startPosition);
		const distance = targetPosition - startPosition - 64;
		let startTime: number | null = null;

		const ease = (t: number, b: number, c: number, d: number) => {
			t /= d;
			return c * t * t + b; // Quadratic easing function for slower scroll
		};

		const animation = (currentTime: number) => {
			if (startTime === null) startTime = currentTime;
			const timeElapsed = currentTime - startTime;
			const run = ease(timeElapsed, startPosition, distance, duration);
			window.scrollTo(0, run);
			if (timeElapsed < duration) requestAnimationFrame(animation);
		};

		requestAnimationFrame(animation);
	};

	return (
		<div>
			<div className="bg-gray-100 min-h-screen">
				<main className="">
					<Hero
						scrollValue={scrollTop}
						scrollToSection={() => {
							scrollToSection(projectCoversRef, 1000);
						}}
					/>

					<BeforeProjectCovers ref={projectCoversRef} />
					{<ProjectCovers albums={albums} />}
				</main>
			</div>
		</div>
	);
}
