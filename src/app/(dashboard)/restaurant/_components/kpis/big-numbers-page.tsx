/** @format */

import CardDetails from '@/app/(dashboard)/_components/CardDetails';
import GenerateBadge from '@/app/(dashboard)/general/_components/generate-badge';
import { generateDescription } from '@/utils/generate-description';
import { DiamondPercent, HandCoins, Sigma, SquarePercent } from 'lucide-react';
import { RestaurantBigNumbersEntry } from '@/types/big-numbers-restaurant';

interface BigNumbersPageOpProps {
	ipiranga: RestaurantBigNumbersEntry[];
	lapa: RestaurantBigNumbersEntry[];
	andar_de_cima: RestaurantBigNumbersEntry[];
	tout: RestaurantBigNumbersEntry[];
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

	const totalAllValuePreviousData = dataIpiranga.previousDate
		? dataIpiranga.previousDate.totalAllValuePreviousData +
		  dataLapa.previousDate.totalAllValuePreviousData +
		  dataAndar.previousDate.totalAllValuePreviousData +
		  dataTout.previousDate.totalAllValuePreviousData
		: null;

	const totalAllSalesPreviousData = dataIpiranga.previousDate
		? dataIpiranga.previousDate.totalAllSalesPreviousData +
		  dataLapa.previousDate.totalAllSalesPreviousData +
		  dataAndar.previousDate.totalAllSalesPreviousData +
		  dataTout.previousDate.totalAllSalesPreviousData
		: null;

	const totalAllTicketAveragePreviousData = dataIpiranga.previousDate
		? dataIpiranga.previousDate.totalAllTicketAveragePreviousData +
		  dataLapa.previousDate.totalAllTicketAveragePreviousData +
		  dataAndar.previousDate.totalAllTicketAveragePreviousData +
		  dataTout.previousDate.totalAllTicketAveragePreviousData
		: null;

	const totalAllTicketAverageByTotalRentalsPreviousData =
		dataIpiranga.previousDate
			? dataIpiranga.previousDate
					.totalAllTicketAverageByTotalRentalsPreviousData +
			  dataLapa.previousDate.totalAllTicketAverageByTotalRentalsPreviousData +
			  dataAndar.previousDate.totalAllTicketAverageByTotalRentalsPreviousData +
			  dataTout.previousDate.totalAllTicketAverageByTotalRentalsPreviousData
			: null;

	const hasMonthlyForecast =
		dataIpiranga.monthlyForecast &&
		dataLapa.monthlyForecast &&
		dataAndar.monthlyForecast &&
		dataTout.monthlyForecast;

	const totalAllValueForecast = hasMonthlyForecast
		? dataIpiranga.monthlyForecast.totalAllValueForecast +
		  dataLapa.monthlyForecast.totalAllValueForecast +
		  dataAndar.monthlyForecast.totalAllValueForecast +
		  dataTout.monthlyForecast.totalAllValueForecast
		: null;

	const totalAllSalesForecast = hasMonthlyForecast
		? dataIpiranga.monthlyForecast.totalAllSalesForecast +
		  dataLapa.monthlyForecast.totalAllSalesForecast +
		  dataAndar.monthlyForecast.totalAllSalesForecast +
		  dataTout.monthlyForecast.totalAllSalesForecast
		: null;

	const totalAllTicketAverageForecast = hasMonthlyForecast
		? (dataIpiranga.monthlyForecast.totalAllTicketAverageForecast +
				dataLapa.monthlyForecast.totalAllTicketAverageForecast +
				dataAndar.monthlyForecast.totalAllTicketAverageForecast +
				dataTout.monthlyForecast.totalAllTicketAverageForecast) /
		  4
		: null;

	const totalAllTicketAverageByTotalRentalsForecast = hasMonthlyForecast
		? (dataIpiranga.monthlyForecast
				.totalAllTicketAverageByTotalRentalsForecast +
				dataLapa.monthlyForecast.totalAllTicketAverageByTotalRentalsForecast +
				dataAndar.monthlyForecast.totalAllTicketAverageByTotalRentalsForecast +
				dataTout.monthlyForecast.totalAllTicketAverageByTotalRentalsForecast) /
		  4
		: null;

	return (
		<div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4'>
			<CardDetails
				showForecast={!!hasMonthlyForecast}
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
				monthlyForecast={
					hasMonthlyForecast ? totalAllValueForecast ?? undefined : undefined
				}
				value={
					totalAllValues
						? totalAllValues.toLocaleString('pt-br', {
								style: 'currency',
								currency: 'brl',
						  })
						: 0
				}
				Badge={
					totalAllValuePreviousData && (
						<GenerateBadge
							val={totalAllValues}
							previousVal={totalAllValuePreviousData}
						/>
					)
				}
			/>
			<CardDetails
				showForecast={!!hasMonthlyForecast}
				description={generateDescription(
					description,
					totalAllSalesPreviousData &&
						totalAllSalesPreviousData.toLocaleString('pt-br'),
				)}
				icon={<Sigma />}
				title={'Nº De Vendas'}
				monthlyForecast={
					hasMonthlyForecast ? totalAllSalesForecast ?? undefined : undefined
				}
				value={totalAllSales}
				Badge={
					totalAllSalesPreviousData && (
						<GenerateBadge
							val={totalAllSales}
							previousVal={totalAllSalesPreviousData}
						/>
					)
				}
			/>

			<CardDetails
				showForecast={!!hasMonthlyForecast}
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
				monthlyForecast={
					hasMonthlyForecast
						? totalAllTicketAverageForecast ?? undefined
						: undefined
				}
				value={totalAllTicketAverage}
				Badge={
					totalAllTicketAveragePreviousData && (
						<GenerateBadge
							val={totalAllTicketAverage}
							previousVal={totalAllTicketAveragePreviousData}
						/>
					)
				}
			/>

			<CardDetails
				showForecast={!!hasMonthlyForecast}
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
				monthlyForecast={
					hasMonthlyForecast
						? totalAllTicketAverageByTotalRentalsForecast ?? undefined
						: undefined
				}
				value={
					totalAllTicketAverageByTotalRentals &&
					totalAllTicketAverageByTotalRentals.toLocaleString('pt-br', {
						style: 'currency',
						currency: 'brl',
					})
				}
				Badge={
					totalAllTicketAverageByTotalRentalsPreviousData && (
						<GenerateBadge
							val={totalAllTicketAverageByTotalRentals}
							previousVal={totalAllTicketAverageByTotalRentalsPreviousData}
						/>
					)
				}
			/>
		</div>
	);
}
