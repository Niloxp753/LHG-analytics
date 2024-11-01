/** @format */
'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import MenuFilter from './MenuFilter';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

export default function Header() {
	const searchParams = useSearchParams();
	const [pending7D, setPending7D] = useState(false);
	const [pending30D, setPending30D] = useState(false);
	const [pending6M, setPending6M] = useState(false);
	const selected = searchParams.get('menu') || 'general';
	const openned = searchParams.get('open') || 'true';
	const preSet = searchParams.get('set') || '7days';

	function handleClick7D() {
		setPending7D(true);
		setTimeout(() => {
			setPending7D(false);
		}, 1500);
	}
	function handleClick30D() {
		setPending30D(true);
		setTimeout(() => {
			setPending30D(false);
		}, 1500);
	}
	function handleClick6M() {
		setPending6M(true);
		setTimeout(() => {
			setPending6M(false);
		}, 1500);
	}

	return (
		<div className=' pt-1 pb-1 w-full'>
			<div
				className={`flex gap-5 items-center w-full max-w-sm md:max-w-full justify-center mx-auto `}>
				<div className='flex items-center justify-center gap-3 md:gap-5 w-full text-zinc-100 text-xs md:text-sm'>
					<Link href={`?menu=${selected}&open=${openned}&set=7days`}>
						<Button
							disabled={pending7D}
							onClick={() => handleClick7D()}
							className={`w-fit min-w-28 text-xs disabled:opacity-50  cursor-pointer  border flex gap-2 ${
								preSet == '7days'
									? 'bg-violet-400 text-zinc-900 '
									: 'text-zinc-50 bg-transparent'
							} border-violet-400 py-1 px-2 rounded transition-all duration-300 ease-linear hover:bg-violet-400 hover:text-zinc-900 font-semibold `}>
							{pending7D ? (
								<Loader2 className='size-5 animate-spin' />
							) : (
								'ÚLTIMOS 7 DIAS'
							)}
						</Button>
					</Link>

					<Link href={`?menu=${selected}&open=${openned}&set=30days`}>
						<Button
							disabled={pending30D}
							onClick={() => handleClick30D()}
							className={`w-fit min-w-28 text-xs disabled:opacity-50  cursor-pointer  border flex gap-2 ${
								preSet == '30days'
									? 'bg-violet-400 text-zinc-900 '
									: 'text-zinc-50 bg-transparent'
							} border-violet-400 py-1 px-2 rounded transition-all duration-300 ease-linear hover:bg-violet-400 hover:text-zinc-900 font-semibold `}>
							{pending30D ? (
								<Loader2 className='size-5 animate-spin' />
							) : (
								'ÚLTIMOS 30 DIAS'
							)}
						</Button>
					</Link>

					<Link href={`?menu=${selected}&open=${openned}&set=6months`}>
						<Button
							disabled={pending6M}
							onClick={() => handleClick6M()}
							className={`w-fit min-w-28 text-xs disabled:opacity-50   cursor-pointer  border flex gap-2 ${
								preSet == '6months'
									? 'bg-violet-400 text-zinc-900 '
									: 'text-zinc-50 bg-transparent'
							} border-violet-400 py-1 px-2 rounded transition-all duration-300 ease-linear hover:bg-violet-400 hover:text-zinc-900 font-semibold `}>
							{pending6M ? (
								<Loader2 className='size-5 animate-spin' />
							) : (
								'ÚLTIMOS 6 MESES'
							)}
						</Button>
					</Link>
				</div>
				<div className='hidden md:flex'>
					<MenuFilter />
				</div>
			</div>
		</div>
	);
}
