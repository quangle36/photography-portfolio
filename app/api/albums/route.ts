import cloudinary from '@/config/cloudinary';
import connectDB from '@/config/database';
import cors from '@/lib/cors';
import Album from '@/models/Album';
import { IAlbum } from '@/types/albums';
import { request } from 'http';
import { NextRequest, NextResponse } from 'next/server';

const getCorsHeaders = (origin: string) => {
	// Default options
	const headers = {
		'Access-Control-Allow-Methods': `${process.env.ALLOWED_METHODS}`,
		'Access-Control-Allow-Headers': `${process.env.ALLOWED_HEADERS}`,
		'Access-Control-Allow-Origin': `http://localhost:3001`,
	};

	// If no allowed origin is set to default server origin
	if (!process.env.ALLOWED_ORIGIN || !origin) return headers;

	// If allowed origin is set, check if origin is in allowed origins
	const allowedOrigins = process.env.ALLOWED_ORIGIN.split(',');

	// Validate server origin
	if (allowedOrigins.includes('*')) {
		headers['Access-Control-Allow-Origin'] = 'http://locahost:3001';
	} else if (allowedOrigins.includes(origin)) {
		headers['Access-Control-Allow-Origin'] = origin;
	}

	// Return result
	return headers;
};

export const OPTIONS = async (request: NextRequest) => {
	// Return Response
	return NextResponse.json(
		{},
		{
			status: 200,
			headers: getCorsHeaders(request.headers.get('origin') || ''),
		}
	);
};

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

		//Get query parameters for pagination
		const { searchParams } = new URL(request.url);
		const page = parseInt(searchParams.get('page') || '') || 1;
		const limit = parseInt(searchParams.get('limit') || '') || 10;

		//Calculate how many documents to skip
		const skip = (page - 1) * limit;

		//Fetch albums with pagination
		const albums = await Album.find({}).skip(skip).limit(limit);

		//Get the total number of albums for calculating the total number of page
		const totalAlbums = await Album.countDocuments();
		const totalPages = Math.ceil(totalAlbums / limit);

		return NextResponse.json(
			{
				data: albums,
				meta: {
					page,
					limit,
					totalPages,
					totalAlbums,
				},
			},
			{
				status: 200,
				headers: getCorsHeaders(request.headers.get('origin') || ''),
			}
		);
	} catch (error) {
		return new Response('Error', { status: 500 });
	}
};
