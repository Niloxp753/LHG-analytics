/** @format */

'use client';

import BtnSignOut from '@/components/btnSingOut';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { DEFAULT_RANGE_TAG, getAvailableRangeTags } from '@/lib/date-range';
import { shouldNavigateToHref } from '@/lib/navigation-target';
import { useSessionStore } from '@/stores/session-store';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';
import FormFilter from './FormFilter';
import LinkPreSet from './LinkPreSet';

export default function HeaderClient() {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const router = useRouter();
	const sessionCpf = useSessionStore((s) => s.user?.cpf);
	const selected = searchParams.get('menu') || 'general';
	const preSet = searchParams.get('set') || DEFAULT_RANGE_TAG;
	const startDate = searchParams.get('startDate') || '';
	const menu = searchParams.get('menu');
	const [isPending, startTransition] = useTransition();

	const links = getAvailableRangeTags();

	const canShow =
		pathname.endsWith('general') ||
		pathname.endsWith('restaurant') ||
		pathname.endsWith('reservations') ||
		pathname.endsWith('operational');

	return (
		<div className=' pt-1 pb-1 w-full'>
			<div
				className={`flex gap-5 items-end justify-between md:justify-center w-full flex-col md:flex-row `}>
				<div className='flex flex-col lg:flex-row justify-between md:justify-start md:gap-5 w-full text-zinc-100 text-xs md:text-sm'>
					{!canShow &&
						(sessionCpf == '359.267.460-94' ? (
							<BtnSignOut
								fit
								isOpened
							/>
						) : (
							<Button
								variant={'outline'}
								className='dark border-violet-400 text-white hidden lg:flex w-10'
								onClick={() => {
									const href = `/${menu}?menu=${menu}&set=${preSet}`;
									if (!shouldNavigateToHref(pathname, searchParams.entries(), href)) {
										return;
									}
									startTransition(() => {
										router.push(href);
									});
								}}>
								{isPending ? (
									<Loader2
										size={16}
										className='animate-spin '
									/>
								) : (
									<ArrowLeft
										size={16}
										className=''
									/>
								)}
							</Button>
						))}
					{links.map((l, index) => {
						return (
							<LinkPreSet
								tag={l.tag}
								key={index}
								preSet={preSet}
								startDate={startDate}
								label={l.label}
								href={`?menu=${selected}&set=${l.tag}`}></LinkPreSet>
						);
					})}
				</div>
				<Separator className='lg:hidden' />
				<FormFilter />
			</div>
		</div>
	);
}
