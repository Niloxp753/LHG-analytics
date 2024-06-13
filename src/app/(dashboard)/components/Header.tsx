/** @format */
'use client';

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
import { useSearchParams, usePathname } from 'next/navigation';

export default function Header() {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const selected = searchParams.get('menu') || 'general';
	const openned = searchParams.get('open') || 'true';
	const preSet = searchParams.get('set') || '7days';
	console.log(pathname);
	return (
		<div className='flex ml-auto flex-col gap-2 w-full '>
			<div
				className={`ml-auto flex gap-5  items-center w-full ${
					pathname == '/general' ? 'justify-end' : 'justify-between'
				} `}>
				{pathname == '/general' ? (
					<></>
				) : (
					<Link
						href={`/general?menu=${selected}&open=${openned}&set=${preSet}`}
						className='text-zinc-50 border flex gap-2 border-violet-400 py-1 px-3 rounded transition-all duration-300 ease-linear hover:bg-violet-400 hover:text-zinc-900 font-semibold text-sm items-center'>
						<ArrowLeftToLine size={20} />
						Voltar
					</Link>
				)}

				<div className='flex gap-5 items-center'>
					<div className='flex items-center gap-5 text-zinc-100 w-full text-sm'>
						<Link
							href={`?menu=${selected}&open=${openned}&set=7days`}
							className={`w-fit  cursor-pointer  border flex gap-2 ${
								preSet == '7days'
									? 'bg-violet-400 text-zinc-900 '
									: 'text-zinc-50 bg-transparent'
							} border-violet-400 py-1 px-3 rounded transition-all duration-300 ease-linear hover:bg-violet-400 hover:text-zinc-900 font-semibold`}>
							Últimos 7 dias
						</Link>
						<Link
							href={`?menu=${selected}&open=${openned}&set=30days`}
							className={`w-fit  cursor-pointer  border flex gap-2 ${
								preSet == '30days'
									? 'bg-violet-400 text-zinc-900 '
									: 'text-zinc-50 bg-transparent'
							} border-violet-400 py-1 px-3 rounded transition-all duration-300 ease-linear hover:bg-violet-400 hover:text-zinc-900 font-semibold`}>
							Últimos 30 dias
						</Link>
						<Link
							href={`?menu=${selected}&open=${openned}&set=6months`}
							className={`w-fit  cursor-pointer  border flex gap-2 ${
								preSet == '6months'
									? 'bg-violet-400 text-zinc-900 '
									: 'text-zinc-50 bg-transparent'
							} border-violet-400 py-1 px-3 rounded transition-all duration-300 ease-linear hover:bg-violet-400 hover:text-zinc-900 font-semibold`}>
							Últimos 6 meses
						</Link>
						<Link
							href={`?menu=${selected}&open=${openned}&set=12months`}
							className={`w-fit  cursor-pointer  border flex gap-2 ${
								preSet == '12months'
									? 'bg-violet-400 text-zinc-900 '
									: 'text-zinc-50 bg-transparent'
							} border-violet-400 py-1 px-3 rounded transition-all duration-300 ease-linear hover:bg-violet-400 hover:text-zinc-900 font-semibold`}>
							Últimos 12 meses
						</Link>
					</div>
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
