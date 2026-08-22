/** @format */
'use client';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const MobileMenuContent = dynamic(() => import('./mobile-menu-content'), {
	ssr: false,
});

export default function MenuMobile() {
	const [open, setOpen] = useState(false);

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger
				onClick={(e) => e.stopPropagation()}
				asChild
				className={`fixed top-4 left-3 z-50`}>
				<Button
					onClick={(e) => e.stopPropagation()}
					aria-label='Abrir menu de navegação'
					size={'icon'}
					className='bg-transparent'>
					<Menu size={22} />
				</Button>
			</SheetTrigger>
			{open ? <MobileMenuContent onNavigate={() => setOpen(false)} /> : null}
		</Sheet>
	);
}
