/** @format */

import CardDetails from '@/app/(dashboard)/_components/CardDetails';
import GenerateBadge from '@/app/(dashboard)/general/_components/generate-badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
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
	const isLoading = typeof data === 'undefined';
	const error = data === null ? 'Não foi possível carregar os dados.' : undefined;
	const entry = data?.[0];

	if (isLoading) {
		return (
			<div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4'>
				{Array.from({ length: 4 }).map((_, index) => (
					<Skeleton key={index} className='h-[140px] w-full' />
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

	return (
		<div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4'>
			<CardDetails
				showForecast={!!forecast}
				description={
					previous
						? generateDescription(description, previous.totalAllValuePreviousData, {
								style: 'currency',
								currency: 'BRL',
						  })
						: ''
				}
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
				description={
					previous
						? generateDescription(description, previous.totalAllSalesPreviousData)
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

			<CardDetails
				showForecast={!!forecast}
				description={
					previous
						? generateDescription(
								description,
								previous.totalAllTicketAveragePreviousData,
								{
									style: 'currency',
									currency: 'BRL',
								},
						  )
						: ''
				}
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
				description={
					previous
						? generateDescription(
								description,
								previous.totalAllTicketAverageByTotalRentalsPreviousData,
								{
									style: 'currency',
									currency: 'BRL',
								},
						  )
						: ''
				}
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
