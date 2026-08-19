/** @format */

'use client';

import BtnSignOut from '@/components/btnSingOut';
import { Button } from '@/components/ui/button';
import {
	type DashboardModulePath,
	PATH_TO_MODULE,
} from '@/lib/access-control';
import { DEFAULT_RANGE_TAG } from '@/lib/date-range';
import { shouldNavigateToHref } from '@/lib/navigation-target';
import { useSessionStore } from '@/stores/session-store';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';
import FormFilter from './FormFilter';
import PeriodSelector from './PeriodSelector';
import UnitNavigation from './UnitNavigation';

export default function HeaderClient() {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const router = useRouter();
	const sessionCpf = useSessionStore((s) => s.user?.cpf);
	const preSet = searchParams.get('set') || DEFAULT_RANGE_TAG;
	const startDate = searchParams.get('startDate') || '';
	const endDate = searchParams.get('endDate') || '';
	const pathSegment = pathname.split('/').filter(Boolean)[0] || 'general';
	const menu = searchParams.get('menu') || pathSegment;
	const [isPending, startTransition] = useTransition();
	const landingModule =
		pathname === `/${pathSegment}` && pathSegment in PATH_TO_MODULE
			? (pathSegment as DashboardModulePath)
			: null;

	return (
		<div className=' pt-1 pb-1 w-full'>
			<div
				aria-label='Filtros do dashboard'
				role='region'
				className='flex w-full flex-col gap-3 text-xs text-zinc-100 lg:flex-row lg:items-end lg:gap-2 xl:text-sm'>
				{!landingModule &&
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
				<PeriodSelector className='shrink-0 lg:w-40 xl:w-44' />
				{landingModule && (
					<UnitNavigation
						className='hidden shrink-0 lg:block lg:w-[205px] xl:w-64'
						endDate={endDate}
						modulePath={landingModule}
						preSet={preSet}
						startDate={startDate}
					/>
				)}
				<FormFilter className='min-w-0 lg:ml-auto lg:w-auto' />
			</div>
		</div>
	);
}
