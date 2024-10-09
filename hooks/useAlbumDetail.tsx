'use client';
import { fetchAlbum } from '@/utils/requests';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Photo } from 'react-photo-album';
const breakpoints = [1080, 640, 384, 256, 128, 96, 64, 48];
const useAlbumDetail = () => {
	const pathname = usePathname();
	const id = pathname.split('/')[2].split('-')[1];
	const [album, setAlbum] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		const fetchAlbumData = async () => {
			if (!id) return;
			try {
				const fetchedAlbum = await fetchAlbum(id);
				const photos = fetchedAlbum.images.map(
					(src: any, index: any) =>
						({
							src: src,
							title: `${index + 1}/${fetchedAlbum.images.length}`,

							width: 900,
							height: 900,
							// srcSet: breakpoints.map((breakpoint) => ({
							// 	src: src,
							// 	width: breakpoint,
							// 	height: Math.round((500 / 500) * breakpoint),
							// })),
						} as Photo)
				);
				setAlbum({ photos, title: fetchedAlbum.name });
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		};
		if (album === null) {
			fetchAlbumData();
		}
	}, [id, album]);
	return { photos: album?.photos, title: album?.title };
};

export default useAlbumDetail;
