/** @format */

import CardDetails from '@/app/(dashboard)/_components/CardDetails';
import GenerateBadge from '@/app/(dashboard)/general/_components/generate-badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Eye, Leaf, LeafyGreen } from 'lucide-react';

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
								Badge={
									<GenerateBadge
										val={d.currentDate.totalAllSuitesCleanings}
										previousVal={
											d.previousDate.totalAllSuitesCleaningsPreviousData
										}
									/>
								}
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
								Badge={
									<GenerateBadge
										val={d.currentDate.totalAllAverageDailyCleaning}
										previousVal={
											d.previousDate.totalAllAverageDailyCleaningPreviousData
										}
									/>
								}
							/>
							<CardDetails
								description={
									d.previousDate &&
									description + d.previousDate.totalAllInspectionsPreviousData
								}
								icon={<Eye />}
								title={'Total de Inspeções'}
								value={d.currentDate.totalAllInspections}
								Badge={
									<GenerateBadge
										val={d.currentDate.totalAllInspections}
										previousVal={d.previousDate.totalAllInspectionsPreviousData}
									/>
								}
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
