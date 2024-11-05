import React, { forwardRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IAlbum } from '@/types/albums';

interface IAlbumProps {
	name: string;
	coverImageSrc: string;
	date: string;
	id: string;
}

const PhotoAlbum = ({ name, coverImageSrc, date, id }: IAlbumProps) => {
	const [isHovered, setIsHovered] = useState(false);
	return (
		<Link
			href={``}
			className="relative aspect-square overflow-hidden rounded-lg"
			onMouseEnter={() => {
				setIsHovered(true);
			}}
			onMouseLeave={() => {
				setIsHovered(false);
			}}
		></Link>
	);
};

export default PhotoAlbum;
