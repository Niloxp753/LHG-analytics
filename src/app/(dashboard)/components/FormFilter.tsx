/** @format */

'use client';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { formSchemaFilter } from '@/lib/formSchemaFilter';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function FormFilter() {
	const form = useForm<z.infer<typeof formSchemaFilter>>({
		resolver: zodResolver(formSchemaFilter),
		defaultValues: {
			startDate: new Date('06/01/2024'),
			endDate: new Date(),
		},
	});

	return (
		<>
			<Form {...form}>
				<form className='grid gap-5 pt-4 w-full'>
					<div className='flex items-center justify-between gap-5 w-full'>
						<FormField
							control={form.control}
							name='startDate'
							render={({ field }) => (
								<FormItem className='flex items-baseline justify-between flex-col w-fit'>
									<FormLabel className='text-zinc-100 font-bold'>
										Data Inicial
									</FormLabel>
									<Popover>
										<PopoverTrigger
											className='dark'
											asChild>
											<FormControl>
												<Button
													variant={'outline'}
													className={cn(
														'w-[220px] pl-3 text-left font-normal border-none bg-zinc-800 text-zinc-200',
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
											className='w-auto p-0 dark'
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
										<PopoverTrigger
											className='dark'
											asChild>
											<FormControl>
												<Button
													variant={'outline'}
													className={cn(
														'w-[220px] pl-3 text-left font-normal border-none bg-zinc-800 text-zinc-200',
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
											className='w-auto p-0 dark'
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

					<Button className='bg-violet-400 text-zinc-950 font-semibold hover:bg-violet-500 mt-4'>
						Atualizar Dashboard
					</Button>
				</form>
			</Form>
		</>
	);
}
