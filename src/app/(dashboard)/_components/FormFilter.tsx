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
import { CalendarIcon, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export default function FormFilter() {
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
		setPending(false);
	}

	return (
		<Form {...form}>
			<form
				className='flex flex-col md:flex-row items-center gap-5 w-full'
				onSubmit={form.handleSubmit(onSubmit)}>
				<div className='flex flex-col md:flex-row items-center justify-between gap-5 w-full'>
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
										disabled={pending}
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
										className='w-auto p-0 dark'
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
										disabled={pending}
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
					{pending ? (
						<Loader2 className='animate-spin size-5' />
					) : (
						<p> Atualizar Dashboard</p>
					)}
				</Button>
			</form>
		</Form>
	);
}
