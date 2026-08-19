/** @format */

'use client';

import { Button } from '@/components/ui/button';
import {
	Command,
	CommandGroup,
	CommandItem,
	CommandList,
} from '@/components/ui/command';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import {
	DEFAULT_RANGE_TAG,
	getAvailableRangeTags,
	getRangeLabel,
} from '@/lib/date-range';
import { shouldNavigateToHref } from '@/lib/navigation-target';
import { cn } from '@/lib/utils';
import {
	CalendarRange,
	Check,
	ChevronsUpDown,
	Loader2,
} from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';

type PeriodSelectorProps = {
	className?: string;
	onNavigate?: () => void;
};

export default function PeriodSelector({
	className,
	onNavigate,
}: PeriodSelectorProps) {
	const pathname = usePathname();
	const router = useRouter();
	const searchParams = useSearchParams();
	const [open, setOpen] = useState(false);
	const [isPending, startTransition] = useTransition();
	const preSet = searchParams.get('set') || DEFAULT_RANGE_TAG;
	const menu = searchParams.get('menu') || pathname.split('/')[1] || 'general';
	const hasCustomDates =
		searchParams.has('startDate') || searchParams.has('endDate');
	const selectedLabel = hasCustomDates
		? 'Período personalizado'
		: getRangeLabel(preSet) || getRangeLabel(DEFAULT_RANGE_TAG);
	const periods = getAvailableRangeTags();

	return (
		<div className={cn('w-full', className)}>
			<Popover
				open={open}
				onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						aria-expanded={open}
						aria-label='Selecionar período'
						disabled={isPending}
						role='combobox'
						variant='outline'
						className='w-full justify-between gap-2 border-zinc-700 bg-zinc-800 px-3 font-medium normal-case text-zinc-100 hover:border-violet-400 hover:bg-zinc-800 hover:text-white'>
						<span className='flex min-w-0 items-center gap-2'>
							{isPending ? (
								<Loader2
									aria-hidden='true'
									className='size-4 shrink-0 animate-spin text-violet-400'
								/>
							) : (
								<CalendarRange
									aria-hidden='true'
									className='size-4 shrink-0 text-violet-400'
								/>
							)}
							<span className='truncate'>{selectedLabel}</span>
						</span>
						<ChevronsUpDown
							aria-hidden='true'
							className='size-4 shrink-0 text-zinc-400'
						/>
					</Button>
				</PopoverTrigger>
				<PopoverContent
					align='start'
					className='w-[var(--radix-popover-trigger-width)] border-zinc-700 bg-zinc-900 p-0'>
					<Command className='bg-zinc-900 text-zinc-100'>
						<CommandList>
							<CommandGroup heading='Períodos disponíveis'>
								{periods.map((period) => {
									const isSelected = !hasCustomDates && period.tag === preSet;
									const href = `?menu=${menu}&set=${period.tag}`;

									return (
										<CommandItem
											aria-current={isSelected ? 'true' : undefined}
											key={period.tag}
											value={period.label}
											onFocus={() => router.prefetch(href)}
											onMouseEnter={() => router.prefetch(href)}
											onSelect={() => {
												setOpen(false);
												if (
													!shouldNavigateToHref(
														pathname,
														searchParams.entries(),
														href,
													)
												) {
													return;
												}
												onNavigate?.();
												startTransition(() => router.push(href));
											}}
											className='gap-2 py-2.5 text-zinc-200 data-[selected=true]:bg-zinc-800 data-[selected=true]:text-white'>
											<Check
												aria-hidden='true'
												className={cn(
													'size-4 text-violet-400',
													isSelected ? 'opacity-100' : 'opacity-0',
												)}
											/>
											{period.label}
										</CommandItem>
									);
								})}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
		</div>
	);
}
