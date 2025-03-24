/** @format */

import CardDetails from '@/app/(dashboard)/_components/CardDetails';
import { generateDescription } from '@/utils/generate-description';
import { Eye, Leaf, LeafyGreen } from 'lucide-react';

interface BigNumbersPageOpProps {
	ipiranga: any[];
	lapa: any[];
	description: string;
}

export default function BigNumbersPageOp({
	description,
	ipiranga,
	lapa,
}: BigNumbersPageOpProps) {
	const dataIpiranga = ipiranga[0];
	const dataLapa = lapa[0];

	const totalAllSuitesCleanings =
		dataIpiranga.currentDate.totalAllSuitesCleanings +
		dataLapa.currentDate.totalAllSuitesCleanings;

	const totalAllAverageDailyCleaning =
		dataIpiranga.currentDate.totalAllAverageDailyCleaning +
		dataLapa.currentDate.totalAllAverageDailyCleaning;

	const totalAllInspections =
		dataIpiranga.currentDate.totalAllInspections +
		dataLapa.currentDate.totalAllInspections;

	const totalAllSuitesCleaningsPreviousData = dataIpiranga.previousDate
		? dataIpiranga.previousDate.totalAllSuitesCleaningsPreviousData +
		  dataLapa.previousDate.totalAllSuitesCleaningsPreviousData
		: null;

	const totalAllAverageDailyCleaningPreviousData = dataIpiranga.previousDate
		? dataIpiranga.previousDate.totalAllAverageDailyCleaningPreviousData +
		  dataLapa.previousDate.totalAllAverageDailyCleaningPreviousData
		: null;

	const totalAllInspectionsPreviousData = dataIpiranga.previousDate
		? dataIpiranga.previousDate.totalAllInspectionsPreviousData +
		  dataLapa.previousDate.totalAllInspectionsPreviousData
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
			/>
			<CardDetails
				description={generateDescription(
					description,
					totalAllAverageDailyCleaningPreviousData,
				)}
				icon={<LeafyGreen />}
				title={'Média de Limpezas Por Dia'}
				value={totalAllAverageDailyCleaning.toLocaleString('pt-br')}
			/>
			<CardDetails
				description={generateDescription(
					description,
					totalAllInspectionsPreviousData,
				)}
				icon={<Eye />}
				title={'Total de Inspeções'}
				value={totalAllInspections.toLocaleString('pt-br')}
			/>
		</div>
	);
}
