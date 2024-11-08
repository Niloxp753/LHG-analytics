/** @format */

'use client';

import {
	Sidebar,
	SidebarBody,
	SidebarLink,
} from '@/app/(dashboard)/_components/sidebar-aceternity';
import BtnSignOut from '@/components/btnSingOut';
import { User } from '@/http/user/getUsers';
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

export function SidebarDemo({ user }: { user?: User }) {
	const path = usePathname();
	const searchParams = useSearchParams();
	const selected = searchParams.get('menu') || 'general';
	const openned = searchParams.get('open') || 'true';
	const preSet = searchParams.get('set') || '7days';

	const links = [
		{
			label: 'Painel Admin',
			href: `/settings?menu=admin&open=${openned}&set=${preSet}`,
			slug: '/settings',
			icon: (
				<UserRoundCog
					className={` ${
						path.endsWith('/settings') ? 'text-zinc-900' : ''
					} text-zinc-200 group-hover:text-zinc-900 h-5 w-5 flex-shrink-0`}
				/>
			),
		},
		{
			label: 'Visão Geral',
			href: `/general?menu=${selected}&open=${openned}&set=${preSet}`,
			slug: '/general',
			icon: (
				<BarChart3
					className={` ${
						path.endsWith('/general') ? 'text-zinc-900' : ''
					} text-zinc-200 group-hover:text-zinc-900 h-5 w-5 flex-shrink-0`}
				/>
			),
		},
		{
			label: 'Restaurantes',
			slug: '/restaurant',
			href: `/restaurant?menu=${selected}&open=${openned}&set=${preSet}`,
			icon: (
				<UtensilsCrossed
					className={` ${
						path.endsWith('/restaurant') ? 'text-zinc-900' : ''
					} text-zinc-200 group-hover:text-zinc-900 h-5 w-5 flex-shrink-0`}
				/>
			),
		},
		{
			label: 'Reservas',
			slug: '/reservations',
			href: `/reservations?menu=${selected}s&open=${openned}&set=${preSet}`,
			icon: (
				<ScatterChart
					className={` ${
						path.endsWith('/reservations') ? 'text-zinc-900' : ''
					} text-zinc-200 group-hover:text-zinc-900 h-5 w-5 flex-shrink-0`}
				/>
			),
		},
		{
			label: 'Operacional',
			slug: '/operational',
			href: `/operational?menu=${selected}&open=${openned}&set=${preSet}`,
			icon: (
				<PieChart
					className={` ${
						path.endsWith('/operational') ? 'text-zinc-900' : ''
					} text-zinc-200 group-hover:text-zinc-900 h-5 w-5 flex-shrink-0`}
				/>
			),
		},
		{
			label: 'Avaliações',
			slug: '/nps',
			href: `/nps?menu=nps&open=${openned}&set=${preSet}`,
			icon: (
				<ScanEye
					className={` ${
						path.endsWith('/nps') ? 'text-zinc-900' : ''
					} text-zinc-200 group-hover:text-zinc-900 h-5 w-5 flex-shrink-0`}
				/>
			),
		},
	];

	let newLinks: typeof links = [];

	if (user?.role !== 'ADMIN') {
		newLinks = links.slice(1);
	}

	const [open, setOpen] = useState(false);

	return (
		<div
			className={cn(
				' lg:flex-row w-fit z-[9999999999999999] overflow-hidden',
				' fixed z-50 left-0  lg:border-r-2 border-violet-400 rounded-r-md lg:bottom-0 ', // for your use case, use `h-screen` instead of `h-[60vh]`
			)}>
			<Sidebar
				open={open}
				setOpen={setOpen}>
				<SidebarBody className='justify-between gap-10 border-r-2 border-violet-400 rounded-r-md'>
					<div className='flex flex-col flex-1 overflow-y-auto overflow-x-hidden'>
						<div className='mt-8 flex flex-col gap-5'>
							{user?.role !== 'ADMIN'
								? newLinks.map((link, idx) => {
										return (
											<SidebarLink
												key={idx}
												link={link}
											/>
										);
								  })
								: links.map((link, idx) => {
										return (
											<SidebarLink
												key={idx}
												link={link}
											/>
										);
								  })}
						</div>
					</div>
					<BtnSignOut isOpened={'true'} />
				</SidebarBody>
			</Sidebar>
		</div>
	);
}
