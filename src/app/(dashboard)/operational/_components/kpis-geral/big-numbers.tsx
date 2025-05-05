/** @format */

import CardDetails from '@/app/(dashboard)/_components/CardDetails';
import GenerateBadge from '@/app/(dashboard)/general/_components/generate-badge';
import { generateDescription } from '@/utils/generate-description';
import { Eye, Leaf, LeafyGreen } from 'lucide-react';

interface BigNumbersPageOpProps {
	ipiranga: any[];
	lapa: any[];
	andar_de_cima: any[];
	tout: any[];
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

	const totalAllSuitesCleaningsPreviousData = dataIpiranga.previousDate
		? dataIpiranga.previousDate.totalAllSuitesCleaningsPreviousData +
		  dataLapa.previousDate.totalAllSuitesCleaningsPreviousData +
		  dataAndar.previousDate.totalAllSuitesCleaningsPreviousData +
		  dataTout.previousDate.totalAllSuitesCleaningsPreviousData
		: null;

	const totalAllAverageDailyCleaningPreviousData = dataIpiranga.previousDate
		? dataIpiranga.previousDate.totalAllAverageDailyCleaningPreviousData +
		  dataLapa.previousDate.totalAllAverageDailyCleaningPreviousData +
		  dataAndar.previousDate.totalAllAverageDailyCleaningPreviousData +
		  dataTout.previousDate.totalAllAverageDailyCleaningPreviousData
		: null;

	const totalAllInspectionsPreviousData = dataIpiranga.previousDate
		? dataIpiranga.previousDate.totalAllInspectionsPreviousData +
		  dataLapa.previousDate.totalAllInspectionsPreviousData +
		  dataAndar.previousDate.totalAllInspectionsPreviousData +
		  dataTout.previousDate.totalAllInspectionsPreviousData
		: null;

	return (
		<div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
			<CardDetails
				description={generateDescription(
					description,
					totalAllSuitesCleaningsPreviousData,
				)}
				icon={<Leaf />}
				title={'Total de Suítes Limpas'}
				value={totalAllSuitesCleanings.toLocaleString('pt-br')}
				Badge={
					dataIpiranga.PreviousDate && (
						<GenerateBadge
							val={totalAllSuitesCleanings}
							previousVal={totalAllSuitesCleaningsPreviousData}
						/>
					)
				}
			/>
			<CardDetails
				description={generateDescription(
					description,
					totalAllAverageDailyCleaningPreviousData,
				)}
				icon={<LeafyGreen />}
				title={'Média de Limpezas Por Dia'}
				value={totalAllAverageDailyCleaning.toLocaleString('pt-br')}
				Badge={
					dataIpiranga.PreviousDate && (
						<GenerateBadge
							val={totalAllAverageDailyCleaning}
							previousVal={totalAllAverageDailyCleaningPreviousData}
						/>
					)
				}
			/>
			<CardDetails
				description={generateDescription(
					description,
					totalAllInspectionsPreviousData,
				)}
				icon={<Eye />}
				title={'Total de Inspeções'}
				value={totalAllInspections.toLocaleString('pt-br')}
				Badge={
					dataIpiranga.PreviousDate && (
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
