/** @format */

import CardDetails from '@/app/(dashboard)/_components/CardDetails';
import GenerateBadge from '@/app/(dashboard)/general/_components/generate-badge';
import { generateDescription } from '@/utils/generate-description';
import { DiamondPercent, HandCoins, Sigma, SquarePercent } from 'lucide-react';

interface BigNumbersPageOpProps {
	ipiranga: any[];
	lapa: any[];
	andar_de_cima: any[];
	tout: any[];
	description: string;
}

export default function BigNumbersPage({
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

	const totalAllValues =
		dataIpiranga.currentDate.totalAllValue +
		dataLapa.currentDate.totalAllValue +
		dataAndar.currentDate.totalAllValue +
		dataTout.currentDate.totalAllValue;

	const totalAllSales =
		dataIpiranga.currentDate.totalAllSales +
		dataLapa.currentDate.totalAllSales +
		dataAndar.currentDate.totalAllSales +
		dataTout.currentDate.totalAllSales;

	const totalAllTicketAverage =
		(dataIpiranga.currentDate.totalAllTicketAverage +
			dataLapa.currentDate.totalAllTicketAverage +
			dataAndar.currentDate.totalAllTicketAverage +
			dataTout.currentDate.totalAllTicketAverage) /
		4;

	const totalAllTicketAverageByTotalRentals =
		(dataIpiranga.currentDate.totalAllTicketAverageByTotalRentals +
			dataLapa.currentDate.totalAllTicketAverageByTotalRentals +
			dataAndar.currentDate.totalAllTicketAverageByTotalRentals +
			dataTout.currentDate.totalAllTicketAverageByTotalRentals) /
		4;

	const totalAllValuePreviousData = dataIpiranga.PreviousDate
		? dataIpiranga.PreviousDate.totalAllValuePreviousData +
		  dataLapa.PreviousDate.totalAllValuePreviousData +
		  dataAndar.PreviousDate.totalAllValuePreviousData +
		  dataTout.PreviousDate.totalAllValuePreviousData
		: null;

	const totalAllSalesPreviousData = dataIpiranga.PreviousDate
		? dataIpiranga.PreviousDate.totalAllSalesPreviousData +
		  dataLapa.PreviousDate.totalAllSalesPreviousData +
		  dataAndar.PreviousDate.totalAllSalesPreviousData +
		  dataTout.PreviousDate.totalAllSalesPreviousData
		: null;

	const totalAllTicketAveragePreviousData = dataIpiranga.PreviousDate
		? dataIpiranga.PreviousDate.totalAllTicketAveragePreviousData +
		  dataLapa.PreviousDate.totalAllTicketAveragePreviousData +
		  dataAndar.PreviousDate.totalAllTicketAveragePreviousData +
		  dataTout.PreviousDate.totalAllTicketAveragePreviousData
		: null;

	const totalAllTicketAverageByTotalRentalsPreviousData =
		dataIpiranga.PreviousDate
			? dataIpiranga.PreviousDate
					.totalAllTicketAverageByTotalRentalsPreviousData +
			  dataLapa.PreviousDate.totalAllTicketAverageByTotalRentalsPreviousData +
			  dataAndar.PreviousDate.totalAllTicketAverageByTotalRentalsPreviousData +
			  dataTout.PreviousDate.totalAllTicketAverageByTotalRentalsPreviousData
			: null;

	return (
		<div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4'>
			<CardDetails
				description={generateDescription(
					description,
					totalAllValuePreviousData &&
						totalAllValuePreviousData.toLocaleString('pt-br', {
							style: 'currency',
							currency: 'brl',
						}),
				)}
				type='money'
				icon={<HandCoins />}
				title={'Receita De A&B'}
				value={totalAllValues.toLocaleString('pt-br', {
					style: 'currency',
					currency: 'brl',
				})}
				Badge={
					<GenerateBadge
						val={totalAllValues}
						previousVal={totalAllValuePreviousData}
					/>
				}
			/>
			<CardDetails
				description={generateDescription(
					description,
					totalAllSalesPreviousData &&
						totalAllSalesPreviousData.toLocaleString('pt-br'),
				)}
				icon={<Sigma />}
				title={'Nº De Vendas'}
				value={totalAllSales}
				Badge={
					<GenerateBadge
						val={totalAllSales}
						previousVal={totalAllSalesPreviousData}
					/>
				}
			/>

			<CardDetails
				description={generateDescription(
					description,
					totalAllTicketAveragePreviousData &&
						totalAllTicketAveragePreviousData.toLocaleString('pt-br', {
							style: 'currency',
							currency: 'brl',
						}),
				)}
				type='money'
				icon={<SquarePercent />}
				title={'Ticket Médio A&B'}
				value={totalAllTicketAverage}
				Badge={
					<GenerateBadge
						val={totalAllTicketAverage}
						previousVal={totalAllTicketAveragePreviousData}
					/>
				}
			/>

			<CardDetails
				description={generateDescription(
					description,
					totalAllTicketAverageByTotalRentalsPreviousData &&
						totalAllTicketAverageByTotalRentalsPreviousData.toLocaleString(
							'pt-br',
							{
								style: 'currency',
								currency: 'brl',
							},
						),
				)}
				icon={<DiamondPercent />}
				type='money'
				title={'TKT Médio A&B / Locação'}
				value={
					totalAllTicketAverageByTotalRentals &&
					totalAllTicketAverageByTotalRentals.toLocaleString('pt-br', {
						style: 'currency',
						currency: 'brl',
					})
				}
				Badge={
					<GenerateBadge
						val={totalAllTicketAverageByTotalRentals}
						previousVal={totalAllTicketAverageByTotalRentalsPreviousData}
					/>
				}
			/>
			{/* <CardDetails
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
			/> */}
		</div>
	);
}
