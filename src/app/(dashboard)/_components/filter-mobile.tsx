/** @format */
'use client';
import { Button } from '@/components/ui/button';
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
import Header from './Header';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useTransition } from 'react';

export default function FilterMobile() {
	const pathname = usePathname();
	const [isPending, startTransition] = useTransition();
	const searchParams = useSearchParams();
	const preSet = searchParams.get('set') || '7days';
	const menu = searchParams.get('menu');

	const canShow =
		pathname.endsWith('general') ||
		pathname.endsWith('restaurant') ||
		pathname.endsWith('reservations') ||
		pathname.endsWith('operational');

	const router = useRouter();

	function handleBack(e: React.MouseEvent<HTMLButtonElement>) {
		e.stopPropagation();
		e.preventDefault();
		startTransition(() => {
			router.push(`/${menu}?menu=${menu}&set=${preSet}`);
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

	return (
		<Sheet>
			<SheetTrigger
				asChild
				className={`${
					pathname.includes('settings') && 'hidden'
				} fixed top-4 right-3 `}>
				<Button
					size={'icon'}
					className='bg-transparent z-50'>
					<Filter size={22} />
				</Button>
			</SheetTrigger>
			<SheetContent
				onClick={(e) => e.stopPropagation()}
				side={'right'}
				className='dark w-full z-[51]'>
				<SheetHeader>
					<SheetTitle>Filtrar por data</SheetTitle>
				</SheetHeader>
				<div className='mt-10 flex flex-col gap-10 z-[70]'>
					<Header />
					{!canShow && (
						<Button
							variant={'outline'}
							className='dark border-violet-400 text-white mt-20   lg:hidden'
							onClick={(e) => handleBack(e)}>
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
					)}
				</div>
				<SheetFooter>
					<SheetClose
						id='myclose'
						className='hidden'></SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}
