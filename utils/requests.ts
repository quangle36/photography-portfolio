const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;
//Fetch all albums

async function fetchAlbums({ page, limit }: { page: number; limit: number }) {
	try {
		//handle the case where the domain is not available yet
		if (!apiDomain) {
			return [];
		}
		const res = await fetch(`${apiDomain}/albums?page=${page}&limit=${limit}`);
		if (!res.ok) {
			throw new Error('Failed to fetch data');
		}
		return res.json();
	} catch (error) {
		console.log(error);
		return [];
	}
}

//Fetch single album
async function fetchAlbum(id: string) {
	try {
		//handle the case where the domain is not available yet
		if (!apiDomain) {
			return null;
		}
		const res = await fetch(`${apiDomain}/albums/${id}`);
		if (!res.ok) {
			throw new Error('Failed to fetch data');
		}
		return res.json();
	} catch (error) {
		console.log(error);
		return [];
	}
}

export { fetchAlbum, fetchAlbums };
