'use client';
import Image from 'next/image';
import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import BeforeProjectCovers from '@/components/before-project-covers';
import useFetchAlbums from '@/hooks/useFetchAlbums';
import Loading from './loading';
import { Skeleton } from '@/components/ui/skeleton';
import Albums from '@/components/albums';
import Album from '@/components/PhotoThumbnail';
import { IAlbum } from '@/types/albums';
import Hero from './components/Hero';
import Quote from './components/Quote';

export default function Home() {
	const [scrollTop, setScrollTop] = useState(0);
	const [isClient, setIsClient] = useState(false);
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const [loading, setLoading] = useState(false);
	const [albums, setAlbums] = useState<IAlbum[]>([]);
	const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;
	const observer = useRef<IntersectionObserver | null>(null);

	// const { data: albums, loading, error } = useFetchAlbums({ page, limit: 2 });

	const lastAlbumElementRef = useCallback(
		(node: HTMLDivElement | null) => {
			if (loading) return;
			if (observer.current) observer.current.disconnect();
			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && hasMore) {
					setPage((prevPage) => prevPage + 1);
				}
			});
			if (node) observer.current.observe(node);
		},
		[loading, hasMore]
	);

	const fetchAlbums = async () => {
		setLoading(true);
		try {
			const response = await fetch(
				`${apiDomain}/albums?page=${page}&limit=${2}`
			);
			const data = await response.json();

			if (data.data.length === 0) {
				setHasMore(false);
				return;
			}
			setAlbums(data.data);
		} catch (error) {
			console.error('Error fetching albums', error);
		} finally {
			setLoading(false);
		}
	};

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
	useEffect(() => {
		fetchAlbums();
	}, [page]);
	console.log('page', page);
	const projectCoversRef = useRef(null);
	const scrollToSection = (
		sectionRef: React.RefObject<HTMLDivElement>,
		duration: number
	) => {
		if (!sectionRef.current) return;

		const targetPosition = sectionRef.current.offsetTop;
		const startPosition = window.scrollY;
		const distance = targetPosition - startPosition - 100;
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
			<div className="w-full h-full">
				{loading ? (
					<div className="space-y-2 pt-28">
						<Skeleton className="h-4 w-[250px]" />
						<Skeleton className="h-4 w-[200px]" />
					</div>
				) : (
					<div className="w-full h-full">
						<div className="flex flex-col space-y-8">
							<Hero />
							<Quote />
							{loading && (
								<>
									<PromotionSkeleton />
									<PromotionSkeleton />
									<PromotionSkeleton />
								</>
							)}
						</div>
					</div>
				)}
			</div>
		</>
	);
}
function PromotionSkeleton() {
	return (
		<Card className="h-full">
			<div className="relative">
				<Skeleton className="w-full h-[200px] rounded-t-lg" />
				<Skeleton className="absolute top-2 right-2 h-10 w-24" />
			</div>
			<CardHeader>
				<Skeleton className="h-6 w-2/3 mb-2" />
				<Skeleton className="h-4 w-full" />
			</CardHeader>
			<CardContent>
				<Skeleton className="h-8 w-1/3" />
			</CardContent>
			<CardFooter>
				<Skeleton className="h-4 w-1/3" />
			</CardFooter>
		</Card>
	);
}
