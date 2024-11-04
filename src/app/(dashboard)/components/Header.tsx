/** @format */
'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import MenuFilter from './MenuFilter';

export default function Header() {
	const searchParams = useSearchParams();

	const selected = searchParams.get('menu') || 'general';
	const openned = searchParams.get('open') || 'true';
	const preSet = searchParams.get('set') || '7days';

	return (
		<div className=' pt-1 pb-1 w-full'>
			<div
				className={`flex gap-5 items-center w-full max-w-sm md:max-w-full justify-center mx-auto `}>
				<div className='flex items-center justify-between md:justify-center md:gap-5 w-full text-zinc-100 text-xs md:text-sm'>
					<Link
						href={`?menu=${selected}&open=${openned}&set=7days`}
						className={`w-fit min-w-28 text-xs disabled:opacity-50  cursor-pointer  border flex gap-2 ${
							preSet == '7days'
								? 'bg-violet-400 text-zinc-900 '
								: 'text-zinc-50 bg-transparent'
						} border-violet-400 py-2 px-1 rounded transition-all duration-300 ease-linear hover:bg-violet-400 hover:text-zinc-900 font-semibold `}>
						ÚLTIMOS 7 DIAS
					</Link>

					<Link
						href={`?menu=${selected}&open=${openned}&set=30days`}
						className={`w-fit min-w-28 text-xs disabled:opacity-50  cursor-pointer  border flex gap-2 ${
							preSet == '30days'
								? 'bg-violet-400 text-zinc-900 '
								: 'text-zinc-50 bg-transparent'
						} border-violet-400 py-2 px-1 rounded transition-all duration-300 ease-linear hover:bg-violet-400 hover:text-zinc-900 font-semibold `}>
						ÚLTIMOS 30 DIAS
					</Link>

					<Link
						href={`?menu=${selected}&open=${openned}&set=6months`}
						className={`w-fit min-w-28 text-xs disabled:opacity-50   cursor-pointer  border flex gap-2 ${
							preSet == '6months'
								? 'bg-violet-400 text-zinc-900 '
								: 'text-zinc-50 bg-transparent'
						} border-violet-400 py-2 px-1 rounded transition-all duration-300 ease-linear hover:bg-violet-400 hover:text-zinc-900 font-semibold `}>
						ÚLTIMOS 6 MESES
					</Link>
					<div className='hidden md:flex'>
						<MenuFilter />
					</div>
				</div>
			</div>
		</div>
	);
}
