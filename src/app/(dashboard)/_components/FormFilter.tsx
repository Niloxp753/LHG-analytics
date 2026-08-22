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
import { DEFAULT_RANGE_TAG, formatDateInput } from '@/lib/date-range';
import { formSchemaFilter } from '@/lib/formSchemaFilter';
import { shouldNavigateToHref } from '@/lib/navigation-target';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon, Loader2, RefreshCcw } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export default function FormFilter({
	className,
	popoverPortalled = true,
}: {
	className?: string;
	popoverPortalled?: boolean;
}) {
	const formInstancePrefix = popoverPortalled ? 'header' : 'mobile';
	const startDateFieldId = `${formInstancePrefix}-start-date`;
	const endDateFieldId = `${formInstancePrefix}-end-date`;
	const startDatePopoverId = `${formInstancePrefix}-start-date-popover`;
	const endDatePopoverId = `${formInstancePrefix}-end-date-popover`;

	const form = useForm<z.infer<typeof formSchemaFilter>>({
		resolver: zodResolver(formSchemaFilter),
		mode: 'onChange',
	});

	const params = useSearchParams();
	const pathname = usePathname();
	const set = params.get('set') || DEFAULT_RANGE_TAG;
	const menu = params.get('menu');

	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	function onSubmit(data: z.infer<typeof formSchemaFilter>) {
		const { startDate, endDate } = data;
		const formattedStartDate = formatDateInput(startDate);
		const formattedEndDate = formatDateInput(endDate);
		if (!formattedStartDate || !formattedEndDate) {
			toast.error('Datas inválidas');
			return;
		}
		const href = `?menu=${menu}&set=${set}&startDate=${formattedStartDate}&endDate=${formattedEndDate}`;
		if (!shouldNavigateToHref(pathname, params.entries(), href)) {
			return;
		}
		startTransition(() => {
			try {
				router.push(href);
			} catch (error) {
				console.log(error);
				toast.error('Erro ao atualizar');
			}
		});
	}

	return (
		<Form {...form}>
			<form
				className={cn(
					'flex w-full flex-col gap-3 z-50 lg:flex-row lg:items-end lg:gap-2',
					className,
				)}
				onSubmit={form.handleSubmit(onSubmit)}>
				<div className='flex w-full flex-col gap-3 lg:w-auto lg:flex-row lg:items-end lg:gap-2'>
					<FormField
						control={form.control}
						name='startDate'
						render={({ field }) => (
							<FormItem
								id={startDateFieldId}
								className='flex w-full flex-col justify-between lg:w-fit lg:shrink-0'>
								<FormLabel className='text-zinc-100 font-bold lg:text-xs xl:text-sm'>
									Data Inicial
								</FormLabel>
								<Popover>
									<PopoverTrigger
										aria-controls={startDatePopoverId}
										onClick={(e) => e.stopPropagation()}
										disabled={
											form.formState.isLoading || form.formState.isSubmitting
										}
										className='dark'
										asChild>
										<FormControl>
											<Button
												onClick={(e) => e.stopPropagation()}
											variant={'outline'}
											className={cn(
												'w-full lg:w-[150px] xl:w-[180px] 2xl:w-[205px] pl-3 text-left font-normal border-none bg-zinc-800 text-zinc-200',
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
										id={startDatePopoverId}
										portalled={popoverPortalled}
										className='w-auto p-0 dark z-[70]'
										align='start'>
										<Calendar
											mode='single'
											selected={field.value}
											onSelect={field.onChange}
											disabled={(date) =>
												date > new Date() || date < new Date('1900-01-01')
											}
											initialFocus={popoverPortalled}
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
							<FormItem
								id={endDateFieldId}
								className='flex w-full flex-col justify-between lg:w-fit lg:shrink-0'>
								<FormLabel className='text-zinc-100 font-bold lg:text-xs xl:text-sm'>
									Data Final
								</FormLabel>
								<Popover>
									<PopoverTrigger
										aria-controls={endDatePopoverId}
										disabled={
											form.formState.isLoading || form.formState.isSubmitting
										}
										className='dark'
										asChild>
										<FormControl>
											<Button
											variant={'outline'}
											className={cn(
												'w-full lg:w-[150px] xl:w-[180px] 2xl:w-[205px] pl-3 text-left font-normal border-none bg-zinc-800 text-zinc-200',
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
										id={endDatePopoverId}
										portalled={popoverPortalled}
										className='w-full md:w-auto p-0 dark z-[70]'
										align='start'>
										<Calendar
											mode='single'
											selected={field.value}
											onSelect={field.onChange}
											disabled={(date) =>
												date > new Date() || date < new Date('1900-01-01')
											}
											initialFocus={popoverPortalled}
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
					className='bg-violet-400 w-full lg:w-fit lg:shrink-0 text-zinc-950 font-semibold hover:bg-violet-500 flex gap-2'>
					{form.formState.isLoading ||
					form.formState.isSubmitting ||
					isPending ? (
						<>
							<p> Atualizar</p>
							<Loader2 className='animate-spin size-5' />
						</>
					) : (
						<>
							<p> Atualizar</p>
							<RefreshCcw className='size-5' />
						</>
					)}
				</Button>
			</form>
		</Form>
	);
}
