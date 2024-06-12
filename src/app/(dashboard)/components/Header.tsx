/** @format */

import {
	Activity,
	AlarmClockCheck,
	ArrowLeftToLine,
	DoorClosed,
	HandCoins,
	Sigma,
	SquarePercent,
} from 'lucide-react';
import CardDetails from './CardDetails';
import MenuFilter from './MenuFilter';
import Link from 'next/link';

export default function Header() {
	return (
		<div className='flex ml-auto flex-col gap-2 w-full bg-zinc-950/40 backdrop-blur-md '>
			<div className='ml-auto flex gap-5 border border-zinc-950/40 items-center w-full justify-between'>
				<div className='flex items-center gap-5 text-zinc-100 w-full text-sm'>
					<div className='w-fit  cursor-pointer text-zinc-50 border flex gap-2 border-violet-400 py-1 px-3 rounded transition-all duration-300 ease-linear hover:bg-violet-400 hover:text-zinc-900 font-semibold'>
						Últimos 7 dias
					</div>
					<div className='w-fit  cursor-pointer text-zinc-50 border flex gap-2 border-violet-400 py-1 px-3 rounded transition-all duration-300 ease-linear hover:bg-violet-400 hover:text-zinc-900 font-semibold'>
						Últimos 30 dias
					</div>
					<div className='w-fit  cursor-pointer text-zinc-50 border flex gap-2 border-violet-400 py-1 px-3 rounded transition-all duration-300 ease-linear hover:bg-violet-400 hover:text-zinc-900 font-semibold'>
						Últimos 6 meses
					</div>
					<div className='w-fit  cursor-pointer text-zinc-50 border flex gap-2 border-violet-400 py-1 px-3 rounded transition-all duration-300 ease-linear hover:bg-violet-400 hover:text-zinc-900 font-semibold'>
						Últimos 12 meses
					</div>
				</div>
				<div className='flex gap-5 items-center'>
					<Link
						href={'/general'}
						className='text-zinc-50 border flex gap-2 border-violet-400 py-1 px-3 rounded transition-all duration-300 ease-linear hover:bg-violet-400 hover:text-zinc-900 font-semibold'>
						<ArrowLeftToLine />
						Voltar
					</Link>
					<MenuFilter />
				</div>
			</div>
			<div className={`flex justify-between  items-center gap-2 `}>
				<CardDetails
					type='money'
					icon={<HandCoins />}
					title={'Faturamento'}
					value={120000}
				/>
				<CardDetails
					icon={<Sigma />}
					title={'Locações'}
					value={500}
				/>
				<CardDetails
					type='money'
					icon={<SquarePercent />}
					title={'Ticket Médio'}
					value={240}
				/>
				<CardDetails
					type='money'
					icon={<Activity />}
					title={'RevPar'}
					value={320}
				/>
				<CardDetails
					icon={<DoorClosed />}
					title={'Tx de Ocupação'}
					value={'40%'}
				/>
				<CardDetails
					icon={<AlarmClockCheck />}
					title={'TMO'}
					value={'4 horas'}
				/>
			</div>
		</div>
	);
}
