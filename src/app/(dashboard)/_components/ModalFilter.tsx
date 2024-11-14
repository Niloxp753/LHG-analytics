/** @format */
'use client';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import FormFilter from './FormFilter';
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
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export default function ModalFilter() {
	const form = useForm<z.infer<typeof formSchemaFilter>>({
		resolver: zodResolver(formSchemaFilter),
	});

	const [pending, setPending] = useState(false);

	async function onSubmit(data: z.infer<typeof formSchemaFilter>) {
		try {
			setPending(true);
			toast.success('You submitted the following values:', {
				description: (
					<pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
						<code className='text-white'>{JSON.stringify(data, null, 2)}</code>
					</pre>
				),
			});
		} catch (error) {
			console.log(error);
			setPending(false);
		}
	}
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className='bg-violet-400 font-semibold text-foreground'>
					Data Personalizada
				</Button>
			</DialogTrigger>
			<DialogContent className='max-w-[364px] md:max-w-md dark'>
				<DialogHeader>
					<DialogTitle className='text-foreground'>
						Data Personalizada
					</DialogTitle>
					<DialogDescription>
						Indique a data inicial e final e atualize o dashboard
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						className='flex flex-col  items-center gap-5 pt-4 w-full'
						onSubmit={form.handleSubmit(onSubmit)}>
						<div className='flex flex-col  justify-between gap-5 w-full'>
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
															format(field.value, 'PPP')
														) : (
															<span>Escolha uma data</span>
														)}
														<CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
													</Button>
												</FormControl>
											</PopoverTrigger>
											<PopoverContent
												className='w-auto p-0 dark z-50'
												align='start'>
												<Calendar
													className='z-50'
													mode='single'
													selected={field.value}
													onSelect={field.onChange}
													disabled={(date) =>
														date > new Date() || date < new Date('1900-01-01')
													}
													initialFocus
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
												className='w-full md:w-auto p-0 dark z-50'
												align='start'>
												<Calendar
													mode='single'
													selected={field.value}
													onSelect={field.onChange}
													disabled={(date) =>
														date > new Date() || date < new Date('1900-01-01')
													}
													initialFocus
												/>
											</PopoverContent>
										</Popover>
									</FormItem>
								)}
							/>
						</div>

						<Button
							type='submit'
							disabled={pending}
							className='bg-violet-400 w-full text-zinc-950 font-semibold hover:bg-violet-500 mt-4'>
							Atualizar Dashboard
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
