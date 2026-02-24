/** @format */

import CardDetails from '@/app/(dashboard)/_components/CardDetails';
import GenerateBadge from '@/app/(dashboard)/general/_components/generate-badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import EmptyState from '@/app/(dashboard)/_components/EmptyState';
import {
	Blend,
	DiamondPercent,
	HandCoins,
	Sigma,
	SquarePercent,
} from 'lucide-react';
import { RestaurantBigNumbersEntry } from '@/types/big-numbers-restaurant';
import { formatCurrency, type CurrencyConfig } from '@/lib/currency-format';

interface BigNumbersProps {
	data?: RestaurantBigNumbersEntry | null;
	description: string;
	currencyConfig?: CurrencyConfig;
}

export default function BigNumbers({
	description,
	data,
	currencyConfig,
}: BigNumbersProps) {
	const isLoading = typeof data === 'undefined';
	const error =
		data === null ? 'Não foi possível carregar os dados.' : undefined;
	const entry = data;
	const gridClassName =
		'grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-6 min-[1650px]:grid-cols-12';
	const gridSpans = [
		'sm:col-span-2 min-[1650px]:col-span-4',
		'lg:col-span-2 min-[1650px]:col-span-4',
		'lg:col-span-2 min-[1650px]:col-span-4',
		'lg:col-span-3 min-[1650px]:col-span-3',
		'lg:col-span-3 min-[1650px]:col-span-3',
		'lg:col-span-3 min-[1650px]:col-span-3',
		'lg:col-span-3 min-[1650px]:col-span-3',
	];

	if (isLoading) {
		return (
			<div className={gridClassName}>
				{gridSpans.map((span, index) => (
					<div
						key={index}
						className={span}>
						<Skeleton className='h-[140px] w-full ' />
					</div>
				))}
			</div>
		);
	}

	if (error) {
		return (
			<Alert
				variant='destructive'
				className='w-full'>
				<AlertTitle>Erro ao carregar</AlertTitle>
				<AlertDescription>{error}</AlertDescription>
			</Alert>
		);
	}

	if (!entry) {
		return <EmptyState title='Sem dados' minHeight={140} />;
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
								formatCurrency(
									previous.totalAllValuePreviousData,
									currencyConfig,
								)
							: ''
					}
					icon={<HandCoins />}
					title={'Receita de A&B'}
					monthlyForecast={forecast?.totalAllValueForecast}
					value={entry.currentDate.totalAllValue}
					currencyConfig={currencyConfig}
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
								formatCurrency(
									previous.totalAllSalesRevenuePreviousData,
									currencyConfig,
								)
							: ''
					}
					icon={<HandCoins />}
					title={'Receita de Vendas'}
					monthlyForecast={forecast?.totalAllSalesRevenueForecast}
					value={entry.currentDate.totalAllSalesRevenue}
					currencyConfig={currencyConfig}
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
								formatCurrency(
									previous.totalAllTicketAveragePreviousData,
									currencyConfig,
								)
							: ''
					}
					icon={<SquarePercent />}
					title={'Ticket médio A&B'}
					monthlyForecast={forecast?.totalAllTicketAverageForecast}
					value={entry.currentDate.totalAllTicketAverage}
					currencyConfig={currencyConfig}
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
								formatCurrency(
									previous.totalAllTicketAverageByTotalRentalsPreviousData,
									currencyConfig,
								)
							: ''
					}
					icon={<DiamondPercent />}
					title={'TKT médio A&B / locação'}
					monthlyForecast={
						forecast?.totalAllTicketAverageByTotalRentalsForecast
					}
					value={entry.currentDate.totalAllTicketAverageByTotalRentals}
					currencyConfig={currencyConfig}
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
					title={'Rep. A&B'}
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
					title={'Rep. Vendas'}
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
