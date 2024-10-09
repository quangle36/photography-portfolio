import Image from 'next/image';
import type { RenderPhotoProps } from 'react-photo-album';

export default function NextJsImage({
	photo,
	imageProps: { alt, title, sizes, onClick },
	wrapperStyle,
}: RenderPhotoProps) {
	return (
		<div style={{ ...wrapperStyle, position: 'relative' }}>
			<Image
				className="object-cover"
				fill
				src={photo}
				placeholder={'blurDataURL' in photo ? 'blur' : undefined}
				{...{ alt, title, sizes, onClick }}
			/>
		</div>
	);
}
