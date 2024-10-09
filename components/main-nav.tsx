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

const navigationMenus = [
	{
		label: 'Work',
		href: '/',
	},
	{
		label: 'Contact',
		href: '/contact',
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
			className={`px-8 bg-white z-[9997] h-[var(--navbar-height)] fixed top-0 left-0 right-0 transition-all duration-300 ease-in-out ${
				scrolled
					? 'bg-background/80 backdrop-blur-md py-2'
					: 'bg-background py-4'
			} `}
		>
			<NavigationMenuList className="w-screen flex justify-between px-8">
				<NavigationMenuItem className="flex-1 md:flex-none md:hidden">
					<Drawer.Root direction="left">
						<Drawer.Trigger asChild>
							<RxHamburgerMenu size={24} />
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
				<NavigationMenuItem className="hidden md:block space-x-2">
					{navigationMenus.map((menu, index) => (
						<Link key={index} href={menu.href} legacyBehavior passHref>
							<NavigationMenuLink
								className={`hover:opacity-50 bg-transparent font-bold transition-all duration-300 ease-in-out ${
									scrolled ? 'text-xl ' : 'text-2xl'
								} ${pathname === menu.href ? 'text-red-300' : ''}`}
							>
								{menu.label}
							</NavigationMenuLink>
						</Link>
					))}
				</NavigationMenuItem>
				<NavigationMenuItem className="absolute top-[50%] left-[50%] float-none translate-x-[-50%] translate-y-[-50%]">
					<Image
						className={`${
							!scrolled && `mt-4`
						} transition-all duration-300 ease-in-out`}
						src="/logo-quang-black.png"
						width={scrolled ? 124 : 160}
						height={scrolled ? 124 : 160}
						alt="Picture of the author"
					/>
				</NavigationMenuItem>
				<NavigationMenuItem className="hidden md:flex md:space-x-4">
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
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
}

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
