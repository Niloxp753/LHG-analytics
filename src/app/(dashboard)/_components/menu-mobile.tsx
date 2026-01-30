/** @format */
'use client';
import BtnSignOut from '@/components/btnSingOut';
import { Button } from '@/components/ui/button';
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetTrigger,
} from '@/components/ui/sheet';
import { useSessionStore } from '@/stores/session-store';
import {
	BarChart3,
	Menu,
	PieChart,
	ScanEye,
	ScatterChart,
	UserRoundCog,
	UtensilsCrossed,
} from 'lucide-react';
import { buildModuleHref, canAccessModule, isAdmin } from '@/lib/access-control';
import { DEFAULT_RANGE_TAG } from '@/lib/date-range';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useTransition } from 'react';

export default function MenuMobile() {
	const pathname = usePathname();
	const [isPending, startTransition] = useTransition();
	const searchParams = useSearchParams();
	const preSet = searchParams.get('set') || DEFAULT_RANGE_TAG;
	const user = useSessionStore((s) => s.user);
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

	function handleClick(e: React.MouseEvent<HTMLButtonElement>, href: string) {
		e.stopPropagation();
		e.preventDefault();
		startTransition(() => {
			router.push(href);
		});
	}

	function handleClose() {
		const btn = document.getElementById('myclose');
		if (!isPending) {
			btn?.click();
		}
	}

	useEffect(() => {
		handleClose();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isPending]);

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
		{
			label: 'Avaliações',
			slug: '/nps',
			href: `/nps?menu=nps&set=${preSet}`,
			disabled: true,
			icon: (
				<ScanEye
					className={` ${
						pathname.includes('/nps') ? 'text-zinc-900' : ''
					} text-zinc-200 group-hover:text-zinc-900 h-5 w-5 flex-shrink-0`}
				/>
			),
		},
	];

	return (
		<Sheet>
			<SheetTrigger
				onClick={(e) => e.stopPropagation()}
				asChild
				className={`fixed top-4 left-3 z-50`}>
				<Button
					onClick={(e) => e.stopPropagation()}
					size={'icon'}
					className='bg-transparent'>
					<Menu size={22} />
				</Button>
			</SheetTrigger>
			<SheetContent
				onClick={(e) => e.stopPropagation()}
				side={'left'}
				className='dark w-full h-full z-[51]'>
				<div
					onClick={(e) => e.stopPropagation()}
					className='mt-20 flex flex-col gap-5'>
					{links.map((link, idx) => {
						const isSelected = pathname.includes(link.slug);
						const isDisabled = link.disabled;
						return (
							<Button
								disabled={isDisabled}
								onClick={(e) => handleClick(e, link.href)}
								key={idx}
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
				<div className='mt-20'>
					<BtnSignOut />
					<SheetClose
						id='myclose'
						className='hidden'></SheetClose>
				</div>
			</SheetContent>
		</Sheet>
	);
}
