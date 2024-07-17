import React from 'react';
import Image from 'next/image';

interface IAlbumProps {
	coverImageSrc: string;
}

const Album = ({ coverImageSrc }: IAlbumProps) => {
	return (
		<span className={`rc-w-300 rc-h-300`}>
			<div className="relative">
				<Image
					unoptimized
					priority
					width={500}
					height={500}
					src={coverImageSrc}
					alt="cover"
					className=" h-[100px] w-[200px]"
				/>

				<div className="absolute top-0 right-0 left-0 bottom-0 bg-black flex justify-center items-center opacity-0 transition-opacity hover:opacity-50 text-white text-xl font-bold">
					Centered Text
				</div>
			</div>
		</span>
	);
};

export default Album;
