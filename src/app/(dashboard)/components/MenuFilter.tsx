/** @format */

import React from 'react';
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { SlidersHorizontal } from 'lucide-react';

export default function MenuFilter() {
	return (
		<Sheet>
			<SheetTrigger className='text-zinc-950 flex items-center justify-center gap-4 text-xl font-bold h-full w-full'>
				Filtrar
				<SlidersHorizontal />
			</SheetTrigger>
			<SheetContent className='bg-zinc-950 text-zinc-50'>
				<SheetHeader className='text-zinc-50'>
					<SheetTitle className='text-zinc-50'>
						Are you absolutely sure?
					</SheetTitle>
					<SheetDescription className='text-zinc-200'>
						This action cannot be undone. This will permanently delete your
						account and remove your data from our servers.
					</SheetDescription>
				</SheetHeader>
			</SheetContent>
		</Sheet>
	);
}
