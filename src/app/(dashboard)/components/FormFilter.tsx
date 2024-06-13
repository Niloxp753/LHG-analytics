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
import {
	MultiSelector,
	MultiSelectorContent,
	MultiSelectorInput,
	MultiSelectorItem,
	MultiSelectorList,
	MultiSelectorTrigger,
} from '@/components/ui/multiSelector';

export const locationsName = [
	'3 Horas',
	'6 Horas',
	'12 Horas',
	'Day Use',
	'Diária',
	'Pernoite',
];

const suiteName = [
	'Lush',
	'Lush Pop',
	'Lush Hidro',
	'Lush Lounge',
	'Lush Spa',
	'Lush Cine',
	'Lush Splash',
	'Lush Spa Splash',
	'Casa Lush',
];

export default function FormFilter() {
	const form = useForm<z.infer<typeof formSchemaFilter>>({
		resolver: zodResolver(formSchemaFilter),
		defaultValues: {
			startDate: new Date('06/01/2024'),
			endDate: new Date(),
			location: locationsName,
			category: suiteName,
		},
	});

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
														'w-[220px] pl-3 text-left font-normal bg-zinc-800 text-zinc-200',
														!field.value && 'text-muted-foreground',
													)}>
													{field.value ? (
														format(new Date(field.value), 'PPP')
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
														'w-[220px] pl-3 text-left font-normal bg-zinc-800 text-zinc-200',
														!field.value && 'text-muted-foreground',
													)}>
													{field.value ? (
														format(new Date(field.value), 'PPP')
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
					<div className='w-full'>
						<FormField
							control={form.control}
							name='category'
							render={({ field }) => (
								<FormItem className='w-full max-w-lg'>
									<FormLabel className='text-zinc-100 font-bold'>
										Categoria da Suíte
									</FormLabel>
									<MultiSelector
										className=' p-0 m-0 border bg-zinc-800 rounded'
										onValuesChange={field.onChange}
										values={field.value}>
										<MultiSelectorTrigger className='p-0 '>
											<MultiSelectorInput
												className='text-zinc-100'
												placeholder='Selecione para filtrar'
											/>
										</MultiSelectorTrigger>
										<MultiSelectorContent className='border'>
											<MultiSelectorList className='bg-zinc-800 text-zinc-100 border'>
												{suiteName.map((unity, index) => {
													return (
														<MultiSelectorItem
															key={index}
															value={unity}>
															{unity}
														</MultiSelectorItem>
													);
												})}
											</MultiSelectorList>
										</MultiSelectorContent>
									</MultiSelector>
								</FormItem>
							)}
						/>
					</div>

					<div className='flex justify-between gap-5 items-start w-full'>
						<div>
							<FormField
								control={form.control}
								name='location'
								render={({ field }) => (
									<FormItem className='w-full max-w-lg'>
										<FormLabel className='text-zinc-100 font-bold'>
											Tipos de Locação
										</FormLabel>
										<MultiSelector
											className='w-fit  p-0 m-0 border bg-zinc-800 rounded'
											onValuesChange={field.onChange}
											values={field.value}>
											<MultiSelectorTrigger className='p-0 '>
												<MultiSelectorInput
													className='text-zinc-100'
													placeholder='Selecione para filtrar'
												/>
											</MultiSelectorTrigger>
											<MultiSelectorContent className='border'>
												<MultiSelectorList className='bg-zinc-800 text-zinc-100 border'>
													{locationsName.map((location, index) => {
														return (
															<MultiSelectorItem
																key={index}
																value={location}>
																{location}
															</MultiSelectorItem>
														);
													})}
												</MultiSelectorList>
											</MultiSelectorContent>
										</MultiSelector>
									</FormItem>
								)}
							/>
						</div>
					</div>

					<Button className='bg-violet-400 text-zinc-950 font-semibold hover:bg-violet-500 mt-4'>
						Atualizar Dashboard
					</Button>
				</form>
			</Form>
		</>
	);
}
