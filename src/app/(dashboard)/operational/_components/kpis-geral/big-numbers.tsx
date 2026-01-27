/** @format */

import CardDetails from '@/app/(dashboard)/_components/CardDetails';
import GenerateBadge from '@/app/(dashboard)/general/_components/generate-badge';
import { OperationalBigNumbersEntry } from '@/types/big-numbers-operational';
import { generateDescription } from '@/utils/generate-description';
import { Eye, Leaf, LeafyGreen } from 'lucide-react';

interface BigNumbersPageOpProps {
	data: OperationalBigNumbersEntry[];
	description: string;
}

export default function BigNumbersPageOp({
	description,
	data,
}: BigNumbersPageOpProps) {
	const currentDate = data[0].currentDate;
	const previousDate = data[0].previousDate;
	const monthlyForecast = data[0].monthlyForecast;

	return (
		<div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
			<CardDetails
				showForecast={!!monthlyForecast}
				description={
					previousDate?.totalAllSuitesCleaningsPreviousData !== null
						? generateDescription(
								description,
								previousDate?.totalAllSuitesCleaningsPreviousData,
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
				value={currentDate?.totalAllSuitesCleanings.toLocaleString('pt-br')}
				Badge={
					previousDate?.totalAllSuitesCleaningsPreviousData !== null && (
						<GenerateBadge
							val={currentDate?.totalAllSuitesCleanings}
							previousVal={previousDate?.totalAllSuitesCleaningsPreviousData!}
						/>
					)
				}
			/>
			<CardDetails
				showForecast={!!monthlyForecast}
				description={
					previousDate?.totalAllAverageDailyCleaningPreviousData !== null
						? generateDescription(
								description,
								previousDate?.totalAllAverageDailyCleaningPreviousData,
							)
						: ''
				}
				icon={<LeafyGreen />}
				title={'Média de Limpezas Por Dia'}
				monthlyForecast={
					monthlyForecast
						? (monthlyForecast?.totalAllAverageDailyCleaningForecast ??
							undefined)
						: undefined
				}
				value={currentDate?.totalAllAverageDailyCleaning.toLocaleString(
					'pt-br',
				)}
				Badge={
					previousDate?.totalAllAverageDailyCleaningPreviousData !== null && (
						<GenerateBadge
							val={currentDate?.totalAllAverageDailyCleaning}
							previousVal={
								previousDate?.totalAllAverageDailyCleaningPreviousData!
							}
						/>
					)
				}
			/>
			<CardDetails
				showForecast={!!monthlyForecast}
				description={
					previousDate?.totalAllInspectionsPreviousData !== null
						? generateDescription(
								description,
								previousDate?.totalAllInspectionsPreviousData,
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
				value={currentDate?.totalAllInspections.toLocaleString('pt-br')}
				Badge={
					previousDate?.totalAllInspectionsPreviousData !== null && (
						<GenerateBadge
							val={currentDate?.totalAllInspections}
							previousVal={previousDate?.totalAllInspectionsPreviousData!}
						/>
					)
				}
			/>
		</div>
	);
}
