import Image from 'next/image';
import React from 'react';

const Hero = () => {
	return (
		<Image
			alt="Hero"
			width={0}
			height={0}
			sizes="100vw"
			src={'/DSC06143.avif'}
			className="backdrop-blur-sm backdrop-brightness-50 object-cover w-screen h-screen"
		/>
	);
};

export default Hero;
