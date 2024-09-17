'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import PhotoAlbum from 'react-photo-album';

import Fancybox from '@/components/fancybox';
import { useParams } from 'next/navigation';
import { fetchAlbum } from '@/utils/requests';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
// import optional lightbox plugins
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import 'yet-another-react-lightbox/plugins/captions.css';
import useFetchAlbums from '@/hooks/useFetchAlbums';
import useAlbumDetail from '@/hooks/useAlbumDetail';
import NextJsImage from '@/components/nextjs-image';

const AlbumsDetail = () => {
	const { id } = useParams<{ id: string }>();
	const [album, setAlbum] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [index, setIndex] = React.useState(-1);
	const { albumDetail } = useAlbumDetail();
	return (
		<div className="">
			<div>title</div>
			<PhotoAlbum
				layout="rows"
				photos={albumDetail}
				targetRowHeight={500}
				onClick={({ index: current }) => setIndex(current)}
				renderPhoto={NextJsImage}
				spacing={8}
			/>

			<Lightbox
				slides={albumDetail}
				open={index >= 0}
				index={index}
				close={() => setIndex(-1)}
				// enable optional lightbox plugins
				plugins={[Fullscreen, Slideshow, Thumbnails, Zoom, Captions]}
			/>
		</div>
	);
};

export default AlbumsDetail;
