/** @format */

import CardDetails from '@/app/(dashboard)/_components/CardDetails';
import GenerateBadge from '@/app/(dashboard)/general/_components/generate-badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import EmptyState from '@/app/(dashboard)/_components/EmptyState';
import { OperationalBigNumbersEntry } from '@/types/big-numbers-operational';
import { generateDescription } from '@/utils/generate-description';
import { Eye, Leaf, LeafyGreen } from 'lucide-react';

interface BigNumbersOperationProps {
	data?: OperationalBigNumbersEntry[] | null;
	description: string;
}

export default function BigNumbersOperation({
	description,
	data,
}: BigNumbersOperationProps) {
	const isLoading = typeof data === 'undefined';
	const error = data === null ? 'Não foi possível carregar os dados.' : undefined;
	const entry = data?.[0];

	if (isLoading) {
		return (
			<div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
				{Array.from({ length: 3 }).map((_, index) => (
					<Skeleton key={index} className='h-[140px] w-full' />
				))}
			</div>
		);
	}

	if (error) {
		return (
			<Alert variant='destructive' className='w-full'>
				<AlertTitle>Erro ao carregar</AlertTitle>
				<AlertDescription>{error}</AlertDescription>
			</Alert>
		);
	}

	if (!entry) {
		return <EmptyState title='Sem dados' minHeight={140} />;
	}

	const currentDate = entry.currentDate;
	const previousDate = entry.previousDate;
	const monthlyForecast = entry.monthlyForecast;
	const suitesPrevious = previousDate?.totalAllSuitesCleaningsPreviousData;
	const averageCleaningPrevious =
		previousDate?.totalAllAverageDailyCleaningPreviousData;
	const inspectionsPrevious = previousDate?.totalAllInspectionsPreviousData;

	return (
		<div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
			<CardDetails
				showForecast={!!monthlyForecast}
				description={
					typeof suitesPrevious === 'number'
						? generateDescription(
								description,
								suitesPrevious,
						  )
						: ''
				}
				icon={<Leaf />}
				title={'Total de Suítes Limpas'}
				monthlyForecast={
					monthlyForecast
						? (monthlyForecast?.totalAllSuitesCleaningsForecast ?? undefined)
						: undefined
				}
				value={currentDate.totalAllSuitesCleanings.toLocaleString('pt-br')}
				Badge={
					typeof suitesPrevious === 'number' && (
						<GenerateBadge
							val={currentDate.totalAllSuitesCleanings}
							previousVal={suitesPrevious}
						/>
					)
				}
			/>
			<CardDetails
				showForecast={!!monthlyForecast}
				description={
					typeof averageCleaningPrevious === 'number'
						? generateDescription(
								description,
								averageCleaningPrevious,
						  )
						: ''
				}
				icon={<LeafyGreen />}
				title={'Média de Limpezas por Dia'}
				monthlyForecast={
					monthlyForecast
						? (monthlyForecast?.totalAllAverageDailyCleaningForecast ??
							undefined)
						: undefined
				}
				value={currentDate.totalAllAverageDailyCleaning.toLocaleString(
					'pt-br',
				)}
				Badge={
					typeof averageCleaningPrevious === 'number' && (
						<GenerateBadge
							val={currentDate.totalAllAverageDailyCleaning}
							previousVal={averageCleaningPrevious}
						/>
					)
				}
			/>
			<CardDetails
				showForecast={!!monthlyForecast}
				description={
					typeof inspectionsPrevious === 'number'
						? generateDescription(
								description,
								inspectionsPrevious,
						  )
						: ''
				}
				icon={<Eye />}
				title={'Total de Inspeções'}
				monthlyForecast={
					monthlyForecast
						? (monthlyForecast?.totalAllInspectionsForecast ?? undefined)
						: undefined
				}
				value={currentDate.totalAllInspections.toLocaleString('pt-br')}
				Badge={
					typeof inspectionsPrevious === 'number' && (
						<GenerateBadge
							val={currentDate.totalAllInspections}
							previousVal={inspectionsPrevious}
						/>
					)
				}
			/>
		</div>
	);
}
