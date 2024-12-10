/** @format */

import React from 'react';
import CardDetails from '@/app/(dashboard)/_components/CardDetails';
import { Skeleton } from '@/_components/ui/skeleton';
import { Eye, HandCoins, Leaf, LeafyGreen } from 'lucide-react';

interface BigNumbersOperationProps {
	data?: any[];
	description: string;
}

export default function BigNumbersOperation({
	description,
	data,
}: BigNumbersOperationProps) {
	return (
		<>
			{data ? (
				data?.map((d, index) => {
					return (
						<div
							key={index}
							className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
							<CardDetails
								description={
									d.previousDate &&
									description +
										d.previousDate.totalAllSuitesCleaningsPreviousData
								}
								icon={<Leaf />}
								title={'Total de Suítes Limpas'}
								value={d.currentDate.totalAllSuitesCleanings}
							/>
							<CardDetails
								description={
									d.previousDate &&
									description +
										d.previousDate.totalAllAverageDailyCleaningPreviousData
								}
								icon={<LeafyGreen />}
								title={'Média de Limpezas Por Dia'}
								value={d.currentDate.totalAllAverageDailyCleaning}
							/>
							<CardDetails
								description={
									d.previousDate &&
									description + d.previousDate.totalAllInspectionsPreviousData
								}
								icon={<Eye />}
								title={'Total de Inspeções'}
								value={d.currentDate.totalAllInspections}
							/>
						</div>
					);
				})
			) : (
				<div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
					<Skeleton className='w-full h-24' />
					<Skeleton className='w-full h-24' />
					<Skeleton className='w-full h-24' />
				</div>
			)}
		</>
	);
}
