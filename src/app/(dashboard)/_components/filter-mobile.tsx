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
import { Filter } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import FormFilter from './FormFilter';
import PeriodSelector from './PeriodSelector';

export default function FilterMobile() {
	const [mounted, setMounted] = useState(false);
	const pathname = usePathname();

	function handleClose() {
		const btn = document.getElementById('myclose');
		btn?.click();
	}

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
					<SheetTitle className='text-xl'>Filtrar por data</SheetTitle>
				</SheetHeader>
				<div className='mt-10 flex flex-col gap-2.5 z-[70]'>
					<PeriodSelector onNavigate={handleClose} />
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

