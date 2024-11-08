/** @format */
'use client';

import MenuFilter from '@/app/(dashboard)/_components/MenuFilter';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export default function HeaderRestaurants() {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const selected = searchParams.get('menu') || 'general';
	const openned = searchParams.get('open') || 'true';
	const preSet = searchParams.get('set') || '7days';

	return (
		<div className='flex flex-col gap-2 w-full pt-1 pb-1 mx-auto md:px-0 '>
			<div className={`flex gap-5 items-center w-fit px-2 `}>
				<div className='flex items-center gap-2 md:gap-5 text-zinc-100 w-full text-xs md:text-sm justify-between'>
					<Link
						href={`?menu=${selected}&open=${openned}&set=7days`}
						className={`w-full  cursor-pointer  border flex gap-2 ${
							preSet == '7days'
								? 'bg-violet-400 text-zinc-900 '
								: 'text-zinc-50 bg-transparent'
						} border-violet-400 py-1 px-3 rounded transition-all duration-300 ease-linear hover:bg-violet-400 hover:text-zinc-900 font-semibold`}>
						Últimos 7 dias
					</Link>
					<Link
						href={`?menu=${selected}&open=${openned}&set=30days`}
						className={`w-full   cursor-pointer  border flex gap-2 ${
							preSet == '30days'
								? 'bg-violet-400 text-zinc-900 '
								: 'text-zinc-50 bg-transparent'
						} border-violet-400 py-1 px-3 rounded transition-all duration-300 ease-linear hover:bg-violet-400 hover:text-zinc-900 font-semibold`}>
						Últimos 30 dias
					</Link>
					<Link
						href={`?menu=${selected}&open=${openned}&set=6months`}
						className={`w-full   cursor-pointer  border flex gap-2 ${
							preSet == '6months'
								? 'bg-violet-400 text-zinc-900 '
								: 'text-zinc-50 bg-transparent'
						} border-violet-400 py-1 px-3 rounded transition-all duration-300 ease-linear hover:bg-violet-400 hover:text-zinc-900 font-semibold`}>
						Últimos 6 meses
					</Link>
					<Link
						href={`?menu=${selected}&open=${openned}&set=12months`}
						className={`w-full   cursor-pointer  border flex gap-2 ${
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
	);
}
