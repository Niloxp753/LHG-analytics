/** @format */

'use client';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { formSchemaFilter } from '@/lib/formSchemaFilter';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Separator } from '@/components/ui/separator';

export default function FormFilter() {
	const form = useForm<z.infer<typeof formSchemaFilter>>({
		resolver: zodResolver(formSchemaFilter),
		defaultValues: {
			startDate: new Date('01/01/2024'),
			endDate: new Date(),
			location: [''],
			unity: [''],
			category: [''],
		},
	});

	const locationsName = [
		{
			id: '1',
			name: '3 Horas',
			value: 1100,
		},
		{
			id: '2',
			name: '6 Horas',
			value: 1000,
		},
		{
			id: '3',
			name: '12 Horas',
			value: 890,
		},
		{
			id: '4',
			name: 'Day Use',
			value: 1300,
		},
		{
			id: '5',
			name: 'Diária',
			value: 1250,
		},
		{
			id: '6',
			name: 'Pernoite',
			value: 1400,
		},
	];

	const unityName = [
		{
			id: '1',
			name: 'Lush Ipiranga',
			value: 1100,
		},
		{
			id: '2',
			name: 'Lush Guarujá',
			value: 1000,
		},
		{
			id: '3',
			name: 'Tout Campinas',
			value: 890,
		},
		{
			id: '4',
			name: 'Andar de Cima',
			value: 1300,
		},
	];

	const suiteName = [
		{
			id: '1',
			name: 'Lush',
			value: 1100,
		},
		{
			id: '2',
			name: 'Lush Pop',
			value: 1000,
		},
		{
			id: '3',
			name: 'Lush Hidro',
			value: 890,
		},
		{
			id: '4',
			name: 'Lush Lounge',
			value: 1300,
		},
		{
			id: '5',
			name: 'Lush Spa',
			value: 1250,
		},
		{
			id: '6',
			name: 'Lush Cine',
			value: 1400,
		},
		{
			id: '7',
			name: 'Lush Splash',
			value: 1400,
		},
		{
			id: '8',
			name: 'Lush Spa Splash',
			value: 1400,
		},
		{
			id: '9',
			name: 'Casa Lush',
			value: 1400,
		},
	];

	return (
		<>
			<Form {...form}>
				<form className='grid gap-4 pt-4'>
					<div className='flex items-center justify-between'>
						<FormField
							control={form.control}
							name='startDate'
							render={({ field }) => (
								<FormItem className='flex items-baseline justify-between flex-col w-fit'>
									<FormLabel className='text-zinc-100 font-bold'>
										Data Inicial
									</FormLabel>
									<Popover>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													variant={'outline'}
													className={cn(
														'w-[240px] pl-3 text-left font-normal bg-zinc-800 text-zinc-200',
														!field.value && 'text-muted-foreground',
													)}>
													{field.value ? (
														format(new Date(field.value), 'MMMM yyyy')
													) : (
														<span>Escolha uma data</span>
													)}
													<CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent
											className='w-auto p-0'
											align='start'>
											<Calendar
												mode='single'
												selected={field.value}
												onSelect={field.onChange}
											/>
										</PopoverContent>
									</Popover>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='endDate'
							render={({ field }) => (
								<FormItem className='flex items-baseline justify-between flex-col w-fit'>
									<FormLabel className='text-zinc-100 font-bold'>
										Data Final
									</FormLabel>
									<Popover>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													variant={'outline'}
													className={cn(
														'w-[240px] pl-3 text-left font-normal bg-zinc-800 text-zinc-200',
														!field.value && 'text-muted-foreground',
													)}>
													{field.value ? (
														format(new Date(field.value), 'MMMM yyyy')
													) : (
														<span>Escolha uma data</span>
													)}
													<CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent
											className='w-auto p-0'
											align='start'>
											<Calendar
												mode='single'
												selected={field.value}
												onSelect={field.onChange}
											/>
										</PopoverContent>
									</Popover>
								</FormItem>
							)}
						/>
					</div>
					<Separator className='opacity-50' />
					<div className='flex justify-between items-start'>
						<div>
							<FormField
								control={form.control}
								name='location'
								render={() => (
									<FormItem className='flex flex-col gap-3'>
										<div className='mb-1'>
											<FormLabel className='text-base text-zinc-50 font-bold'>
												Tipo de Locação
											</FormLabel>
										</div>
										<div className='grid grid-cols-2 gap-5'>
											{locationsName.map((location) => (
												<FormField
													key={location.id}
													control={form.control}
													name='location'
													render={({ field }) => {
														return (
															<FormItem
																key={location.id}
																className='flex flex-row items-center space-x-3 space-y-0'>
																<FormControl>
																	<Checkbox
																		checked={field.value?.includes(location.id)}
																		onCheckedChange={(checked) => {
																			return checked
																				? field.onChange([
																						...field.value,
																						location.id,
																				  ])
																				: field.onChange(
																						field.value?.filter(
																							(value) => value !== location.id,
																						),
																				  );
																		}}
																	/>
																</FormControl>
																<FormLabel className='font-normal text-zinc-100 cursor-pointer'>
																	{location.name}
																</FormLabel>
															</FormItem>
														);
													}}
												/>
											))}
										</div>
									</FormItem>
								)}
							/>
						</div>
						<Separator
							orientation='vertical'
							className='opacity-50'
						/>
						<div>
							<FormField
								control={form.control}
								name='unity'
								render={() => (
									<FormItem className='flex flex-col gap-3'>
										<div className='mb-1'>
											<FormLabel className='text-base text-zinc-50 font-bold'>
												Unidade Motel
											</FormLabel>
										</div>
										<div className='grid grid-cols-2 gap-5'>
											{unityName.map((unity) => (
												<FormField
													key={unity.id}
													control={form.control}
													name='unity'
													render={({ field }) => {
														return (
															<FormItem
																key={unity.id}
																className='flex flex-row items-center space-x-3 space-y-0'>
																<FormControl>
																	<Checkbox
																		checked={field.value?.includes(unity.id)}
																		onCheckedChange={(checked) => {
																			return checked
																				? field.onChange([
																						...field.value,
																						unity.id,
																				  ])
																				: field.onChange(
																						field.value?.filter(
																							(value) => value !== unity.id,
																						),
																				  );
																		}}
																	/>
																</FormControl>
																<FormLabel className='font-normal text-zinc-100 cursor-pointer'>
																	{unity.name}
																</FormLabel>
															</FormItem>
														);
													}}
												/>
											))}
										</div>
									</FormItem>
								)}
							/>
						</div>
					</div>
					<Separator className='opacity-50' />
					<div>
						<FormField
							control={form.control}
							name='category'
							render={() => (
								<FormItem className='flex flex-col gap-3'>
									<div className='mb-1'>
										<FormLabel className='text-base text-zinc-50 font-bold'>
											Categoria de Suíte
										</FormLabel>
									</div>
									<div className='grid grid-cols-3 gap-5 w-full'>
										{suiteName.map((suite) => (
											<FormField
												key={suite.id}
												control={form.control}
												name='category'
												render={({ field }) => {
													return (
														<FormItem
															key={suite.id}
															className='flex flex-row items-center space-x-3 space-y-0'>
															<FormControl>
																<Checkbox
																	checked={field.value?.includes(suite.id)}
																	onCheckedChange={(checked) => {
																		return checked
																			? field.onChange([
																					...field.value,
																					suite.id,
																			  ])
																			: field.onChange(
																					field.value?.filter(
																						(value) => value !== suite.id,
																					),
																			  );
																	}}
																/>
															</FormControl>
															<FormLabel className='font-normal text-zinc-100 cursor-pointer'>
																{suite.name}
															</FormLabel>
														</FormItem>
													);
												}}
											/>
										))}
									</div>
								</FormItem>
							)}
						/>
					</div>
					<Button className='bg-violet-400 text-zinc-950 font-semibold hover:bg-violet-500 mt-4'>
						Atualizar Dashboard
					</Button>
				</form>
			</Form>
		</>
	);
}
