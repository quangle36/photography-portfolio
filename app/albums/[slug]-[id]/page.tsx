'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import { useParams } from 'next/navigation';
import { fetchAlbum } from '@/utils/requests';
// import optional lightbox plugins
import useAlbumDetail from '@/hooks/useAlbumDetail';
import NextJsImage from '@/components/nextjs-image';

const AlbumsDetail = () => {
	const { id } = useParams<{ id: string }>();
	const [album, setAlbum] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [index, setIndex] = React.useState(-1);
	const { photos, title } = useAlbumDetail();
	return (
		<div className="px-4 md:px-16 space-y-4">
			<div className="font-semibold text-3xl w-full text-center">{title}</div>
		</div>
	);
};

export default AlbumsDetail;
