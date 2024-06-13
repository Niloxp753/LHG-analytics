/** @format */
'use client';

import {
	BarChart3,
	ChevronLeft,
	ChevronRight,
	PieChart,
	ScanEye,
	ScatterChart,
	UserRoundCog,
	UtensilsCrossed,
} from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import BtnSignOut from '../../../components/btnSingOut';
import BtnSidebarMenu from './BtnSidebarMenu';
import logo from '@/assets/images/logo-analytics.png';
import Image from 'next/image';

export default function SidebarMenu() {
	const searchParams = useSearchParams();
	const selected = searchParams.get('menu') || 'general';
	const openned = searchParams.get('open') || 'true';
	const preSet = searchParams.get('set') || '7days';

	return (
		<div className='h-screen w-fit bg-zinc-900 fixed left-0 p-2 flex flex-col justify-start'>
			<div className='h-24'>
				{openned === 'true' ? (
					<a
						href='/'
						className='flex items-center justify-between w-fit mx-auto my-4'>
						<Image
							src={logo}
							alt={'Logo LHG Analytics'}
							width={120}
							height={100}></Image>
					</a>
				) : null}
			</div>
			<Link
				href={`${
					openned == 'true'
						? `?menu=${selected}&open=false&set=${preSet}`
						: `?menu=${selected}&open=true&set=${preSet}`
				}`}
				className='cursor-pointer bg-zinc-950 w-fit top-0 right-0 absolute p-1 rounded justify-between hover:bg-zinc-700 transition-all duration-300 ease-linear z-50 text-white'>
				{openned == 'true' ? <ChevronLeft /> : <ChevronRight />}
			</Link>
			<div className='flex flex-col justify-between h-full'>
				<div className='text-zinc-100 flex flex-col h-full w-fit gap-5 rounded p-3 mt-10 '>
					<BtnSidebarMenu
						icon={<UserRoundCog />}
						selected={selected}
						openned={openned}
						href={`/settings?menu=admin&open=${openned}&set=${preSet}`}
						role={'admin'}>
						<p>Painel Admin</p>
					</BtnSidebarMenu>
					<BtnSidebarMenu
						icon={<BarChart3 />}
						selected={selected}
						openned={openned}
						href={`/general?menu=general&open=${openned}&set=${preSet}`}
						role={'general'}>
						<p>Visão Geral</p>
					</BtnSidebarMenu>
					<BtnSidebarMenu
						icon={<UtensilsCrossed />}
						selected={selected}
						openned={openned}
						href={`/restaurant?menu=restaurant&open=${openned}&set=${preSet}`}
						role={'restaurant'}>
						<p>Restaurantes</p>
					</BtnSidebarMenu>
					<BtnSidebarMenu
						icon={<ScatterChart />}
						selected={selected}
						openned={openned}
						href={`/reservations?menu=reservations&open=${openned}&set=${preSet}`}
						role={'reservations'}>
						<p>Reservas</p>
					</BtnSidebarMenu>
					<BtnSidebarMenu
						icon={<PieChart />}
						selected={selected}
						openned={openned}
						href={`/operational?menu=operational&open=${openned}&set=${preSet}`}
						role={'operational'}>
						<p>Operacional</p>
					</BtnSidebarMenu>
					<BtnSidebarMenu
						icon={<ScanEye />}
						selected={selected}
						openned={openned}
						href={`/nps?menu=nps&open=${openned}&set=${preSet}`}
						role={'nps'}>
						<p>Avaliações</p>
					</BtnSidebarMenu>
					<div className='mt-auto'>
						<BtnSignOut isOpened={openned} />
					</div>
				</div>
			</div>
		</div>
	);
}
