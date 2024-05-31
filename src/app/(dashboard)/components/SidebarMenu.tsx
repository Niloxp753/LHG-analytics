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

export default function SidebarMenu() {
	const searchParams = useSearchParams();
	const selected = searchParams.get('menu') || 'general';
	const openned = searchParams.get('open') || 'true';

	return (
		<div className='h-screen w-fit bg-zinc-900 absolute left-0 p-2 flex flex-col justify-between'>
			<Link
				href={`${
					openned == 'true'
						? `?menu=${selected}&open=false`
						: `?menu=${selected}&open=true`
				}`}
				className='cursor-pointer bg-zinc-950 w-fit top-0 right-0 absolute p-1 rounded justify-between hover:bg-zinc-700 transition-all duration-300 ease-linear z-50 text-white'>
				{openned == 'true' ? <ChevronLeft /> : <ChevronRight />}
			</Link>
			<div className='text-zinc-100 flex flex-col w-fit gap-5 rounded-xl p-3 mt-10'>
				<Link
					href={`/settings?menu=admin&open=${openned}`}
					className={`p-3 flex gap-4 ${
						selected == 'admin'
							? 'bg-violet-400 hover:bg-violet-500 text-zinc-900'
							: 'bg-zinc-950 hover:bg-zinc-700 text-zinc-50'
					}   rounded justify-between text-lg font-semibold transition-all duration-300 ease-linear`}>
					{openned == 'true' ? <p> Painel Admin</p> : null}

					<UserRoundCog />
				</Link>
				<Link
					href={`/general?menu=general&open=${openned}`}
					className={`p-3 flex gap-4 ${
						selected == 'general'
							? 'bg-violet-400 hover:bg-violet-500 text-zinc-900'
							: 'bg-zinc-950 hover:bg-zinc-700 text-zinc-50'
					}   rounded justify-between text-lg font-semibold transition-all duration-300 ease-linear`}>
					{openned == 'true' ? <p>Visão Geral</p> : null}

					<BarChart3 />
				</Link>
				<Link
					href={`/restaurant?menu=restaurant&open=${openned}`}
					className={`p-3 flex gap-4 ${
						selected == 'restaurant'
							? 'bg-violet-400 hover:bg-violet-500 text-zinc-900'
							: 'bg-zinc-950 hover:bg-zinc-700 text-zinc-50'
					}   rounded justify-between text-lg font-semibold transition-all duration-300 ease-linear`}>
					{openned == 'true' ? <p>Restaurantes</p> : null}

					<UtensilsCrossed />
				</Link>

				<Link
					href={`/reservations?menu=reservations&open=${openned}`}
					className={`p-3 flex gap-4 ${
						selected == 'reservations'
							? 'bg-violet-400 hover:bg-violet-500 text-zinc-900'
							: 'bg-zinc-950 hover:bg-zinc-700 text-zinc-50'
					}   rounded justify-between text-lg font-semibold transition-all duration-300 ease-linear`}>
					{openned == 'true' ? <p>Reservas</p> : null}

					<ScatterChart />
				</Link>
				<Link
					href={`/operational?menu=operational&open=${openned}`}
					className={`p-3 flex gap-4 ${
						selected == 'operational'
							? 'bg-violet-400 hover:bg-violet-500 text-zinc-900'
							: 'bg-zinc-950 hover:bg-zinc-700 text-zinc-50'
					}   rounded justify-between text-lg font-semibold transition-all duration-300 ease-linear`}>
					{openned == 'true' ? <p>Operacional</p> : null}

					<PieChart />
				</Link>
				<Link
					href={`/nps?menu=nps&open=${openned}`}
					className={`p-3 flex gap-4 ${
						selected == 'nps'
							? 'bg-violet-400 hover:bg-violet-500 text-zinc-900'
							: 'bg-zinc-950 hover:bg-zinc-700 text-zinc-50'
					}   rounded justify-between text-lg font-semibold transition-all duration-300 ease-linear`}>
					{openned == 'true' ? <p>Avaliações</p> : null}
					<ScanEye />
				</Link>
			</div>
			<BtnSignOut isOpened={openned} />
		</div>
	);
}
