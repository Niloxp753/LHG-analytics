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
import { useIntentPrefetch } from '@/hooks/use-intent-prefetch';
import {
	CalendarRange,
	Check,
	ChevronsUpDown,
	Loader2,
} from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useRef, useState, useTransition } from 'react';

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
	const isPointerSelecting = useRef(false);
	const intent = useIntentPrefetch();
	const preSet = searchParams.get('set') || DEFAULT_RANGE_TAG;
	const menu = searchParams.get('menu') || pathname.split('/')[1] || 'general';
	const hasCustomDates =
		searchParams.has('startDate') || searchParams.has('endDate');
	const selectedLabel = hasCustomDates
		? 'Período personalizado'
		: getRangeLabel(preSet) || getRangeLabel(DEFAULT_RANGE_TAG);
	const periods = getAvailableRangeTags();

	function getPeriodHref(tag: string) {
		return `${pathname}?menu=${menu}&set=${tag}`;
	}

	function handleOpenChange(nextOpen: boolean) {
		if (!nextOpen) {
			for (const period of periods) {
				intent.cancel(getPeriodHref(period.tag));
			}
		}
		setOpen(nextOpen);
	}

	return (
		<div className={cn('w-full lg:w-fit', className)}>
			<Popover
				open={open}
				onOpenChange={handleOpenChange}>
				<PopoverTrigger asChild>
					<Button
						aria-expanded={open}
						aria-label='Selecionar período'
						disabled={isPending}
						role='combobox'
						variant='outline'
						className='w-full justify-between gap-2 border-zinc-700 bg-zinc-800 px-3 font-medium normal-case text-zinc-100 hover:border-violet-400 hover:bg-zinc-800 hover:text-white lg:w-fit lg:min-w-40'>
						<span className='flex items-center gap-2 whitespace-nowrap'>
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
							<span>{selectedLabel}</span>
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
									const href = getPeriodHref(period.tag);
									const enabled = shouldNavigateToHref(
										pathname,
										searchParams.entries(),
										href,
									);

									return (
										<CommandItem
											aria-current={isSelected ? 'true' : undefined}
											tabIndex={0}
											key={period.tag}
											value={period.label}
											onPointerEnter={() => intent.schedule(href, enabled)}
											onPointerLeave={() => {
												isPointerSelecting.current = false;
												intent.cancel(href);
											}}
											onPointerDown={() => {
												isPointerSelecting.current = true;
												intent.cancel(href);
											}}
											onPointerUp={() => {
												isPointerSelecting.current = false;
											}}
											onPointerCancel={() => {
												isPointerSelecting.current = false;
											}}
											onFocus={() => {
												if (!isPointerSelecting.current) {
													intent.prefetchNow(href, enabled);
												}
											}}
											onSelect={() => {
												handleOpenChange(false);
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
