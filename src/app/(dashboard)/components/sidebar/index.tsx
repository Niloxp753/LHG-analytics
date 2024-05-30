/** @format */
'use client';

import {
	BarChart3,
	ChevronFirst,
	ChevronLast,
	PieChart,
	ScanEye,
	ScatterChart,
	UserRoundCog,
	UtensilsCrossed,
} from 'lucide-react';
import Link from 'next/link';
import BtnSignOut from '../../../../components/btnSingOut';
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function Sidebar() {
	const [isOpen, setIsOpen] = useState(true);
	const searchParams = useSearchParams();
	const selected = searchParams.get('menu');

	function handleToggle(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
		e.stopPropagation();
		e.preventDefault();
		if (isOpen) {
			setIsOpen(false);
		} else {
			setIsOpen(true);
		}
	}

	return (
		<div className='h-screen w-fit bg-zinc-900 absolute left-0 p-2 flex flex-col justify-between'>
			<span
				onClick={(e) => handleToggle(e)}
				className='cursor-pointer bg-zinc-950 w-fit top-0 right-0 absolute p-1 rounded justify-between hover:bg-zinc-800 transition-all duration-300 ease-linear z-50 text-white'>
				{isOpen ? <ChevronFirst /> : <ChevronLast />}
			</span>
			<div className='text-zinc-100 flex flex-col w-fit gap-5 rounded-xl p-3 mt-10'>
				<Link
					href={'/settings?menu=admin'}
					className={`p-3 flex gap-4 ${
						selected == 'admin'
							? 'bg-violet-400 hover:bg-violet-500 text-zinc-900'
							: 'bg-zinc-950 hover:bg-zinc-800 text-zinc-50'
					}   rounded justify-between text-lg font-semibold transition-all duration-300 ease-linear`}>
					{isOpen ? <p> Painel Admin</p> : null}

					<UserRoundCog />
				</Link>
				<Link
					href={'/general?menu=general'}
					className={`p-3 flex gap-4 ${
						selected == 'general'
							? 'bg-violet-400 hover:bg-violet-500 text-zinc-900'
							: 'bg-zinc-950 hover:bg-zinc-800 text-zinc-50'
					}   rounded justify-between text-lg font-semibold transition-all duration-300 ease-linear`}>
					{isOpen ? <p>Visão Geral</p> : null}

					<BarChart3 />
				</Link>
				<Link
					href={'/restaurant?menu=restaurant'}
					className={`p-3 flex gap-4 ${
						selected == 'restaurant'
							? 'bg-violet-400 hover:bg-violet-500 text-zinc-900'
							: 'bg-zinc-950 hover:bg-zinc-800 text-zinc-50'
					}   rounded justify-between text-lg font-semibold transition-all duration-300 ease-linear`}>
					{isOpen! ? <p>Restaurantes</p> : null}

					<UtensilsCrossed />
				</Link>

				<Link
					href={'/reservations?menu=reservations'}
					className={`p-3 flex gap-4 ${
						selected == 'reservations'
							? 'bg-violet-400 hover:bg-violet-500 text-zinc-900'
							: 'bg-zinc-950 hover:bg-zinc-800 text-zinc-50'
					}   rounded justify-between text-lg font-semibold transition-all duration-300 ease-linear`}>
					{isOpen! ? <p>Reservas</p> : null}

					<ScatterChart />
				</Link>
				<Link
					href={'/operational?menu=operational'}
					className={`p-3 flex gap-4 ${
						selected == 'operational'
							? 'bg-violet-400 hover:bg-violet-500 text-zinc-900'
							: 'bg-zinc-950 hover:bg-zinc-800 text-zinc-50'
					}   rounded justify-between text-lg font-semibold transition-all duration-300 ease-linear`}>
					{isOpen! ? <p>Operacional</p> : null}

					<PieChart />
				</Link>
				<Link
					href={'/nps?menu=nps'}
					className={`p-3 flex gap-4 ${
						selected == 'nps'
							? 'bg-violet-400 hover:bg-violet-500 text-zinc-900'
							: 'bg-zinc-950 hover:bg-zinc-800 text-zinc-50'
					}   rounded justify-between text-lg font-semibold transition-all duration-300 ease-linear`}>
					{isOpen! ? <p>Avaliações</p> : null}
					<ScanEye />
				</Link>
			</div>
			<BtnSignOut isOpened={isOpen} />
		</div>
	);
}
