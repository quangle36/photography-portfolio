'use client';

import { forwardRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { RxHamburgerMenu } from 'react-icons/rx';
import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons';
import Image from 'next/image';
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { FaInstagram, FaFacebook, FaArrowDown } from 'react-icons/fa';
import { Drawer } from 'vaul';
import { usePathname } from 'next/navigation';
import HoverDropdown from './ui/hover-dropdown';
import { Button } from './ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card';

const ListItem = forwardRef<
	React.ElementRef<'a'>,
	React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
	return (
		<li>
			<NavigationMenuLink asChild>
				<a
					ref={ref}
					className={cn(
						'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
						className
					)}
					{...props}
				>
					<div className="text-sm font-medium leading-none">{title}</div>
					<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
						{children}
					</p>
				</a>
			</NavigationMenuLink>
		</li>
	);
});
ListItem.displayName = 'ListItem';

const navigationMenus = [
	{
		label: 'Portfolio',
		href: '/portfolio',
		content: (
			<ul className="py-2 grid gap-3 grid-cols-1">
				<ListItem className="text-center" href="/docs" title="Beauty">
					{/* Re-usable components built using Radix UI and Tailwind CSS. */}
				</ListItem>
				<ListItem
					className="text-center"
					href="/docs/installation"
					title="Event"
				>
					{/* How to install dependencies and structure your app. */}
				</ListItem>
				<ListItem
					className="text-center"
					href="/docs/primitives/typography"
					title="Outdoor"
				>
					{/* Styles for headings, paragraphs, lists...etc */}
				</ListItem>
			</ul>
		),
	},
	{
		label: 'Contact',
		href: '/contact',
	},
	{
		label: 'Makeup',
		href: '/makeup',
		content: (
			<ul className="grid gap-3 p-4 md:w-[200px] lg:w-[300px] grid-cols-1 text-xl">
				<ListItem href="/docs" title="Beauty">
					{/* Re-usable components built using Radix UI and Tailwind CSS. */}
				</ListItem>
				<ListItem href="/docs/installation" title="Event">
					{/* How to install dependencies and structure your app. */}
				</ListItem>
				<ListItem href="/docs/primitives/typography" title="Outdoor">
					{/* Styles for headings, paragraphs, lists...etc */}
				</ListItem>
			</ul>
		),
	},
	{
		label: 'More',
		href: '/more',
	},
];

