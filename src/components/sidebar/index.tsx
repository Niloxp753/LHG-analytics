/** @format */

import { BarChart3, UserRoundCog } from 'lucide-react';
import Link from 'next/link';
import BtnFilter from '../btnFilter';
import BtnSignOut from '../btnSingOut';

export default function Sidebar() {
	return (
		<div className='h-screen w-1/6 bg-zinc-900 absolute left-0 p-5 flex flex-col justify-between'>
			<div className='text-zinc-100 flex flex-col gap-5 rounded-xl p-3 bg-zinc-600'>
				<Link
					href={'/settings'}
					className='p-3 flex gap-4 bg-violet-400 rounded-xl text-lg font-medium text-zinc-900 hover:bg-violet-500 transition-all duration-300 ease-linear'>
					Painel Admin
					<UserRoundCog />
				</Link>
				<Link
					href={'/dashboard'}
					className='p-3 bg-zinc-950 flex gap-4 rounded-xl text-lg font-medium  hover:bg-zinc-800 transition-all duration-300 ease-linear'>
					Painel Geral
					<BarChart3 />
				</Link>
				<Link
					href={'/settings'}
					className='p-3 bg-zinc-950 flex gap-4 rounded-xl text-lg font-medium  hover:bg-zinc-800 transition-all duration-300 ease-linear'>
					Painel de Locações
				</Link>
				<Link
					href={'/settings'}
					className='p-3 bg-zinc-950 rounded-xl flex gap-4 text-lg font-medium  hover:bg-zinc-800 transition-all duration-300 ease-linear'>
					Painel de KPI's
				</Link>
				<div className='flex flex-col bg-zinc-500 rounded-xl gap-5  p-3'>
					<h2 className='text-center text-lg'>
						Selecione as opções abaixo para filtrar
					</h2>

					<BtnFilter href={'/settings'}>Tipos de Suítes</BtnFilter>

					<BtnFilter href={'/settings'}>Tipos de Locação</BtnFilter>

					<BtnFilter href={'/settings'}>Unidades</BtnFilter>
				</div>
			</div>
			<BtnSignOut />
		</div>
	);
}
