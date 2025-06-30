/** @format */
'use client';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { ArrowLeft, Filter, Loader2 } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useTransition } from 'react';
import FormFilter from './FormFilter';
import { useSession } from 'next-auth/react';
import BtnSignOut from '@/components/btnSingOut';

export default function FilterMobile() {
	const pathname = usePathname();
	const [isPending, startTransition] = useTransition();
	const searchParams = useSearchParams();
	const preSet = searchParams.get('set') || '7days';
	const menu = searchParams.get('menu');
	const startDate = searchParams.get('startDate') || '';
	const links = [
		{ label: 'ÚLTIMOS 7 DIAS', tag: '7days' },
		{ label: 'ÚLTIMOS 30 DIAS', tag: '30days' },
		{ label: 'ÚLTIMOS 6 MESES', tag: '6months' },
	];

	const router = useRouter();

	function handleClose() {
		const btn = document.getElementById('myclose');
		!isPending && btn?.click();
	}

	useEffect(() => {
		handleClose();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isPending]);

	return (
		<Sheet>
			<SheetTrigger
				onClick={(e) => e.stopPropagation()}
				asChild
				className={`${
					pathname.includes('settings') && 'hidden'
				} fixed top-4 right-3 `}>
				<Button
					size={'icon'}
					className='bg-transparent z-[50]'>
					<Filter size={22} />
				</Button>
			</SheetTrigger>
			<SheetContent
				onClick={(e) => e.stopPropagation()}
				side={'right'}
				className='dark w-full z-[51]'>
				<SheetHeader>
					<SheetTitle className='text-xl flex items-center'>
						{isPending && (
							<Loader2
								size={20}
								className='animate-spin mr-2 text-white'
							/>
						)}
						Filtrar por data
					</SheetTitle>
				</SheetHeader>
				<div className='mt-10 flex flex-col gap-2.5 z-[70]'>
					{links.map((item, index) => {
						return (
							<Button
								disabled={isPending && item.tag == preSet}
								variant={'outline'}
								className={`${
									preSet == item.tag && startDate == '' && !isPending
										? 'bg-violet-400 text-zinc-900 '
										: 'text-zinc-50 bg-transparent'
								}  border-violet-400 hover:bg-violet-400 hover:text-black`}
								key={index}
								onClick={(e) =>
									startTransition(() => {
										e.stopPropagation();
										e.preventDefault();
										router.push(`${pathname}/?menu=${menu}&set=${item.tag}`);
									})
								}>
								{item.label}
							</Button>
						);
					})}

					<Separator className='my-5' />
					<FormFilter />
				</div>
				<SheetFooter className='mt-5'>
					
					<SheetClose
						id='myclose'
						className='hidden'></SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}
