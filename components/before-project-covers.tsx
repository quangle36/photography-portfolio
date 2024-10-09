'use client';
import React, { forwardRef } from 'react';
import Image from 'next/image';
import Album from './album';
import { IAlbum } from '@/types/albums';
import useFetchAlbums from '@/hooks/useFetchAlbums';
const BeforeProjectCovers = forwardRef<HTMLDivElement>(function ProjectCovers(
	props,
	ref
) {
	return <div className="" ref={ref}></div>;
});

export default BeforeProjectCovers;
