'use client';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React, { RefObject, useEffect, useRef, useState } from 'react';
import { RiArrowDownWideLine, RiPhoneFill, RiMailFill } from 'react-icons/ri';
const Hero = ({
	scrollValue,
	scrollToSection,
}: {
	scrollValue: number;
	scrollToSection: () => void;
}) => {
	const [opacity, setOpacity] = useState(1);
	// let opacity = Math.max(1 - scrollValue / 250, 0);
	const handleClickArrowDown = () => {
		scrollToSection();
	};

	useEffect(() => {
		if (window.scrollY > 300) {
			setOpacity(0);
		}
	}, [window.scrollY]);
	useEffect(() => {
		setOpacity(Math.max(1 - scrollValue / 150, 0));
	}, [scrollValue]);
	return (
		<div className="h-[300px] w-full z-[98]">
			<div
				className="flex flex-col items-center fixed top-52 md:top-40 left-[50%] translate-x-[-50%] translate-y-[-50%] space-y-2 z-10 "
				style={{ opacity }}
			>
				<div className="text-3xl font-semibold w-fit text-nowrap">
					Hi, I&apos;m Minh Quang
				</div>
				<h2 className="font-light">
					I&apos;m a freelance photographer based in Saigon 🇻🇳.
				</h2>
				<div>
					<Link className="flex items-center space-x-2" href={'tel:0865240929'}>
						<RiPhoneFill />
						<span>0865240929</span>
					</Link>
					<Link
						href={'mailto:quangleminh9404@gmail.com'}
						className="flex items-center space-x-2"
					>
						<RiMailFill />
						<span>quangleminh9404@gmail.com</span>
					</Link>
				</div>

				<RiArrowDownWideLine
					onClick={() => {
						handleClickArrowDown();
					}}
					size={32}
				/>
			</div>
		</div>
	);
};

export default Hero;
