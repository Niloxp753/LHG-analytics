/** @format */

import CardDetails from '@/app/(dashboard)/_components/CardDetails';
import GenerateBadge from '@/app/(dashboard)/general/_components/generate-badge';
import { DiamondPercent, HandCoins, Sigma, SquarePercent } from 'lucide-react';
import { RestaurantBigNumbersEntry } from '@/types/big-numbers-restaurant';

interface BigNumbersProps {
	data?: RestaurantBigNumbersEntry[];
	description: string;
}

export default function BigNumbers({ description, data }: BigNumbersProps) {
	return (
		<>
			{data?.map((d, index) => {
				return (
					<div
						key={index}
						className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-5'>
						<CardDetails
							showForecast={!!d.monthlyForecast}
							type='money'
							description={
								d.previousDate &&
								description +
									d.previousDate.totalAllValuePreviousData.toLocaleString(
										'pt-BR',
										{
											style: 'currency',
											currency: 'brl',
										},
									)
							}
							icon={<HandCoins />}
							title={'Receita de A&B'}
							monthlyForecast={
								d.monthlyForecast
									? d.monthlyForecast.totalAllValueForecast
									: undefined
							}
							value={d.currentDate.totalAllValue}
							Badge={
								d.previousDate && (
									<GenerateBadge
										val={d.currentDate.totalAllValue}
										previousVal={d.previousDate.totalAllValuePreviousData}
									/>
								)
							}
						/>
						<CardDetails
							showForecast={!!d.monthlyForecast}
							description={
								d.previousDate &&
								description +
									d.previousDate.totalAllSalesPreviousData.toLocaleString(
										'pt-BR',
									)
							}
							icon={<Sigma />}
							title={'Nº de Vendas'}
							monthlyForecast={
								d.monthlyForecast
									? d.monthlyForecast.totalAllSalesForecast
									: undefined
							}
							value={d.currentDate.totalAllSales}
							Badge={
								d.previousDate && (
									<GenerateBadge
										val={d.currentDate.totalAllSales}
										previousVal={d.previousDate.totalAllSalesPreviousData}
									/>
								)
							}
						/>
						<CardDetails
							showForecast={!!d.monthlyForecast}
							type='money'
							description={
								d.previousDate &&
								description +
									d.previousDate.totalAllTicketAveragePreviousData.toLocaleString(
										'pt-BR',
										{
											style: 'currency',
											currency: 'brl',
										},
									)
							}
							icon={<SquarePercent />}
							title={'Ticket Médio A&B'}
							monthlyForecast={
								d.monthlyForecast
									? d.monthlyForecast.totalAllTicketAverageForecast
									: undefined
							}
							value={d.currentDate.totalAllTicketAverage}
							Badge={
								d.previousDate && (
									<GenerateBadge
										val={d.currentDate.totalAllTicketAverage}
										previousVal={
											d.previousDate.totalAllTicketAveragePreviousData
										}
									/>
								)
							}
						/>
						<CardDetails
							showForecast={!!d.monthlyForecast}
							type='money'
							description={
								d.previousDate &&
								description +
									d.previousDate.totalAllTicketAverageByTotalRentalsPreviousData.toLocaleString(
										'pt-BR',
										{
											style: 'currency',
											currency: 'brl',
										},
									)
							}
							icon={<DiamondPercent />}
							title={'TKT Médio A&B / Locação'}
							monthlyForecast={
								d.monthlyForecast
									? d.monthlyForecast.totalAllTicketAverageByTotalRentalsForecast
									: undefined
							}
							value={d.currentDate.totalAllTicketAverageByTotalRentals}
							Badge={
								d.previousDate && (
									<GenerateBadge
										val={d.currentDate.totalAllTicketAverageByTotalRentals}
										previousVal={
											d.previousDate
												.totalAllTicketAverageByTotalRentalsPreviousData
										}
									/>
								)
							}
						/>
					</div>
				);
			})}
		</>
	);
}
