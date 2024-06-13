/** @format */

'use client';

import React from 'react';
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { SlidersHorizontal } from 'lucide-react';
import FormFilter from './FormFilter';
import { Card, CardContent } from '@/components/ui/card';

export default function MenuFilter() {
	return (
		<Sheet>
			<SheetTrigger className='text-zinc-950 py-1 w-fit px-3 text-sm rounded flex items-center justify-center gap-4 font-bold h-full bg-violet-400 hover:bg-violet-500 transition-all duration-300 ease-linear cursor-pointer'>
				Filtrar
				<SlidersHorizontal size={20} />
			</SheetTrigger>
			<SheetContent className='bg-zinc-950 text-zinc-50 flex flex-col gap-8'>
				<SheetHeader className='text-zinc-50'>
					<SheetTitle className='text-zinc-50'>
						Selecione as opções para filtrar
					</SheetTitle>
					<SheetDescription className='text-zinc-200'>
						Após selecionar os filtros clique em atualizar para ver as mudanças
						no dashboard
					</SheetDescription>
				</SheetHeader>
				<Card className='bg-zinc-800 p-2 max-w-[600px] mx-auto'>
					<CardContent>
						<FormFilter />
					</CardContent>
				</Card>
			</SheetContent>
		</Sheet>
	);
}