export default function MainNav() {
	const [scrolled, setScrolled] = useState(false);
	const pathname = usePathname();

	useEffect(() => {
		const handleScroll = () => {
			const isScrolled = window.scrollY > 20;
			if (isScrolled !== scrolled) {
				setScrolled(isScrolled);
			}
		};

		window.addEventListener('scroll', handleScroll, { passive: true });

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [scrolled]);

	return (
		<NavigationMenu
			id="header"
			className={`bg-white z-[9997] h-[var(--navbar-height)] fixed top-0 left-0 right-0 transition-all duration-300 ease-in-out ${
				scrolled
					? 'bg-background/80 backdrop-blur-md py-2'
					: 'bg-background py-4'
			} ob`}
		>
			<NavigationMenuList className="w-screen flex justify-between px-8">
				<NavigationMenuItem className="flex-1 md:flex-none md:hidden">
					<Drawer.Root direction="left">
						<Drawer.Trigger asChild>
							{/* <RxHamburgerMenu size={24} /> */}
						</Drawer.Trigger>
						<Drawer.Portal>
							<Drawer.Overlay className="fixed inset-0 bg-black/40 z-[9998]" />
							<Drawer.Content className="bg-white flex flex-col rounded-t-[10px] h-full w-3/4 mt-24 fixed bottom-0 left-0 z-[9999] border-none">
								<div className="p-4 bg-white w-1/2 h-full">
									<div className="max-w-md mx-auto">
										<Drawer.Title className="font-medium mb-4">
											Unstyled drawer for React.
										</Drawer.Title>
										<p className="text-zinc-600 mb-2">
											This component can be used as a replacement for a Dialog
											on mobile and tablet devices.
										</p>
										<p className="text-zinc-600 mb-8">
											It uses{' '}
											<a
												href="https://www.radix-ui.com/docs/primitives/components/dialog"
												className="underline"
												target="_blank"
											>
												Radix&rsquo;s Dialog primitive
											</a>{' '}
											under the hood and is inspired by{' '}
											<a
												href="https://twitter.com/devongovett/status/1674470185783402496"
												className="underline"
												target="_blank"
											>
												this tweet.
											</a>
										</p>
									</div>
								</div>
							</Drawer.Content>
						</Drawer.Portal>
					</Drawer.Root>
				</NavigationMenuItem>

				<div className="flex w-full justify-around">
					<NavigationMenuList className="h-full flex items-center">
						{navigationMenus.slice(0, 2).map((menu, index) => (
							// <Link key={index} href={menu.href} legacyBehavior passHref>
							// 	<NavigationMenuLink
							// 		className={`hover:opacity-50 bg-transparent font-bold transition-all duration-300 ease-in-out ${
							// 			scrolled ? 'text-xl ' : 'text-2xl'
							// 		} ${pathname === menu.href ? 'text-red-300' : ''}`}
							// 	>
							// 		{menu.label}
							// 	</NavigationMenuLink>
							// </Link>
							<NavigationMenuItem key={index} className="hidden md:block">
								<Link href={menu.href}>
									<HoverCard openDelay={300}>
										<HoverCardTrigger asChild>
											<Button
												className={`border-none shadow-none hover:bg-transparent hover:opacity-50 bg-transparent font-bold transition-all duration-300 ease-in-out ${
													scrolled ? 'text-lg ' : 'text-xl'
												} ${pathname === menu.href ? 'text-red-300' : ''}`}
												variant="outline"
											>
												{menu.label}
											</Button>
										</HoverCardTrigger>
										<HoverCardContent
											side={'bottom'}
											align={'start'}
											className="p-0"
										>
											{menu.content}
										</HoverCardContent>
									</HoverCard>
								</Link>
							</NavigationMenuItem>
						))}
					</NavigationMenuList>

					<NavigationMenuItem className="">
						<Image
							className={`${
								!scrolled && `mt-4`
							} transition-all duration-300 ease-in-out`}
							src="/logo-quang-black.png"
							width={scrolled ? 28 : 36}
							height={scrolled ? 28 : 36}
							alt="Picture of the author"
						/>
					</NavigationMenuItem>
					<NavigationMenuList className="h-full flex items-center">
						{navigationMenus.slice(0, 2).map((menu, index) => (
							// <Link key={index} href={menu.href} legacyBehavior passHref>
							// 	<NavigationMenuLink
							// className={`hover:opacity-50 bg-transparent font-bold transition-all duration-300 ease-in-out ${
							// 	scrolled ? 'text-xl ' : 'text-2xl'
							// } ${pathname === menu.href ? 'text-red-300' : ''}`}
							// 	>
							// 		{menu.label}
							// 	</NavigationMenuLink>
							// </Link>

							<NavigationMenuItem key={index} className="hidden md:block">
								<HoverCard openDelay={0} closeDelay={0}>
									<HoverCardTrigger asChild>
										<Button
											className={`border-none shadow-none hover:bg-transparent hover:opacity-50 bg-transparent font-bold transition-all duration-300 ease-in-out ${
												scrolled ? 'text-lg ' : 'text-xl'
											} ${pathname === menu.href ? 'text-red-300' : ''}`}
											variant="outline"
										>
											{menu.label}
										</Button>
									</HoverCardTrigger>
									<HoverCardContent
										side={'bottom'}
										align={'start'}
										className="w-80"
									>
										asdasjdk
									</HoverCardContent>
								</HoverCard>
							</NavigationMenuItem>
						))}
					</NavigationMenuList>
				</div>

				{/* <NavigationMenuItem className="hidden md:flex md:space-x-4">
					<Link
						target="_blank"
						href="https://www.instagram.com/quangle36"
						legacyBehavior
						passHref
					>
						<FaInstagram size={24} />
					</Link>
					<Link
						target="_blank"
						href="https://www.facebook.com/quangmle36/"
						legacyBehavior
						passHref
					>
						<FaFacebook size={24} />
					</Link>
				</NavigationMenuItem> */}
			</NavigationMenuList>
		</NavigationMenu>
		// <nav className="h-[var(--navbar-height)] fixed top-0 w-screen"></nav>
	);
}
