'use client';

import * as React from 'react';
import Link from 'next/link';
import { RxHamburgerMenu } from 'react-icons/rx';
import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons';
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
const components: { title: string; href: string; description: string }[] = [
	{
		title: 'Alert Dialog',
		href: '/docs/primitives/alert-dialog',
		description:
			'A modal dialog that interrupts the user with important content and expects a response.',
	},
	{
		title: 'Hover Card',
		href: '/docs/primitives/hover-card',
		description:
			'For sighted users to preview content available behind a link.',
	},
	{
		title: 'Progress',
		href: '/docs/primitives/progress',
		description:
			'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
	},
	{
		title: 'Scroll-area',
		href: '/docs/primitives/scroll-area',
		description: 'Visually or semantically separates content.',
	},
	{
		title: 'Tabs',
		href: '/docs/primitives/tabs',
		description:
			'A set of layered sections of content—known as tab panels—that are displayed one at a time.',
	},
	{
		title: 'Tooltip',
		href: '/docs/primitives/tooltip',
		description:
			'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
	},
];

export default function MainNav() {
	return (
		<NavigationMenu className="py-8 fixed top-0 bg-white z-[9997] h-[40px] h-[var(--navbar-height)]">
			<NavigationMenuList className="px-4 md:px-0 w-screen flex justify-between">
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
				<NavigationMenuItem className="hidden md:block">
					<Link href="/" legacyBehavior passHref>
						<NavigationMenuLink className={navigationMenuTriggerStyle()}>
							Work
						</NavigationMenuLink>
					</Link>
					<Link href="/contact" legacyBehavior passHref>
						<NavigationMenuLink className={navigationMenuTriggerStyle()}>
							Contact
						</NavigationMenuLink>
					</Link>
				</NavigationMenuItem>
				<NavigationMenuItem className="absolute top-[50%] left-[50%] float-none translate-x-[-50%] translate-y-[-50%]">
					<Link href="/" legacyBehavior passHref>
						<NavigationMenuLink
							className={`text-3xl ${navigationMenuTriggerStyle()}  font-normal`}
						>
							MQ Photography
						</NavigationMenuLink>
					</Link>
				</NavigationMenuItem>
				<NavigationMenuItem className="hidden md:block">
					<Link
						target="_blank"
						href="https://www.instagram.com/quangle36"
						legacyBehavior
						passHref
					>
						<NavigationMenuLink className={navigationMenuTriggerStyle()}>
							<FaInstagram size={24} />
						</NavigationMenuLink>
					</Link>
					<Link
						target="_blank"
						href="https://www.facebook.com/quangmle36/"
						legacyBehavior
						passHref
					>
						<NavigationMenuLink className={navigationMenuTriggerStyle()}>
							<FaFacebook size={24} />
						</NavigationMenuLink>
					</Link>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
}

const ListItem = React.forwardRef<
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
