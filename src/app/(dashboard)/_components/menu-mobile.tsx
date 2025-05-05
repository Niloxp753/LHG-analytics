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
import { User } from '@/http/user/getUsers';
import {
	BarChart3,
	Menu,
	PieChart,
	ScanEye,
	ScatterChart,
	UserRoundCog,
	UtensilsCrossed,
} from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useTransition } from 'react';

export default function MenuMobile({ user }: { user?: User }) {
	const pathname = usePathname();
	const [isPending, startTransition] = useTransition();
	const searchParams = useSearchParams();
	const preSet = searchParams.get('set') || '7days';
	const selected = searchParams.get('menu') || 'general';

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
		!isPending && btn?.click();
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
			href: `/general?menu=${selected}&set=${preSet}`,
			slug: '/general',
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
			href: `/restaurant?menu=${selected}&set=${preSet}`,
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
			href: `/reservations?menu=${selected}s&set=${preSet}`,
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
			href: `/operational?menu=${selected}&set=${preSet}`,
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
			icon: (
				<ScanEye
					className={` ${
						pathname.includes('/nps') ? 'text-zinc-900' : ''
					} text-zinc-200 group-hover:text-zinc-900 h-5 w-5 flex-shrink-0`}
				/>
			),
		},
	];

	const isAdmin = user?.role === 'ADMIN';

	const newLinks = isAdmin ? links : links.slice(1);

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
					{newLinks.map((link, idx) => {
						return (
							<Button
								onClick={(e) => handleClick(e, link.href)}
								key={idx}
								className={`flex items-center justify-start hover:bg-violet-400 transition-all ease-linear duration-150 p-2.5 rounded-md ${
									pathname.includes(link.slug)
										? 'bg-violet-400 text-black'
										: 'bg-transparent text-white'
								} gap-5`}>
								<span>{link.icon}</span>
								<p
									className={`${
										pathname.includes(link.slug)
											? ' text-black'
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
