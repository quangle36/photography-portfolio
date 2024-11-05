import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface ICategoryCardProps {
	thumbnailSrc: string;
	path: string;
	title: string;
}

const CategoryCard = ({ thumbnailSrc, path, title }: ICategoryCardProps) => {
	return (
		<div
			// href={path}
			className="relative overflow-hidden rounded-md transition-all ease-in-out duration-300 hover:scale-[1.02] group"
		>
			<Link href={path}>
				<Image
					alt="Category thumbnail"
					width={2}
					height={300}
					sizes="100vw"
					src={thumbnailSrc}
					className="w-full h-full object-cover block"
				/>
				<div className="absolute bottom-0 left-0 right-0 bg-transparent-overlay p-8 text-white translate-y-[100%] transition-all duration-300 ease-in-out group-hover:translate-y-0">
					<p className="text-xl sm:text-base">{title}</p>
				</div>
			</Link>
		</div>
	);
};

export default CategoryCard;
