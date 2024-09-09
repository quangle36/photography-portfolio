'use client';
import React, { forwardRef } from 'react';
import Image from 'next/image';
import Masonry from 'react-masonry-css';
import 'react-visual-grid/dist/react-visual-grid.css';
import Album from './album';
import { IAlbum } from '@/types/albums';
import useFetchAlbums from '@/hooks/useFetchAlbums';
import Link from 'next/link';

const Albums = ({ albums }: { albums: IAlbum[] }) => {
	const breakpointColumnsObj = {
		default: 2,
		1100: 2,
		700: 2,
		500: 1,
	};
	return (
		<Masonry
			breakpointCols={breakpointColumnsObj}
			className="my-masonry-grid z-[99]"
			columnClassName="w-full my-masonry-grid_column"
		>
			{albums.map((album) => (
				<div key={album._id} className="relative mb-2">
					<Link href={`albums/${album._id}`}>
						<Image
							unoptimized
							priority
							alt=""
							width={500}
							height={500}
							src={album.coverImageSrc}
							className="size-full md:w-[100%] md:h-full object-cover object-top"
						/>
						<div className="flex flex-col absolute top-0 right-0 left-0 bottom-0 bg-black justify-center items-center opacity-0 transition-opacity hover:opacity-50 text-white text-xl font-bold">
							<h1>{album.name}</h1>
							<h2>{album.date}</h2>
						</div>
					</Link>
				</div>
			))}
		</Masonry>
	);
};

export default Albums;
