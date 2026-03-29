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
import { Filter, Loader2 } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';
import FormFilter from './FormFilter';
import { DEFAULT_RANGE_TAG, getAvailableRangeTags } from '@/lib/date-range';
import { shouldNavigateToHref } from '@/lib/navigation-target';

export default function FilterMobile() {
	const [mounted, setMounted] = useState(false);
	const pathname = usePathname();
	const [isPending, startTransition] = useTransition();
	const searchParams = useSearchParams();
	const preSet = searchParams.get('set') || DEFAULT_RANGE_TAG;
	const menu = searchParams.get('menu');
	const startDate = searchParams.get('startDate') || '';
	const links = getAvailableRangeTags();

	const router = useRouter();

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

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

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
					aria-label='Abrir filtro por data'
					data-testid='filter-mobile-trigger'
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
								onClick={(e) => {
									e.stopPropagation();
									e.preventDefault();
									const href = `${pathname}/?menu=${menu}&set=${item.tag}`;
									if (!shouldNavigateToHref(pathname, searchParams.entries(), href)) {
										return;
									}
									startTransition(() => {
										router.push(href);
									});
								}}>
								{item.label}
							</Button>
						);
					})}

					<Separator className='my-5' />
					<FormFilter popoverPortalled={false} />
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


