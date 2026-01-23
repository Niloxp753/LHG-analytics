/** @format */

import CardDetails from '@/app/(dashboard)/_components/CardDetails';
import GenerateBadge from '@/app/(dashboard)/general/_components/generate-badge';
import { generateDescription } from '@/utils/generate-description';
import { Eye, Leaf, LeafyGreen } from 'lucide-react';
import { OperationalBigNumbersEntry } from '@/types/big-numbers-operational';

interface BigNumbersPageOpProps {
	ipiranga: OperationalBigNumbersEntry[];
	lapa: OperationalBigNumbersEntry[];
	andar_de_cima: OperationalBigNumbersEntry[];
	tout: OperationalBigNumbersEntry[];
	description: string;
}

export default function BigNumbersPageOp({
	description,
	ipiranga,
	andar_de_cima,
	tout,
	lapa,
}: BigNumbersPageOpProps) {
	const dataIpiranga = ipiranga[0];
	const dataLapa = lapa[0];
	const dataAndar = andar_de_cima[0];
	const dataTout = tout[0];

	const totalAllSuitesCleanings =
		dataIpiranga.currentDate.totalAllSuitesCleanings +
		dataLapa.currentDate.totalAllSuitesCleanings +
		dataAndar.currentDate.totalAllSuitesCleanings +
		dataTout.currentDate.totalAllSuitesCleanings;

	const totalAllAverageDailyCleaning =
		(dataIpiranga.currentDate.totalAllAverageDailyCleaning +
			dataLapa.currentDate.totalAllAverageDailyCleaning +
			dataAndar.currentDate.totalAllAverageDailyCleaning +
			dataTout.currentDate.totalAllAverageDailyCleaning) /
		4;

	const totalAllInspections =
		dataIpiranga.currentDate.totalAllInspections +
		dataLapa.currentDate.totalAllInspections +
		dataAndar.currentDate.totalAllInspections +
		dataTout.currentDate.totalAllInspections;

	const totalAllSuitesCleaningsPreviousData =
		dataIpiranga.previousDate &&
		dataLapa.previousDate &&
		dataAndar.previousDate &&
		dataTout.previousDate
			? dataIpiranga.previousDate.totalAllSuitesCleaningsPreviousData +
			  dataLapa.previousDate.totalAllSuitesCleaningsPreviousData +
			  dataAndar.previousDate.totalAllSuitesCleaningsPreviousData +
			  dataTout.previousDate.totalAllSuitesCleaningsPreviousData
			: null;

	const totalAllAverageDailyCleaningPreviousData =
		dataIpiranga.previousDate &&
		dataLapa.previousDate &&
		dataAndar.previousDate &&
		dataTout.previousDate
			? dataIpiranga.previousDate.totalAllAverageDailyCleaningPreviousData +
			  dataLapa.previousDate.totalAllAverageDailyCleaningPreviousData +
			  dataAndar.previousDate.totalAllAverageDailyCleaningPreviousData +
			  dataTout.previousDate.totalAllAverageDailyCleaningPreviousData
			: null;

	const totalAllInspectionsPreviousData =
		dataIpiranga.previousDate &&
		dataLapa.previousDate &&
		dataAndar.previousDate &&
		dataTout.previousDate
			? dataIpiranga.previousDate.totalAllInspectionsPreviousData +
			  dataLapa.previousDate.totalAllInspectionsPreviousData +
			  dataAndar.previousDate.totalAllInspectionsPreviousData +
			  dataTout.previousDate.totalAllInspectionsPreviousData
			: null;

	const ipirangaForecast = dataIpiranga.monthlyForecast;
	const lapaForecast = dataLapa.monthlyForecast;
	const andarForecast = dataAndar.monthlyForecast;
	const toutForecast = dataTout.monthlyForecast;

	const hasMonthlyForecast =
		ipirangaForecast && lapaForecast && andarForecast && toutForecast;

	const totalAllSuitesCleaningsForecast = hasMonthlyForecast
		? ipirangaForecast!.totalAllSuitesCleaningsForecast +
		  lapaForecast!.totalAllSuitesCleaningsForecast +
		  andarForecast!.totalAllSuitesCleaningsForecast +
		  toutForecast!.totalAllSuitesCleaningsForecast
		: null;

	const totalAllAverageDailyCleaningForecast = hasMonthlyForecast
		? (ipirangaForecast!.totalAllAverageDailyCleaningForecast +
				lapaForecast!.totalAllAverageDailyCleaningForecast +
				andarForecast!.totalAllAverageDailyCleaningForecast +
				toutForecast!.totalAllAverageDailyCleaningForecast) /
		  4
		: null;

	const totalAllInspectionsForecast = hasMonthlyForecast
		? ipirangaForecast!.totalAllInspectionsForecast +
		  lapaForecast!.totalAllInspectionsForecast +
		  andarForecast!.totalAllInspectionsForecast +
		  toutForecast!.totalAllInspectionsForecast
		: null;

	return (
		<div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
			<CardDetails
				showForecast={!!hasMonthlyForecast}
				description={
					totalAllSuitesCleaningsPreviousData !== null
						? generateDescription(
								description,
								totalAllSuitesCleaningsPreviousData,
						  )
						: ''
				}
				icon={<Leaf />}
				title={'Total de Suítes Limpas'}
				monthlyForecast={
					hasMonthlyForecast ? totalAllSuitesCleaningsForecast ?? undefined : undefined
				}
				value={totalAllSuitesCleanings.toLocaleString('pt-br')}
				Badge={
					totalAllSuitesCleaningsPreviousData !== null && (
						<GenerateBadge
							val={totalAllSuitesCleanings}
							previousVal={totalAllSuitesCleaningsPreviousData}
						/>
					)
				}
			/>
			<CardDetails
				showForecast={!!hasMonthlyForecast}
				description={
					totalAllAverageDailyCleaningPreviousData !== null
						? generateDescription(
								description,
								totalAllAverageDailyCleaningPreviousData,
						  )
						: ''
				}
				icon={<LeafyGreen />}
				title={'Média de Limpezas Por Dia'}
				monthlyForecast={
					hasMonthlyForecast ? totalAllAverageDailyCleaningForecast ?? undefined : undefined
				}
				value={totalAllAverageDailyCleaning.toLocaleString('pt-br')}
				Badge={
					totalAllAverageDailyCleaningPreviousData !== null && (
						<GenerateBadge
							val={totalAllAverageDailyCleaning}
							previousVal={totalAllAverageDailyCleaningPreviousData}
						/>
					)
				}
			/>
			<CardDetails
				showForecast={!!hasMonthlyForecast}
				description={
					totalAllInspectionsPreviousData !== null
						? generateDescription(description, totalAllInspectionsPreviousData)
						: ''
				}
				icon={<Eye />}
				title={'Total de Inspeções'}
				monthlyForecast={
					hasMonthlyForecast ? totalAllInspectionsForecast ?? undefined : undefined
				}
				value={totalAllInspections.toLocaleString('pt-br')}
				Badge={
					totalAllInspectionsPreviousData !== null && (
						<GenerateBadge
							val={totalAllInspections}
							previousVal={totalAllInspectionsPreviousData}
						/>
					)
				}
			/>
		</div>
	);
}
