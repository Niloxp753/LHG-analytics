/** @format */
'use client';

import {
	Activity,
	AlarmClockCheck,
	ArrowLeftToLine,
	ChevronsDown,
	ChevronsUp,
	DoorClosed,
	HandCoins,
	Sigma,
	SquarePercent,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import CardDetails from './CardDetails';
import MenuFilter from './MenuFilter';

export default function Header() {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const selected = searchParams.get('menu') || 'general';
	const openned = searchParams.get('open') || 'true';
	const preSet = searchParams.get('set') || '7days';
	const [openMenu, setOpenMenu] = useState(true);

	return (
		<div className='flex mx-auto md:ml-auto flex-col gap-0 md:gap-5 w-full pt-1 pb-1 px-2 md:px-0 '>
			<div
				className={`md:ml-auto mx-auto  flex gap-5 items-center w-full ${
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

				<div className={`flex gap-5 items-center `}>
					<div
						onClick={() => setOpenMenu(!openMenu)}
						className='absolute text-white rounded -bottom-5 left-0 flex bg-zinc-800 hover:bg-zinc-700 transition-all ease-linear duration-300 cursor-pointer w-full py-1'>
						{openMenu ? (
							<ChevronsUp
								className='mx-auto'
								size={24}
							/>
						) : (
							<ChevronsDown
								className='mx-auto'
								size={24}
							/>
						)}
					</div>
					<div className='md:flex items-center gap-5 text-zinc-100 w-full text-sm hidden'>
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
					<div className='hidden md:flex'>
						<MenuFilter />
					</div>
				</div>
			</div>
			<div
				className={`${
					!openMenu
						? 'hidden'
						: 'md:flex md:flex-row grid h-[80vh] md:h-full grid-cols-2 w-full'
				} justify-between items-start gap-2 w-full px-1  `}>
				<CardDetails
					description={`${preSet == '7days' ? '7 dias atrás ' : ''} ${
						preSet == '30days' ? '30 dias atrás ' : ''
					} ${preSet == '6months' ? '6 meses atrás ' : ''}${
						preSet == '12months' ? '12 meses atrás ' : ''
					}`}
					type='money'
					icon={<HandCoins />}
					title={'Faturamento'}
					value={120000}
				/>
				<CardDetails
					description={`${preSet == '7days' ? '7 dias atrás ' : ''} ${
						preSet == '30days' ? '30 dias atrás ' : ''
					} ${preSet == '6months' ? '6 meses atrás ' : ''}${
						preSet == '12months' ? '12 meses atrás ' : ''
					}`}
					icon={<Sigma />}
					title={'Locações'}
					value={500}
				/>
				<CardDetails
					description={`${preSet == '7days' ? '7 dias atrás' : ''} ${
						preSet == '30days' ? '30 dias atrá s' : ''
					} ${preSet == '6months' ? '6 meses atrás ' : ''}${
						preSet == '12months' ? '12 meses atrás ' : ''
					}`}
					type='money'
					icon={<SquarePercent />}
					title={'Ticket Médio'}
					value={240}
				/>
				<CardDetails
					description={`${preSet == '7days' ? '7 dias atrás ' : ''} ${
						preSet == '30days' ? '30 dias atrás ' : ''
					} ${preSet == '6months' ? '6 meses atrás ' : ''}${
						preSet == '12months' ? '12 meses atrás ' : ''
					}`}
					type='money'
					icon={<Activity />}
					title={'RevPar'}
					value={320}
				/>
				<CardDetails
					description={`${preSet == '7days' ? '7 dias atrás' : ''} ${
						preSet == '30days' ? '30 dias atrás ' : ''
					} ${preSet == '6months' ? '6 meses atrás ' : ''}${
						preSet == '12months' ? '12 meses atrás ' : ''
					}`}
					icon={<DoorClosed />}
					title={'Tx de Ocupação'}
					value={'40%'}
				/>
				<CardDetails
					description={`${preSet == '7days' ? '7 dias atrás ' : ''} ${
						preSet == '30days' ? '30 dias atrás ' : ''
					} ${preSet == '6months' ? '6 meses atrás ' : ''}${
						preSet == '12months' ? '12 meses atrás ' : ''
					}`}
					icon={<AlarmClockCheck />}
					title={'TMO'}
					value={'4 horas'}
				/>
			</div>
		</div>
	);
}
