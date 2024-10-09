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
	// const breakpointColumnsObj = {
	// 	default: 2,
	// 	1100: 2,
	// 	700: 2,
	// 	500: 2,
	// };
	return (
		<div
			// breakpointCols={breakpointColumnsObj}
			className="grid grid-cols-1 md:grid-cols-2 z-[99] gap-4"
			// columnClassName="my-masonry-grid_column"
		>
			{albums.map((album) => (
				<>
					<Album
						key={album.name}
						name={album.name}
						coverImageSrc={album.coverImageSrc}
						date={album.date}
						id={album._id || ''}
					/>
				</>
			))}
		</div>
	);
};

export default Albums;
