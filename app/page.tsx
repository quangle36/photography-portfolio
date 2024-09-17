'use client';
import Image from 'next/image';
import { RefObject, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import BeforeProjectCovers from '@/components/before-project-covers';
import useFetchAlbums from '@/hooks/useFetchAlbums';
import Loading from './loading';
import { Skeleton } from '@/components/ui/skeleton';
import Albums from '@/components/albums';
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
		<>
			<div className="min-h-screen">
				{loading ? (
					<div className="space-y-2 pt-28">
						<Skeleton className="h-4 w-[250px]" />
						<Skeleton className="h-4 w-[200px]" />
					</div>
				) : (
					<main className="">
						<Hero
							scrollValue={scrollTop}
							scrollToSection={() => {
								scrollToSection(projectCoversRef, 1000);
							}}
						/>
						<BeforeProjectCovers ref={projectCoversRef} />
						<div className="px-8">{<Albums albums={albums} />}</div>
					</main>
				)}
			</div>
		</>
	);
}
