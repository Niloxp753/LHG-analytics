/** @format */
'use client';
import { Button } from '@/components/ui/button';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { Filter } from 'lucide-react';
import Header from './Header';
import { usePathname } from 'next/navigation';

export default function FilterMobile() {
	const pathname = usePathname();
	return (
		<Sheet>
			<SheetTrigger
				onClick={(e) => e.stopPropagation()}
				asChild
				className={`${
					pathname.includes('settings') && 'hidden'
				} fixed z-40 top-4 right-3`}>
				<Button
					onClick={(e) => e.stopPropagation()}
					size={'icon'}
					className='bg-transparent'>
					<Filter size={22} />
				</Button>
			</SheetTrigger>
			<SheetContent
				onClick={(e) => e.stopPropagation()}
				side={'right'}
				className='dark w-3/4'>
				<SheetHeader>
					<SheetTitle>Filtrar por data</SheetTitle>
				</SheetHeader>
				<div className='mt-10 flex flex-col gap-10'>
					<Header />
				</div>
			</SheetContent>
		</Sheet>
	);
}
