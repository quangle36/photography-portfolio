import { Schema, model, models } from 'mongoose';

const AlbumSchema = new Schema(
	{
		name: {
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
