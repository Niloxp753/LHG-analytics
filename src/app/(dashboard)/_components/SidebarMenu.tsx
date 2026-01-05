/** @format */
'use client';

import logo from '@/assets/images/logo-analytics.png';
import { Button } from '@/components/ui/button';
import { canAccessModule, isAdmin } from '@/lib/access-control';
import { useSessionStore } from '@/stores/session-store';
import {
	BarChart3,
	ChevronsLeft,
	ChevronsRight,
	PieChart,
	ScanEye,
	ScatterChart,
	UserRoundCog,
	UtensilsCrossed,
} from 'lucide-react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import BtnSignOut from '../../../components/btnSingOut';
import BtnSidebarMenu from './BtnSidebarMenu';

export default function SidebarMenu() {
	const searchParams = useSearchParams();
	const selected = searchParams.get('menu') ?? 'general';
	const preSet = searchParams.get('set') ?? '7days';
	const [open, setOpen] = useState(true);
	const user = useSessionStore((s) => s.user);
	const adminAccess = isAdmin(user);
	const canAccessCompany = canAccessModule(user, 'company');
	const canAccessRestaurant = canAccessModule(user, 'restaurant');
	const canAccessBookings = canAccessModule(user, 'bookings');
	const canAccessGovernance = canAccessModule(user, 'governance');

	function handleClick() {
		setOpen(!open);
	}

	return (
		<div className='h-screen z-50 w-fit bg-zinc-950 fixed left-0 p-1 flex flex-col justify-start'>
			<div className='h-24'>
				{open && (
					<a
						href='/'
						className='flex items-center justify-between w-fit mx-auto my-4'>
						<Image
							src={logo}
							alt={'Logo LHG Analytics'}
							width={120}
							height={100}></Image>
					</a>
				)}
			</div>
			<Button
				onClick={() => handleClick()}
				className='cursor-pointer bg-zinc-900 w-fit px-0 py-0 h-full top-0 -right-6 absolute  rounded justify-between hover:bg-zinc-800 transition-all duration-300 ease-linear z-50 text-white'>
				{open ? (
					<ChevronsLeft
						size={20}
						className='mt-auto h-screen '
					/>
				) : (
					<ChevronsRight
						size={20}
						className='mt-auto h-screen'
					/>
				)}
			</Button>
			<div className='flex flex-col justify-between h-full'>
				<div className='text-zinc-100 flex flex-col h-full w-fit gap-5 rounded p-2 mt-10 '>
					<BtnSidebarMenu
						disabled={!adminAccess}
						icon={<UserRoundCog size={20} />}
						selected={selected}
						openned={open}
						href={`/settings?menu=admin&set=${preSet}`}
						role={'admin'}>
						<p>Painel Admin</p>
					</BtnSidebarMenu>

					<BtnSidebarMenu
						disabled={!canAccessCompany}
						icon={<BarChart3 size={20} />}
						selected={selected}
						openned={open}
						href={`/general?menu=general&set=${preSet}`}
						role={'general'}>
						<p>Visão Geral</p>
					</BtnSidebarMenu>
					<BtnSidebarMenu
						disabled={!canAccessRestaurant}
						icon={<UtensilsCrossed size={20} />}
						selected={selected}
						openned={open}
						href={`/restaurant?menu=restaurant&set=${preSet}`}
						role={'restaurant'}>
						<p>Restaurantes</p>
					</BtnSidebarMenu>
					<BtnSidebarMenu
						disabled={!canAccessBookings}
						icon={<ScatterChart size={20} />}
						selected={selected}
						openned={open}
						href={`/reservations?menu=reservations&set=${preSet}`}
						role={'reservations'}>
						<p>Reservas</p>
					</BtnSidebarMenu>
					<BtnSidebarMenu
						disabled={!canAccessGovernance}
						icon={<PieChart size={20} />}
						selected={selected}
						openned={open}
						href={`/operational?menu=operational&set=${preSet}`}
						role={'operational'}>
						<p>Operacional</p>
					</BtnSidebarMenu>
					{/* <BtnSidebarMenu
						disabled
						icon={<ScanEye size={20} />}
						selected={selected}
						openned={open}
						href={`/nps?menu=nps&set=${preSet}`}
						role={'nps'}>
						<p>Avaliações</p>
					</BtnSidebarMenu> */}
					<div className='mt-auto'>
						<BtnSignOut isOpened={open} />
					</div>
				</div>
			</div>
		</div>
	);
}
