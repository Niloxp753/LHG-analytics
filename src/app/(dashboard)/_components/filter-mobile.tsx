/** @format */
'use client';

import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import { Filter } from 'lucide-react';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const MobileFilterContent = dynamic(() => import('./mobile-filter-content'), {
	ssr: false,
});

export default function FilterMobile() {
	const pathname = usePathname();
	const [open, setOpen] = useState(false);

	return (
		<Sheet open={open} onOpenChange={setOpen}>
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
			{open ? (
				<MobileFilterContent onNavigate={() => setOpen(false)} />
			) : null}
		</Sheet>
	);
}

