/** @format */

import { Skeleton } from '@/components/ui/skeleton';
import BigNumbersOperation from '../../_components/kpis-unidade/big-numbers-operation';
import type { OperationalAltanaDataSectionProps } from './unit-data-section';

export function OperationalAltanaDataFallback({
	description,
}: Pick<OperationalAltanaDataSectionProps, 'description'>) {
	return (
		<div
			data-testid='operational-altana-unit-loading'
			className='w-full h-full flex gap-5 flex-col'>
			<BigNumbersOperation description={description} />
			<div className='flex items-center gap-5 justify-between flex-col md:flex-row'>
				<Skeleton className='h-[340px] w-full rounded-xl' />
				<Skeleton className='h-[340px] w-full rounded-xl' />
			</div>
			<Skeleton className='h-[360px] w-full rounded-xl' />
			<div className='flex gap-5 flex-col items-center w-full'>
				<Skeleton className='h-[480px] w-full rounded-xl' />
				<Skeleton className='h-[480px] w-full rounded-xl' />
				<Skeleton className='h-[480px] w-full rounded-xl' />
			</div>
			<div className='flex gap-5 flex-col w-full'>
				<Skeleton className='h-[260px] w-full rounded-xl' />
				<Skeleton className='h-[260px] w-full rounded-xl' />
				<Skeleton className='h-[260px] w-full rounded-xl' />
				<Skeleton className='h-[380px] w-full rounded-xl' />
			</div>
		</div>
	);
}
