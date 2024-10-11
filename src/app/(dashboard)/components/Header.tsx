/** @format */
'use client';

import { ArrowLeftToLine } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useState } from 'react';
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
				className={`md:ml-auto mx-auto  flex gap-5 items-center w-full justify-center `}>
				<div className={`flex gap-5 items-center `}>
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
		</div>
	);
}
