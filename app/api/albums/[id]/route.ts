import connectDB from '@/config/database';
import Album from '@/models/Album';

export const GET = async (request: any, { params }: any) => {
	try {
		await connectDB();
		const property = await Album.findById(params.id);

		if (!property) {
			return new Response('Property Not Found', {
				status: 404,
			});
		}

		return new Response(JSON.stringify(property), { status: 200 });
	} catch (error) {
		return new Response('Error', { status: 500 });
	}
};
