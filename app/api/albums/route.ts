import cloudinary from '@/config/cloudinary';
import connectDB from '@/config/database';
import Album from '@/models/Album';
import { IAlbum } from '@/types/albums';
import { request } from 'http';
import { NextRequest } from 'next/server';

export const POST = async (request: NextRequest) => {
	try {
		await connectDB();

		// const sessionUser = await getSessionUser();
		// if (!sessionUser || !sessionUser.userId) {
		// 	return new Response('User ID is required', { status: 401 });
		// }
		const formData = await request.formData();

		//Access all values from images
		const images = (formData.getAll('images') as File[]).filter(
			(image: File) => image.name !== ''
		);

		//Create albumData object for database
		const albumData: IAlbum = {
			name: formData.get('name') as string,
			coverImageSrc: formData.get('coverImageSrc') as string,
			location: formData.get('location') as string,
			images: [],
			date: formData.get('date') as string,
			folderName: formData.get('folderName') as string,
			pathname: formData.get('pathname') as string,
		};

		//Upload images to Cloudinary
		const imageUploadPromises = [];
		for (const image of images) {
			const imageBuffer = await image.arrayBuffer();
			const imageArray = Array.from(new Uint8Array(imageBuffer));
			const imageData = Buffer.from(imageArray);

			//Convert the image data to base64
			const imageBase64 = imageData.toString('base64');

			//Make request to upload to Cloudinary
			const result = await cloudinary.uploader.upload(
				`data:image/png;base64,${imageBase64}`,
				{
					folder: `photo-portfolio/albums/${albumData.folderName}`,
				}
			);
			imageUploadPromises.push(result.secure_url);
		}
		//Wait for all images to upload
		const uploadedImages = await Promise.all(imageUploadPromises);
		//Add uploaded images to the propertyData object
		albumData.images = uploadedImages;
		albumData.coverImageSrc = uploadedImages[0];
		const newAlbum = new Album(albumData);
		await newAlbum.save();

		// return Response.redirect(
		// 	`${process.env.NEXTAUTH_URL}/properties/${newAlbum._id}`
		// );
		return new Response(JSON.stringify({ message: 'Success' }), {
			status: 200,
		});
	} catch (error) {
		console.log('error', error);
		return new Response('Failed to add album', { status: 500 });
	}
};

export const GET = async (request: NextRequest) => {
	try {
		await connectDB();
		const albums = await Album.find({});

		return new Response(JSON.stringify(albums), { status: 200 });
	} catch (error) {
		return new Response('Error', { status: 500 });
	}
};
