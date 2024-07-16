import React from 'react';
import Image from 'next/image';
const Album = () => {
	return (
		<div className="relative w-64 h-64">
			<Image
				width={500}
				height={500}
				src="https://via.placeholder.com/500"
				alt="Placeholder Image"
				className="w-full h-full object-cover"
			/>
			<div className="absolute top-0 right-0 left-0 bottom-0 bg-black flex justify-center items-center opacity-0 transition-opacity hover:opacity-50 text-white text-xl font-bold">
				Centered Text
			</div>
		</div>
	);
};

export default Album;
