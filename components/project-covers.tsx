'use client';
import React, { forwardRef } from 'react';
import Image from 'next/image';
import Masonry from 'react-masonry-css';
import 'react-visual-grid/dist/react-visual-grid.css';
import Album from './album';
import { IAlbum } from '@/types/albums';
import useFetchAlbums from '@/hooks/useFetchAlbums';
import Link from 'next/link';
// const albums = [
// 	{ id: 1, title: 'Album 1', cover: 'cover1.jpg' },
// 	{ id: 2, title: 'Album 2', cover: 'cover2.jpg' },
// 	{ id: 3, title: 'Album 3', cover: 'cover3.jpg' },
// 	{ id: 1, title: 'Album 1', cover: 'cover1.jpg' },
// 	{ id: 2, title: 'Album 2', cover: 'cover2.jpg' },
// 	{ id: 3, title: 'Album 3', cover: 'cover3.jpg' },
// 	{ id: 1, title: 'Album 1', cover: 'cover1.jpg' },
// 	{ id: 2, title: 'Album 2', cover: 'cover2.jpg' },
// 	{ id: 3, title: 'Album 3', cover: 'cover3.jpg' },
// 	// Add more albums as needed
// ];
const images = [
	{
		id: 1,
		src: 'https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1470&amp;q=80',
		alt: 'Image 1',
		content:
			'Consectetur elit amet est libero nullam adipiscing nunc at condimentum sit enim id lorem tincidunt libero euismod sagittis auctor dolor vel curabitur nec vitae odio viverra in ipsum',
	},
	{
		id: 2,
		src: 'https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1470&amp;q=80',
		alt: 'Image 2',
		content:
			'Consectetur id sagittis atlorem nec vitae enim dolor auctor adipiscing nullam sit id libero curabitur condimentum enim vitae est est amet at libero a odio adipiscing auctor nunc dolor consectetur laoreet nunc dolor elit condimentum sit vel euismod libero tincidunt euismod amet sagittis nullam viverra',
	},
	{
		id: 3,
		src: 'https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1470&amp;q=80',
		alt: 'Image 3',
		content:
			'Curabitur est in sit enim dolor odio libero elit vitae amet sagittis dolor id auctor a tincidunt at libero nullam laoreet nec euismod ipsum id viverra condimentum nunc lorem consectetur',
	},
	{
		id: 4,
		src: 'https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1470&amp;q=80',
		alt: 'Image 4',
		content:
			'Amet nunc elit tincidunt atlorem odio nec ipsum in libero enim id at elit nec dolor laoreet adipiscing sit auctor curabitur nullam auctor dolor vel euismod id sit laoreet lorem vitae condimentum enim vel a euismod viverra id libero dolor libero a viverra nunc est sagittis in id ipsum amet consectetur est adipiscing tincidunt consectetur vitae condimentum',
	},
	{
		id: 4,
		src: 'https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1470&amp;q=80',
		alt: 'Image 4',
		content:
			'Amet nunc elit tincidunt atlorem odio nec ipsum in libero enim id at elit nec dolor laoreet adipiscing sit auctor curabitur nullam auctor dolor vel euismod id sit laoreet lorem vitae condimentum enim vel a euismod viverra id libero dolor libero a viverra nunc est sagittis in id ipsum amet consectetur est adipiscing tincidunt consectetur vitae condimentum',
	},
	{
		id: 4,
		src: 'https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1470&amp;q=80',
		alt: 'Image 4',
		content:
			'Amet nunc elit tincidunt atlorem odio nec ipsum in libero enim id at elit nec dolor laoreet adipiscing sit auctor curabitur nullam auctor dolor vel euismod id sit laoreet lorem vitae condimentum enim vel a euismod viverra id libero dolor libero a viverra nunc est sagittis in id ipsum amet consectetur est adipiscing tincidunt consectetur vitae condimentum',
	},
	{
		id: 4,
		src: 'https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1470&amp;q=80',
		alt: 'Image 4',
		content:
			'Amet nunc elit tincidunt atlorem odio nec ipsum in libero enim id at elit nec dolor laoreet adipiscing sit auctor curabitur nullam auctor dolor vel euismod id sit laoreet lorem vitae condimentum enim vel a euismod viverra id libero dolor libero a viverra nunc est sagittis in id ipsum amet consectetur est adipiscing tincidunt consectetur vitae condimentum',
	},
	{
		id: 4,
		src: 'https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1470&amp;q=80',
		alt: 'Image 4',
		content:
			'Amet nunc elit tincidunt atlorem odio nec ipsum in libero enim id at elit nec dolor laoreet adipiscing sit auctor curabitur nullam auctor dolor vel euismod id sit laoreet lorem vitae condimentum enim vel a euismod viverra id libero dolor libero a viverra nunc est sagittis in id ipsum amet consectetur est adipiscing tincidunt consectetur vitae condimentum',
	},
	{
		id: 4,
		src: 'https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1470&amp;q=80',
		alt: 'Image 4',
		content:
			'Amet nunc elit tincidunt atlorem odio nec ipsum in libero enim id at elit nec dolor laoreet adipiscing sit auctor curabitur nullam auctor dolor vel euismod id sit laoreet lorem vitae condimentum enim vel a euismod viverra id libero dolor libero a viverra nunc est sagittis in id ipsum amet consectetur est adipiscing tincidunt consectetur vitae condimentum',
	},
	{
		id: 4,
		src: 'https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1470&amp;q=80',
		alt: 'Image 4',
		content:
			'Amet nunc elit tincidunt atlorem odio nec ipsum in libero enim id at elit nec dolor laoreet adipiscing sit auctor curabitur nullam auctor dolor vel euismod id sit laoreet lorem vitae condimentum enim vel a euismod viverra id libero dolor libero a viverra nunc est sagittis in id ipsum amet consectetur est adipiscing tincidunt consectetur vitae condimentum',
	},
	{
		id: 4,
		src: 'https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1470&amp;q=80',
		alt: 'Image 4',
		content:
			'Amet nunc elit tincidunt atlorem odio nec ipsum in libero enim id at elit nec dolor laoreet adipiscing sit auctor curabitur nullam auctor dolor vel euismod id sit laoreet lorem vitae condimentum enim vel a euismod viverra id libero dolor libero a viverra nunc est sagittis in id ipsum amet consectetur est adipiscing tincidunt consectetur vitae condimentum',
	},
	// Add more images as needed
];

const ProjectCovers = ({ albums }: { albums: IAlbum[] }) => {
	const breakpointColumnsObj = {
		default: 2,
		1100: 2,
		700: 2,
		500: 1,
	};
	return (
		// <div className="grid grid-cols-3 gap-2 h-full z-30 pt-20">
		// 	{albums.map((album: IAlbum) => {
		// 		return <Album key={album._id} coverImageSrc={album.coverImageSrc} />;
		// 	})}
		// </div>
		<Masonry
			breakpointCols={breakpointColumnsObj}
			className="flex w-full my-masonry-grid z-[99]"
			columnClassName="my-masonry-grid_column"
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

export default ProjectCovers;
