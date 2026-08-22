'use client';

import BtnSignOut from '@/components/btnSingOut';
import { Button } from '@/components/ui/button';
import {
	SheetContent,
	SheetHeader,
	SheetTitle,
} from '@/components/ui/sheet';
import {
	BarChart3,
	PieChart,
	ScatterChart,
	UserRoundCog,
	UtensilsCrossed,
} from 'lucide-react';
import {
	buildModuleHref,
	canAccessModule,
	isAdmin,
} from '@/lib/access-control';
import { DEFAULT_RANGE_TAG } from '@/lib/date-range';
import { shouldNavigateToHref } from '@/lib/navigation-target';
import { useSessionStore } from '@/stores/session-store';
import { useIntentPrefetch } from '@/hooks/use-intent-prefetch';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';

type MobileMenuContentProps = {
	onNavigate(): void;
};

export default function MobileMenuContent({
	onNavigate,
}: MobileMenuContentProps) {
	const pathname = usePathname();
	const [isPending, startTransition] = useTransition();
	const searchParams = useSearchParams();
	const preSet = searchParams.get('set') || DEFAULT_RANGE_TAG;
	const user = useSessionStore((state) => state.user);
	const adminAccess = isAdmin(user);
	const canAccessCompany = canAccessModule(user, 'company');
	const canAccessRestaurant = canAccessModule(user, 'restaurant');
	const canAccessBookings = canAccessModule(user, 'bookings');
	const canAccessGovernance = canAccessModule(user, 'governance');
	const companyHref = buildModuleHref(user, 'company', preSet);
	const restaurantHref = buildModuleHref(user, 'restaurant', preSet);
	const bookingsHref = buildModuleHref(user, 'bookings', preSet);
	const governanceHref = buildModuleHref(user, 'governance', preSet);
	const router = useRouter();
	const intent = useIntentPrefetch();

	function handleClick(
		event: React.MouseEvent<HTMLButtonElement>,
		href: string,
	) {
		event.stopPropagation();
		event.preventDefault();
		if (!shouldNavigateToHref(pathname, searchParams.entries(), href)) {
			return;
		}
		startTransition(() => router.push(href));
		onNavigate();
	}

	const links = [
		{
			label: 'Painel Admin',
			href: `/settings?menu=admin&set=${preSet}`,
			slug: '/settings',
			disabled: !adminAccess,
			icon: (
				<UserRoundCog
					className={` ${
						pathname.includes('/settings') ? 'text-zinc-900' : ''
					} text-zinc-200 group-hover:text-zinc-900 h-5 w-5 flex-shrink-0`}
				/>
			),
		},
		{
			label: 'Visão Geral',
			href: companyHref ?? '#',
			slug: '/general',
			disabled: !canAccessCompany || !companyHref,
			icon: (
				<BarChart3
					className={` ${
						pathname.includes('/general') ? 'text-zinc-900' : ''
					} text-zinc-200 group-hover:text-zinc-900 h-5 w-5 flex-shrink-0`}
				/>
			),
		},
		{
			label: 'Restaurantes',
			slug: '/restaurant',
			href: restaurantHref ?? '#',
			disabled: !canAccessRestaurant || !restaurantHref,
			icon: (
				<UtensilsCrossed
					className={` ${
						pathname.includes('/restaurant') ? 'text-zinc-900' : ''
					} text-zinc-200 group-hover:text-zinc-900 h-5 w-5 flex-shrink-0`}
				/>
			),
		},
		{
			label: 'Reservas',
				slug: '/reservations',
			href: bookingsHref ?? '#',
			disabled: !canAccessBookings || !bookingsHref,
			icon: (
				<ScatterChart
					className={` ${
						pathname.includes('/reservations') ? 'text-zinc-900' : ''
					} text-zinc-200 group-hover:text-zinc-900 h-5 w-5 flex-shrink-0`}
				/>
			),
		},
		{
			label: 'Operacional',
			slug: '/operational',
			href: governanceHref ?? '#',
			disabled: !canAccessGovernance || !governanceHref,
			icon: (
				<PieChart
					className={` ${
						pathname.includes('/operational') ? 'text-zinc-900' : ''
					} text-zinc-200 group-hover:text-zinc-900 h-5 w-5 flex-shrink-0`}
				/>
			),
		},
	];

	return (
		<SheetContent
			onClick={(event) => event.stopPropagation()}
			side='left'
			data-testid='mobile-menu-content'
			className='dark w-full h-full z-[51]'>
			<SheetHeader className='sr-only'>
				<SheetTitle>Menu de navegação</SheetTitle>
			</SheetHeader>
			<div
				onClick={(event) => event.stopPropagation()}
				className='mt-20 flex flex-col gap-5'>
				{links.map((link) => {
					const isSelected = pathname.includes(link.slug);
					const isDisabled = link.disabled;
					const enabled =
						!isDisabled &&
						!isSelected &&
						shouldNavigateToHref(
							pathname,
							searchParams.entries(),
							link.href,
						);
					return (
						<Button
							disabled={isDisabled}
							onPointerEnter={() => intent.schedule(link.href, enabled)}
							onPointerLeave={() => intent.cancel(link.href)}
							onFocus={() => intent.prefetchNow(link.href, enabled)}
							onPointerDown={() => intent.prefetchNow(link.href, enabled)}
							onClick={(event) => handleClick(event, link.href)}
							key={link.label}
							className={`flex items-center justify-start transition-all ease-linear duration-150 p-2.5 rounded-md ${
								isDisabled
									? 'bg-transparent text-zinc-400 opacity-50 cursor-not-allowed'
									: isSelected
										? 'bg-violet-400 text-black hover:bg-violet-400'
										: 'bg-transparent text-white hover:bg-violet-400'
							} gap-5`}>
							<span>{link.icon}</span>
							<p
								className={`${
									isSelected && !isDisabled
										? ' text-black'
										: isDisabled
											? 'text-zinc-400'
											: 'bg-transparent text-white'
								}`}>
								{link.label}
							</p>
						</Button>
					);
				})}
			</div>
			<div className='absolute inset-x-6 bottom-5'>
				<BtnSignOut />
			</div>
			{isPending ? <span className='sr-only'>Carregando</span> : null}
		</SheetContent>
	);
}
