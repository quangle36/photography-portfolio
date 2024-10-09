'use client';
import { fetchAlbums } from '@/utils/requests';
import { useEffect, useState } from 'react';

const useFetchAlbums = () => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const albums = await fetchAlbums();
				setData(albums);
			} catch (err: any) {
				setError(err);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	return { data, loading, error };
};

export default useFetchAlbums;
