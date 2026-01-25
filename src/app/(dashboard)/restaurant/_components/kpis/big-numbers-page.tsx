/** @format */

import CardDetails from '@/app/(dashboard)/_components/CardDetails';
import GenerateBadge from '@/app/(dashboard)/general/_components/generate-badge';
import { generateDescription } from '@/utils/generate-description';
import { DiamondPercent, HandCoins, Sigma, SquarePercent } from 'lucide-react';
import { RestaurantBigNumbersEntry } from '@/types/big-numbers-restaurant';

interface BigNumbersPageOpProps {
	data?: RestaurantBigNumbersEntry[] | null;
	description: string;
}

export default function BigNumbersPage({
	description,
	data,
}: BigNumbersPageOpProps) {
	const entry = data?.[0];

	if (!entry) {
		return null;
	}

	const previous = entry.previousDate;
	const forecast = entry.monthlyForecast;

	return (
		<div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4'>
			<CardDetails
				showForecast={!!forecast}
				description={generateDescription(
					description,
					previous &&
						previous.totalAllValuePreviousData.toLocaleString('pt-br', {
							style: 'currency',
							currency: 'brl',
						}),
				)}
				type='money'
				icon={<HandCoins />}
				title={'Receita de A&B'}
				monthlyForecast={forecast?.totalAllValueForecast}
				value={entry.currentDate.totalAllValue}
				Badge={
					previous && (
						<GenerateBadge
							val={entry.currentDate.totalAllValue}
							previousVal={previous.totalAllValuePreviousData}
						/>
					)
				}
			/>
			<CardDetails
				showForecast={!!forecast}
				description={generateDescription(
					description,
					previous && previous.totalAllSalesPreviousData.toLocaleString('pt-br'),
				)}
				icon={<Sigma />}
				title={'Nº de vendas'}
				monthlyForecast={forecast?.totalAllSalesForecast}
				value={entry.currentDate.totalAllSales}
				Badge={
					previous && (
						<GenerateBadge
							val={entry.currentDate.totalAllSales}
							previousVal={previous.totalAllSalesPreviousData}
						/>
					)
				}
			/>

			<CardDetails
				showForecast={!!forecast}
				description={generateDescription(
					description,
					previous &&
						previous.totalAllTicketAveragePreviousData.toLocaleString('pt-br', {
							style: 'currency',
							currency: 'brl',
						}),
				)}
				type='money'
				icon={<SquarePercent />}
				title={'Ticket médio A&B'}
				monthlyForecast={forecast?.totalAllTicketAverageForecast}
				value={entry.currentDate.totalAllTicketAverage}
				Badge={
					previous && (
						<GenerateBadge
							val={entry.currentDate.totalAllTicketAverage}
							previousVal={previous.totalAllTicketAveragePreviousData}
						/>
					)
				}
			/>

			<CardDetails
				showForecast={!!forecast}
				description={generateDescription(
					description,
					previous &&
						previous.totalAllTicketAverageByTotalRentalsPreviousData.toLocaleString(
							'pt-br',
							{
								style: 'currency',
								currency: 'brl',
							},
						),
				)}
				icon={<DiamondPercent />}
				type='money'
				title={'TKT médio A&B / locação'}
				monthlyForecast={forecast?.totalAllTicketAverageByTotalRentalsForecast}
				value={entry.currentDate.totalAllTicketAverageByTotalRentals}
				Badge={
					previous && (
						<GenerateBadge
							val={entry.currentDate.totalAllTicketAverageByTotalRentals}
							previousVal={
								previous.totalAllTicketAverageByTotalRentalsPreviousData
							}
						/>
					)
				}
			/>
		</div>
	);
}
