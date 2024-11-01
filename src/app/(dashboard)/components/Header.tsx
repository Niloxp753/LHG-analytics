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
	const [pending, setPending] = useState(false);
	const selected = searchParams.get('menu') || 'general';
	const openned = searchParams.get('open') || 'true';
	const preSet = searchParams.get('set') || '7days';

	function handleClick() {
		setPending(true);
		setTimeout(() => {
			setPending(false);
		}, 1600);
	}

	return (
		<div className=' pt-1 pb-1 w-full'>
			<div
				className={`flex gap-5 items-center w-full max-w-sm md:max-w-full justify-center mx-auto `}>
				<div className='flex items-center justify-center gap-5 text-zinc-100 text-xs md:text-sm'>
					<Link
						aria-disabled={pending}
						href={`?menu=${selected}&open=${openned}&set=7days`}>
						<Button
							disabled={pending}
							onClick={() => handleClick()}
							className={`w-fit min-w-32 disabled:opacity-50 disabled:grayscale  cursor-pointer  border flex gap-2 ${
								preSet == '7days'
									? 'bg-violet-400 text-zinc-900 '
									: 'text-zinc-50 bg-transparent'
							} border-violet-400 py-1 px-2 rounded transition-all duration-300 ease-linear hover:bg-violet-400 hover:text-zinc-900 font-semibold `}>
							{pending ? (
								<Loader2 className='size-5 animate-spin' />
							) : (
								'Últimos 7 dias'
							)}
						</Button>
					</Link>

					<Button asChild>
						<Link
							href={`?menu=${selected}&open=${openned}&set=30days`}
							className={`w-fit  cursor-pointer  border flex gap-2 ${
								preSet == '30days'
									? 'bg-violet-400 text-zinc-900 '
									: 'text-zinc-50 bg-transparent'
							} border-violet-400 py-1 px-3 rounded transition-all duration-300 ease-linear hover:bg-violet-400 hover:text-zinc-900 font-semibold`}>
							Últimos 30 dias
						</Link>
					</Button>
					<Button asChild>
						<Link
							href={`?menu=${selected}&open=${openned}&set=6months`}
							className={`w-fit  cursor-pointer  border flex gap-2 ${
								preSet == '6months'
									? 'bg-violet-400 text-zinc-900 '
									: 'text-zinc-50 bg-transparent'
							} border-violet-400 py-1 px-3 rounded transition-all duration-300 ease-linear hover:bg-violet-400 hover:text-zinc-900 font-semibold`}>
							Últimos 6 meses
						</Link>
					</Button>
				</div>
				<div className='hidden md:flex'>
					<MenuFilter />
				</div>
			</div>
		</div>
	);
}
