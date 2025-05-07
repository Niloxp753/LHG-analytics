/** @format */
'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';
import FormFilter from './FormFilter';
import LinkPreSet from './LinkPreSet';
import BtnSignOut from '@/components/btnSingOut';

interface HeaderProps {
	cpf?: string;
}
export default function Header({ cpf }: HeaderProps) {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const router = useRouter();
	const selected = searchParams.get('menu') || 'general';
	const preSet = searchParams.get('set') || '7days';
	const startDate = searchParams.get('startDate') || '';
	const menu = searchParams.get('menu');
	const [tab, setTab] = useState(preSet);
	const [isPending, startTransition] = useTransition();

	const links = [
		{ label: 'ÚLTIMOS 7 DIAS', tag: '7days' },
		{ label: 'ÚLTIMOS 30 DIAS', tag: '30days' },
		{ label: 'ÚLTIMOS 6 MESES', tag: '6months' },
	];

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
						(cpf == '359.267.460-94' ? (
							<BtnSignOut
								fit
								isOpened
							/>
						) : (
							<Button
								variant={'outline'}
								className='dark border-violet-400 text-white hidden lg:flex'
								onClick={() =>
									startTransition(() => {
										router.push(`/${menu}?menu=${menu}&set=${preSet}`);
									})
								}>
								{isPending ? (
									<Loader2
										size={16}
										className='animate-spin mr-2'
									/>
								) : (
									<ArrowLeft
										size={16}
										className='mr-2'
									/>
								)}
								Voltar
							</Button>
						))}
					{links.map((l, index) => {
						return (
							<LinkPreSet
								onClick={() => setTab(l.tag)}
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
