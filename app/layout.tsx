import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import MainNav from '@/components/main-nav';

const montserrat = Montserrat({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Minh Quang Photographys | Capturing Moments',
	description:
		'Professional photographer specializing in portraits. Based in Saigon',
	openGraph: {
		title: 'Minh Quang Photographys | Capturing Moments',
		description:
			'Professional photographer specializing in portraits. Based in Saigon',
		images: [
			{
				url: 'https://mqphotographys.com/_next/image?url=%2Flogo-quang-black.png&w=256&q=75',
				width: 1200,
				height: 630,
				alt: 'Minh Quang Photographys Portfolio',
			},
		],
		locale: 'en_US',
		type: 'website',
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={montserrat.className}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<MainNav />
					<main className="h-[calc(100vh-var(--navbar-height))] pt-28">
						{/* <Transition> */}
						{children}
						{/* </Transition> */}
					</main>
				</ThemeProvider>
			</body>
		</html>
	);
}
