export const getImageDimensions = async (
	file: File
): Promise<{ width: number; height: number }> => {
	return new Promise((resolve, reject) => {
		const img = new Image();
		const objectUrl = URL.createObjectURL(file);

		img.onload = () => {
			URL.revokeObjectURL(objectUrl);
			resolve({ width: img.width, height: img.height });
		};

		img.onerror = () => {
			URL.revokeObjectURL(objectUrl);
			reject(new Error('Failed to load image'));
		};

		img.src = objectUrl;
	});
};

export const calculateOptimalWidth = (originalWidth: number): number => {
	// Define breakpoints for responsive images
	const breakpoints = [640, 750, 828, 1080, 1200, 1920];

	// Find the smallest breakpoint that's larger than the original width
	const optimalWidth =
		breakpoints.find((bp) => bp >= originalWidth) ||
		breakpoints[breakpoints.length - 1];

	return Math.min(originalWidth, optimalWidth);
};
