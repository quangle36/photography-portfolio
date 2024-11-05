'use client';
import { fetchAlbums } from '@/utils/requests';
import { useEffect, useState } from 'react';

const useFetchAlbums = ({ page, limit }: { page: number; limit: number }) => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const albums = await fetchAlbums({ page, limit });
				setData(albums.data);
			} catch (err: any) {
				setError(err);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [page]);

	return { data, loading, error };
};

export default useFetchAlbums;
