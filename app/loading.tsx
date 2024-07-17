'use client';
import { Skeleton } from '@/components/ui/skeleton';
import { ClipLoader } from 'react-spinners';
const Loading = () => {
	const override = {
		display: 'block',
		margin: '100px auto',
	};
	return (
		<main>
			<Skeleton className="object-none w-32 h-32 rounded-full custom-position bg-yellow-200" />
			<Skeleton className="h-10 w-full p-6 mb-4 bg-red-100" />
			<Skeleton className="h-10 w-full p-8 mb-4 bg-red-100" />
		</main>
	);
};

export default Loading;
