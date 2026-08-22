/** @format */

'use client';

import { Button } from '@/components/ui/button';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import {
	canAccessRoute,
	type DashboardModulePath,
	UNIT_LABELS,
	UNIT_TO_SLUG,
	UNIT_VALUES,
} from '@/lib/access-control';
import { useIntentPrefetch } from '@/hooks/use-intent-prefetch';
import { shouldNavigateToHref } from '@/lib/navigation-target';
import { cn } from '@/lib/utils';
import { useSessionStore } from '@/stores/session-store';
import { ArrowUpRight, Building2, ChevronsUpDown } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { resolveUnitPaletteFromLabels } from './charts/consolidated-unit-palette';

type UnitNavigationProps = {
	className?: string;
	endDate?: string;
	modulePath: DashboardModulePath;
	preSet: string;
	startDate?: string;
};

export default function UnitNavigation({
	className,
	endDate,
	modulePath,
	preSet,
	startDate,
}: UnitNavigationProps) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const intent = useIntentPrefetch();
	const [open, setOpen] = useState(false);
	const status = useSessionStore((state) => state.status);
	const user = useSessionStore((state) => state.user);
	const search = new URLSearchParams({ menu: modulePath, set: preSet });

	if (startDate) {
		search.set('startDate', startDate);
	}
	if (endDate) {
		search.set('endDate', endDate);
	}

	const units = UNIT_VALUES.map((unit) => {
										const href = `/${modulePath}/${UNIT_TO_SLUG[unit]}?${search.toString()}`;

		return {
			href,
			label: UNIT_LABELS[unit],
			unit,
		};
	}).filter((unit) => canAccessRoute(user, unit.href));
	const colors = resolveUnitPaletteFromLabels(
		units.map((unit) => unit.label),
	);
	const isLoading = status === 'idle' || status === 'loading';

	return (
		<div className={cn('w-full', className)}>
			<Popover
				open={open}
				onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						aria-expanded={open}
						aria-label='Selecionar unidade'
						disabled={isLoading || units.length === 0}
						role='combobox'
						variant='outline'
						className='w-full justify-between gap-3 border-zinc-700 bg-zinc-800 px-3 font-medium normal-case text-zinc-100 hover:border-violet-400 hover:bg-zinc-800 hover:text-white'>
						<span className='flex items-center gap-2'>
							<Building2
								aria-hidden='true'
								className='size-4 text-violet-400'
							/>
							{isLoading ? 'Carregando unidades...' : 'Selecionar unidade'}
						</span>
						<ChevronsUpDown
							aria-hidden='true'
							className='size-4 text-zinc-400'
						/>
					</Button>
				</PopoverTrigger>
				<PopoverContent
					align='end'
					className='w-[var(--radix-popover-trigger-width)] border-zinc-700 bg-zinc-900 p-0'>
					<Command className='bg-zinc-900 text-zinc-100 [&_[cmdk-input-wrapper]]:border-b-0'>
						<CommandInput
							aria-label='Buscar unidade'
							placeholder='Buscar unidade...'
							className='text-zinc-100'
						/>
						<CommandList className='selector-scrollbar'>
							<CommandEmpty className='text-zinc-400'>
								Nenhuma unidade encontrada.
							</CommandEmpty>
							<CommandGroup heading='Unidades disponíveis'>
								{units.map((unit, index) => {
									const enabled = shouldNavigateToHref(
										pathname,
										searchParams.entries(),
										unit.href,
									);

									return (
										<CommandItem
											key={unit.unit}
											value={unit.label}
											tabIndex={0}
											onPointerEnter={() => intent.schedule(unit.href, enabled)}
											onPointerLeave={() => intent.cancel(unit.href)}
											onFocus={() => intent.prefetchNow(unit.href, enabled)}
											onPointerDown={() => intent.prefetchNow(unit.href, enabled)}
											onSelect={() => {
												setOpen(false);
												router.push(unit.href);
											}}
											className='gap-3 py-2.5 text-zinc-200 data-[selected=true]:bg-zinc-800 data-[selected=true]:text-white'>
											<span
												aria-hidden='true'
												className='size-2.5 shrink-0 rounded-full ring-2 ring-white/15'
												style={{ backgroundColor: colors[index] ?? '#a78bfa' }}
											/>
											<span className='truncate'>{unit.label}</span>
											<ArrowUpRight
												aria-hidden='true'
												className='ml-auto size-4 text-zinc-500'
											/>
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
