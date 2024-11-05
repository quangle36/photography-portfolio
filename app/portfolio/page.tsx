import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import CategoryCard from './CategoryCard';
const PortfolioPage = () => {
	const mockData = [
		{
			thumbnailSrc: '/DSC06143.avif',
			title: 'PRE-WEDDING',
			path: '/pre-wedding',
		},
		{
			thumbnailSrc: '/DSC06143.avif',
			title: 'PRE-WEDDING',
			path: '/pre-wedding',
		},
		{
			thumbnailSrc: '/DSC06143.avif',
			title: 'PRE-WEDDING',
			path: '/pre-wedding',
		},
		{
			thumbnailSrc: '/DSC06143.avif',
			title: 'PRE-WEDDING',
			path: '/pre-wedding',
		},
	];
	return (
		<div className="flex flex-col">
			<h1 className="text-3xl text-center font-thin my-8">PORTFOLIO</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
				{mockData.map((item, index) => (
					<CategoryCard key={index} {...item} />
				))}
			</div>
		</div>
	);
};

export default PortfolioPage;
