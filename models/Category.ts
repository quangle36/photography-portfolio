import { ICategory } from '@/types/category';
import { model, models, Schema } from 'mongoose';

const CategorySchema = new Schema<ICategory>(
	{
		thumbnailSrc: {
			type: String,
			required: [true, 'Thumbnail source is required'],
			trim: true,
		},
		path: {
			type: String,
			required: [true, 'Path is required'],
			unique: true,
			trim: true,
		},
		title: {
			type: String,
			required: [true, 'Title is required'],
			trim: true,
		},
	},
	{
		timestamps: true,
	}
);

export const Category = models.Category || model('Category', CategorySchema);
export default Category;
