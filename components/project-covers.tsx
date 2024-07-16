import React, { forwardRef } from 'react';
import Image from 'next/image';
const ProjectCovers = forwardRef<HTMLDivElement>(function ProjectCovers(
	props,
	ref
) {
	return (
		<div
			ref={ref}
			className="grid grid-cols-[auto_auto] gap-2 h-full z-30 pt-20"
		>
			<Image
				alt=""
				width={500}
				height={500}
				src="https://pro2-bar-s3-cdn-cf3.myportfolio.com/833b2af5f7b30c156a078b140f2ee9ad/47b40bb2-bbdd-4b3f-b7e3-7e015282f524_rw_1920.jpg?h=380dd2e641824be9da013a4527ad7f2e"
				className="w-full h-full bg-red-100 z-30"
			></Image>
			<Image
				alt=""
				width={500}
				height={500}
				src="https://pro2-bar-s3-cdn-cf3.myportfolio.com/833b2af5f7b30c156a078b140f2ee9ad/47b40bb2-bbdd-4b3f-b7e3-7e015282f524_rw_1920.jpg?h=380dd2e641824be9da013a4527ad7f2e"
				className="w-full h-full bg-red-100 z-30"
			></Image>
			<Image
				alt=""
				width={500}
				height={500}
				src="https://pro2-bar-s3-cdn-cf3.myportfolio.com/833b2af5f7b30c156a078b140f2ee9ad/47b40bb2-bbdd-4b3f-b7e3-7e015282f524_rw_1920.jpg?h=380dd2e641824be9da013a4527ad7f2e"
				className="w-full h-full bg-red-100"
			></Image>
			<Image
				alt=""
				width={500}
				height={500}
				src="https://pro2-bar-s3-cdn-cf3.myportfolio.com/833b2af5f7b30c156a078b140f2ee9ad/47b40bb2-bbdd-4b3f-b7e3-7e015282f524_rw_1920.jpg?h=380dd2e641824be9da013a4527ad7f2e"
				className="w-full h-full bg-red-100"
			></Image>
		</div>
	);
});

export default ProjectCovers;
