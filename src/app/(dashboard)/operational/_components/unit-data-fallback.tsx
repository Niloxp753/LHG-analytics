/** @format */

import { Skeleton } from '@/components/ui/skeleton';
import BigNumbersOperation from './kpis-unidade/big-numbers-operation';

type OperationalUnitDataFallbackProps = {
	description: string;
};

export default function OperationalUnitDataFallback({
	description,
}: OperationalUnitDataFallbackProps) {
	return (
		<div
			data-testid='operational-unit-loading'
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
