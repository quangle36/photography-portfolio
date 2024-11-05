'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';

interface Promotion {
	id: number;
	title: string;
	description: string;
	discount: string;
	expiryDate: string;
	imageUrl: string;
}

export default function PromotionPage() {
	const [promotions, setPromotions] = useState<Promotion[]>([]);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const observer = useRef<IntersectionObserver | null>(null);

	const lastPromotionElementRef = useCallback(
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
	console.log('page', page);
	const fetchPromotions = async () => {
		setLoading(true);
		try {
			const response = await fetch(
				`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=1`
			);
			const data = await response.json();

			if (data.length === 0) {
				setHasMore(false);
				return;
			}

			const newPromotions: Promotion[] = data.map((item: any) => ({
				id: item.id,
				title: `Promotion ${item.id}`,
				description: item.title,
				discount: `${Math.floor(Math.random() * 50) + 10}% OFF`,
				expiryDate: new Date(
					Date.now() + Math.random() * 10 * 24 * 60 * 60 * 1000
				).toLocaleDateString(),
				imageUrl: `/placeholder.svg?height=200&width=400&text=Promotion+${item.id}`,
			}));

			setPromotions((prev) => [...prev, ...newPromotions]);
		} catch (error) {
			console.error('Error fetching promotions:', error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchPromotions();
	}, [page]);

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-6">Current Promotions</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{promotions.map((promotion, index) => (
					<div
						key={promotion.id}
						ref={
							index === promotions.length - 1 ? lastPromotionElementRef : null
						}
					>
						<Card className="h-full">
							<div className="relative">
								<Image
									src={promotion.imageUrl}
									alt={promotion.title}
									width={400}
									height={200}
									className="w-full h-[200px] object-cover rounded-t-lg"
								/>
								<Button className="absolute top-2 right-2 bg-primary text-primary-foreground hover:bg-primary/90">
									Claim Offer
								</Button>
							</div>
							<CardHeader>
								<CardTitle>{promotion.title}</CardTitle>
								<CardDescription>{promotion.description}</CardDescription>
							</CardHeader>
							<CardContent>
								<p className="text-2xl font-bold text-primary">
									{promotion.discount}
								</p>
							</CardContent>
							<CardFooter>
								<p className="text-sm text-muted-foreground">
									Expires: {promotion.expiryDate}
								</p>
							</CardFooter>
						</Card>
					</div>
				))}
				{loading && (
					<>
						<PromotionSkeleton />
						<PromotionSkeleton />
						<PromotionSkeleton />
					</>
				)}
			</div>
			{!hasMore && (
				<p className="text-center mt-6 text-muted-foreground">
					No more promotions to load.
				</p>
			)}
		</div>
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
