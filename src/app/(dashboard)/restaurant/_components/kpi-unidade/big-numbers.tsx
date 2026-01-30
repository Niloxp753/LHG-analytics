/** @format */

import CardDetails from '@/app/(dashboard)/_components/CardDetails';
import GenerateBadge from '@/app/(dashboard)/general/_components/generate-badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import {
	Blend,
	DiamondPercent,
	HandCoins,
	Sigma,
	SquarePercent,
} from 'lucide-react';
import { RestaurantBigNumbersEntry } from '@/types/big-numbers-restaurant';

interface BigNumbersProps {
	data?: RestaurantBigNumbersEntry | null;
	description: string;
}

export default function BigNumbers({ description, data }: BigNumbersProps) {
	const isLoading = typeof data === 'undefined';
	const error = data === null ? 'Não foi possível carregar os dados.' : undefined;
	const entry = data;
	const gridClassName = 'grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-12';
	const gridSpans = [
		'lg:col-span-4',
		'lg:col-span-4',
		'lg:col-span-4',
		'lg:col-span-3',
		'lg:col-span-3',
		'lg:col-span-3',
		'lg:col-span-3',
	];

	if (isLoading) {
		return (
			<div className={gridClassName}>
				{gridSpans.map((span, index) => (
					<div key={index} className={span}>
						<Skeleton className='h-[140px] w-full' />
					</div>
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
		return null;
	}

	const previous = entry.previousDate;
	const forecast = entry.monthlyForecast;
	const showForecast = !!forecast;

	return (
		<div className={gridClassName}>
			<div className={gridSpans[0]}>
				<CardDetails
					showForecast={showForecast}
					type='money'
					description={
						previous
							? description +
							  previous.totalAllValuePreviousData.toLocaleString('pt-BR', {
									style: 'currency',
									currency: 'brl',
							  })
							: ''
					}
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
			</div>
			<div className={gridSpans[1]}>
				<CardDetails
					showForecast={showForecast}
					type='money'
					description={
						previous
							? description +
							  previous.totalAllSalesRevenuePreviousData.toLocaleString(
									'pt-BR',
									{
										style: 'currency',
										currency: 'brl',
									},
							  )
							: ''
					}
					icon={<HandCoins />}
					title={'Receita de Vendas'}
					monthlyForecast={forecast?.totalAllSalesRevenueForecast}
					value={entry.currentDate.totalAllSalesRevenue}
					Badge={
						previous && (
							<GenerateBadge
								val={entry.currentDate.totalAllSalesRevenue}
								previousVal={previous.totalAllSalesRevenuePreviousData}
							/>
						)
					}
				/>
			</div>
			<div className={gridSpans[2]}>
				<CardDetails
					showForecast={showForecast}
					description={
						previous
							? description +
							  previous.totalAllSalesPreviousData.toLocaleString('pt-BR')
							: ''
					}
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
			</div>
			<div className={gridSpans[3]}>
				<CardDetails
					showForecast={showForecast}
					type='money'
					description={
						previous
							? description +
							  previous.totalAllTicketAveragePreviousData.toLocaleString(
									'pt-BR',
									{
										style: 'currency',
										currency: 'brl',
									},
							  )
							: ''
					}
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
			</div>
			<div className={gridSpans[4]}>
				<CardDetails
					showForecast={showForecast}
					type='money'
					description={
						previous
							? description +
							  previous.totalAllTicketAverageByTotalRentalsPreviousData.toLocaleString(
									'pt-BR',
									{
										style: 'currency',
										currency: 'brl',
									},
							  )
							: ''
					}
					icon={<DiamondPercent />}
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
			<div className={gridSpans[5]}>
				<CardDetails
					showForecast={showForecast}
					type='percent'
					description={
						previous
							? `${description}${previous.abRepresentativityPreviousData.toFixed(
									2,
							  )}%`
							: ''
					}
					icon={<Blend />}
					title={'Representatividade A&B'}
					monthlyForecast={
						forecast ? forecast.abRepresentativityForecast / 100 : undefined
					}
					value={entry.currentDate.abRepresentativity}
					Badge={
						previous && (
							<GenerateBadge
								val={entry.currentDate.abRepresentativity}
								previousVal={previous.abRepresentativityPreviousData}
							/>
						)
					}
				/>
			</div>
			<div className={gridSpans[6]}>
				<CardDetails
					showForecast={showForecast}
					type='percent'
					description={
						previous
							? `${description}${previous.salesRepresentativityPreviousData.toFixed(
									2,
							  )}%`
							: ''
					}
					icon={<Blend />}
					title={'Representatividade Vendas'}
					monthlyForecast={
						forecast ? forecast.salesRepresentativityForecast / 100 : undefined
					}
					value={entry.currentDate.salesRepresentativity}
					Badge={
						previous && (
							<GenerateBadge
								val={entry.currentDate.salesRepresentativity}
								previousVal={previous.salesRepresentativityPreviousData}
							/>
						)
					}
				/>
			</div>
		</div>
	);
}
