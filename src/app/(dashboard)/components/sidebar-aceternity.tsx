/** @format */
'use client';
import { cn } from '@/lib/utils';
import { IconMenu2, IconX } from '@tabler/icons-react';
import { AnimatePresence, motion } from 'framer-motion';
import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import React, { createContext, useContext, useState } from 'react';

interface Links {
	label: string | null | undefined;
	href: string;
	icon?: React.JSX.Element | React.ReactNode;
	slug: string;
}

interface SidebarContextProps {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	animate: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(
	undefined,
);

export const useSidebar = () => {
	const context = useContext(SidebarContext);
	if (!context) {
		throw new Error('useSidebar must be used within a SidebarProvider');
	}
	return context;
};

export const SidebarProvider = ({
	children,
	open: openProp,
	setOpen: setOpenProp,
	animate = true,
}: {
	children: React.ReactNode;
	open?: boolean;
	setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
	animate?: boolean;
}) => {
	const [openState, setOpenState] = useState(false);

	const open = openProp !== undefined ? openProp : openState;
	const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

	return (
		<SidebarContext.Provider value={{ open, setOpen, animate: animate }}>
			{children}
		</SidebarContext.Provider>
	);
};

export const Sidebar = ({
	children,
	open,
	setOpen,
	animate,
}: {
	children: React.ReactNode;
	open?: boolean;
	setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
	animate?: boolean;
}) => {
	return (
		<SidebarProvider
			open={open}
			setOpen={setOpen}
			animate={animate}>
			{children}
		</SidebarProvider>
	);
};

export const SidebarBody = (props: React.ComponentProps<typeof motion.div>) => {
	return (
		<>
			<DesktopSidebar {...props} />
			<MobileSidebar {...(props as React.ComponentProps<'div'>)} />
		</>
	);
};

export const DesktopSidebar = ({
	className,
	children,
	...props
}: React.ComponentProps<typeof motion.div>) => {
	const { open, setOpen, animate } = useSidebar();
	return (
		<>
			<motion.div
				className={cn(
					'md:h-[85vh] 2xl:h-[90vh]  px-4 py-4 hidden md:flex md:flex-col bg-zinc-900 text-zinc-100 w-[300px] flex-shrink-0',
					className,
				)}
				animate={{
					width: animate ? (open ? '300px' : '70px') : '300px',
				}}
				onMouseEnter={() => setOpen(true)}
				onMouseLeave={() => setOpen(false)}
				{...props}>
				{children}
			</motion.div>
		</>
	);
};

export const MobileSidebar = ({
	className,
	children,
	...props
}: React.ComponentProps<'div'>) => {
	const { open, setOpen } = useSidebar();
	return (
		<>
			<div
				className={cn(
					'h-fit  flex flex-row md:hidden z-50  items-center justify-between bg-transparent w-full',
				)}
				{...props}>
				<div className='w-full text-zinc-950 p-5 z-50 '>
					<IconMenu2
						className='text-zinc-50 size-8'
						onClick={() => setOpen(!open)}
					/>
				</div>
				<AnimatePresence>
					{open && (
						<motion.div
							initial={{ x: '-100%', opacity: 0 }}
							animate={{ x: 0, opacity: 1 }}
							exit={{ x: '-100%', opacity: 0 }}
							transition={{
								duration: 0.3,
								ease: 'easeInOut',
							}}
							className={cn(
								'fixed h-full w-full inset-0 bg-zinc-950  p-10 z-[100] flex flex-col justify-between',
								className,
							)}>
							<div
								className='absolute right-10 top-10 z-50 text-zinc-200'
								onClick={() => setOpen(!open)}>
								<IconX />
							</div>
							{children}
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</>
	);
};

export const SidebarLink = ({
	link,
	className,
	...props
}: {
	link?: Links;
	className?: string;
	props?: LinkProps;
}) => {
	const { open, animate } = useSidebar();
	const path = usePathname();

	return (
		<Link
			href={link?.href!}
			className={cn(
				className,
				`flex items-center justify-start gap-2 px-2 group  group/sidebar py-2 hover:bg-violet-400 rounded ${
					path.endsWith(link?.slug!) ? 'bg-violet-400' : ''
				}`,
			)}
			{...props}>
			{link?.icon}

			<motion.span
				animate={{
					display: animate ? (open ? 'inline-block' : 'none') : 'inline-block',
					opacity: animate ? (open ? 1 : 0) : 1,
				}}
				className={` ${
					path.endsWith(link?.slug!) ? 'text-zinc-950' : ''
				} text-zinc-200 group-hover/sidebar:translate-x-1 transition-all duration-150 whitespace-pre inline-block !p-0 !m-0 ease-linear group group-hover:text-zinc-950 group-hover:font-medium text-base`}>
				{link?.label}
			</motion.span>
		</Link>
	);
};
