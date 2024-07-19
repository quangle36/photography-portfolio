import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import MainNav from '@/components/main-nav';
import Transition from './transition';

const montserrat = Montserrat({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'MQ Photography',
	description:
		' Discover the art of photography through my lens and get inspired by the beauty of the world. Based in Saigon, available for commissions and collaborations.',
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
					<main className="h-[calc(100vh-var(--navbar-height))] pt-20">
						{/* <Transition> */}
						{children}
						{/* </Transition> */}
					</main>
				</ThemeProvider>
			</body>
		</html>
	);
}
