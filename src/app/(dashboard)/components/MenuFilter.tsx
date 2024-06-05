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
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { formSchemaFilter } from '@/lib/formSchemaFilter';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { DatePresets } from './DatePresets';

export default function MenuFilter() {
	const form = useForm<z.infer<typeof formSchemaFilter>>({
		resolver: zodResolver(formSchemaFilter),
		defaultValues: {
			startDate: new Date('01/01/2024'),
			endDate: new Date(),
			room: [''],
			unity: [''],
		},
	});

	return (
		<Sheet>
			<SheetTrigger className='text-zinc-950 flex items-center justify-center gap-4 font-bold h-full w-full'>
				Filtrar
				<SlidersHorizontal size={20} />
			</SheetTrigger>
			<SheetContent className='bg-zinc-950 text-zinc-50 flex flex-col gap-20'>
				<SheetHeader className='text-zinc-50'>
					<SheetTitle className='text-zinc-50'>
						Selecione as opções para filtrar
					</SheetTitle>
					<SheetDescription className='text-zinc-200'>
						Após selecionar os filtros clique em atualizar para ver as mudanças
						no dashboard
					</SheetDescription>
				</SheetHeader>
				<Card className='bg-zinc-800'>
					<CardContent>
						<Form {...form}>
							<form className='grid gap-4 pt-4 '>
								<FormField
									control={form.control}
									name='startDate'
									render={({ field }) => (
										<FormItem>
											<FormLabel className='text-zinc-100'>
												Data Inicial
											</FormLabel>
											<FormControl>
												<DatePresets />
											</FormControl>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='endDate'
									render={({ field }) => (
										<FormItem>
											<FormLabel className='text-zinc-100'>
												Data Final
											</FormLabel>
											<FormControl>
												<DatePresets />
											</FormControl>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='room'
									render={({ field }) => (
										<FormItem>
											<FormLabel className='text-zinc-100'>
												Categoria da Suíte
											</FormLabel>
											<FormControl>
												<Input
													className='bg-zinc-700 text-zinc-100 placeholder:text-zinc-400 border border-zinc-600'
													type='text'
													{...field}
													placeholder='Categoria de Suíte Desejada'
													required
												/>
											</FormControl>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='unity'
									render={({ field }) => (
										<FormItem>
											<FormLabel className='text-zinc-100'>Unidade</FormLabel>
											<FormControl>
												<Input
													className='bg-zinc-700 text-zinc-100 placeholder:text-zinc-400 border border-zinc-600'
													type='text'
													{...field}
													placeholder='Unidade desejada'
													required
												/>
											</FormControl>
										</FormItem>
									)}
								/>
								<Button className='bg-violet-400 text-zinc-950 font-semibold hover:bg-violet-500'>
									Atualizar Dashboard
								</Button>
							</form>
						</Form>
					</CardContent>
				</Card>
				<SheetFooter></SheetFooter>
			</SheetContent>
		</Sheet>
	);
}
