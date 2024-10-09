import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IAlbum } from '@/types/albums';

interface IAlbumProps {
	name: string;
	coverImageSrc: string;
	date: string;
	id: string;
}

const Album = ({ name, coverImageSrc, date, id }: IAlbumProps) => {
	return (
		<div className="">
			<Link className="relative" href={`albums/${name}-${id}`}>
				<Image
					loading="lazy"
					alt="Album"
					width={200}
					height={300}
					src={coverImageSrc}
					className="object-cover w-[500px] h-[500px]"
				/>
				<div className=" flex flex-col absolute top-0 right-0 left-0 bottom-0 bg-black justify-center items-center opacity-0 transition-opacity hover:opacity-50 text-white text-xl font-bold">
					<h1>{name}</h1>
					<h2>{date}</h2>
				</div>
			</Link>
		</div>
	);
};

export default Album;
