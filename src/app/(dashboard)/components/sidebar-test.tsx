/** @format */

'use client';

import {
	Sidebar,
	SidebarBody,
	SidebarLink,
} from '@/app/(dashboard)/components/sidebar-aceternity';
import { cn } from '@/lib/utils';
import {
	BarChart3,
	PieChart,
	ScanEye,
	ScatterChart,
	UserRoundCog,
	UtensilsCrossed,
} from 'lucide-react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useState } from 'react';

type SidebarProps = {
	name?: string | null | undefined;
	href?: string;
	slug?: string;
};

export function SidebarDemo(props: SidebarProps) {
	const path = usePathname();
	const searchParams = useSearchParams();
	const selected = searchParams.get('menu') || 'general';
	const openned = searchParams.get('open') || 'true';
	const preSet = searchParams.get('set') || '7days';
	const links = [
		{
			label: 'Painel Admin',
			href: `/settings?menu=admin&open=${openned}&set=${preSet}`,
			icon: (
				<UserRoundCog
					className={` ${
						path.endsWith(props.slug!) ? 'text-zinc-900' : ''
					} text-zinc-200 group-hover:text-zinc-900 h-5 w-5 flex-shrink-0`}
				/>
			),
		},
		{
			label: 'Visão Geral',
			href: `/general?menu=general&open=${openned}&set=${preSet}`,
			icon: (
				<BarChart3
					className={` ${
						path.endsWith('/pipeline') ? 'text-zinc-900' : ''
					} text-zinc-200 group-hover:text-zinc-900 h-5 w-5 flex-shrink-0`}
				/>
			),
		},
		{
			label: 'Restaurantes',
			href: `/restaurant?menu=restaurant&open=${openned}&set=${preSet}`,
			icon: (
				<UtensilsCrossed
					className={` ${
						path.endsWith('/tasks') ? 'text-zinc-900' : ''
					} text-zinc-200 group-hover:text-zinc-900 h-5 w-5 flex-shrink-0`}
				/>
			),
		},
		{
			label: 'Reservas',
			href: `/reservations?menu=reservations&open=${openned}&set=${preSet}`,
			icon: (
				<ScatterChart
					className={` ${
						path.endsWith('/companies') ? 'text-zinc-900' : ''
					} text-zinc-200 group-hover:text-zinc-900 h-5 w-5 flex-shrink-0`}
				/>
			),
		},
		{
			label: 'Operacional',
			href: `/operational?menu=operational&open=${openned}&set=${preSet}`,
			icon: (
				<PieChart
					className={` ${
						path.endsWith('/contacts') ? 'text-zinc-900' : ''
					} text-zinc-200 group-hover:text-zinc-900 h-5 w-5 flex-shrink-0`}
				/>
			),
		},
		{
			label: 'Avaliações',
			href: `/nps?menu=nps&open=${openned}&set=${preSet}`,
			icon: (
				<ScanEye
					className={` ${
						path.endsWith('/quotes') ? 'text-zinc-900' : ''
					} text-zinc-200 group-hover:text-zinc-900 h-5 w-5 flex-shrink-0`}
				/>
			),
		},
	];

	const [open, setOpen] = useState(false);

	return (
		<div
			className={cn(
				' md:flex-row w-fit z-[9999999999999999] overflow-hidden',
				' fixed z-50 left-0  md:border-r-2 border-violet-400 rounded-r-md md:bottom-0 ', // for your use case, use `h-screen` instead of `h-[60vh]`
			)}>
			<Sidebar
				open={open}
				setOpen={setOpen}>
				<SidebarBody className='justify-between gap-10 border-r-2 border-violet-400 rounded-r-md'>
					<div className='flex flex-col flex-1 overflow-y-auto overflow-x-hidden'>
						<div className='mt-8 flex flex-col gap-5'>
							{links.map((link, idx) => (
								<SidebarLink
									key={idx}
									link={link}
								/>
							))}
						</div>
					</div>
				</SidebarBody>
			</Sidebar>
		</div>
	);
}
