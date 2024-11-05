import { Schema, model, models } from 'mongoose';
// name: string;
// folderName: string;
// coverImageSrc: string;
// location: string;
// images: string[];
// date: string;
// pathname: string;
// _id?: string;
const AlbumSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		folderName: {
			type: String,
			required: true,
		},
		pathname: {
			type: String,
			required: true,
		},
		coverImageSrc: {
			type: String,
		},
		date: {
			type: String,
			required: true,
		},
		location: {
			type: String,
		},
		images: [
			{
				type: String,
			},
		],
	},
	{
		timestamps: true,
	}
);
const Album = models.Album || model('Album', AlbumSchema);
export default Album;
