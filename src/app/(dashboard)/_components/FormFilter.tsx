/** @format */

'use client';
import { Button } from '@/_components/ui/button';
import { Calendar } from '@/_components/ui/calendar';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from '@/_components/ui/form';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/_components/ui/popover';
import { formSchemaFilter } from '@/_lib/formSchemaFilter';
import { cn } from '@/_lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { ArrowRight, CalendarIcon, Loader2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export default function FormFilter() {
	const form = useForm<z.infer<typeof formSchemaFilter>>({
		resolver: zodResolver(formSchemaFilter),
	});

	const params = useSearchParams();
	const set = params.get('set') || '7days';
	const menu = params.get('menu');

	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	function onSubmit(data: z.infer<typeof formSchemaFilter>) {
		const { startDate, endDate } = data;
		startTransition(() => {
			try {
				router.push(
					`?menu=${menu}&set=${set}&startDate=${startDate}&endDate=${endDate}`,
				);
				form.reset();
				router.refresh();
			} catch (error) {
				console.log(error);
				toast.error('Erro ao atualizar');
			}
		});
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
										disabled={
											form.formState.isLoading || form.formState.isSubmitting
										}
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
													format(field.value, 'dd/MM/yyyy')
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
										disabled={
											form.formState.isLoading || form.formState.isSubmitting
										}
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
													format(new Date(field.value), 'dd/MM/yyyy')
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
					disabled={
						form.formState.isLoading ||
						form.formState.isSubmitting ||
						!form.formState.isValid ||
						isPending
					}
					className='bg-violet-400 w-full text-zinc-950 font-semibold hover:bg-violet-500 mt-4 flex gap-2'>
					{form.formState.isLoading ||
					form.formState.isSubmitting ||
					isPending ? (
						<>
							<p> Atualizar Dashboard</p>
							<Loader2 className='animate-spin size-5' />
						</>
					) : (
						<>
							<p> Atualizar Dashboard</p>
							<ArrowRight className='size-5' />
						</>
					)}
				</Button>
			</form>
		</Form>
	);
}
