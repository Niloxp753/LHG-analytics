/** @format */

import CardDetails from '@/app/(dashboard)/_components/CardDetails';
import GenerateBadge from '@/app/(dashboard)/general/_components/generate-badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { DiamondPercent, HandCoins, Sigma, SquarePercent } from 'lucide-react';
import { RestaurantBigNumbersEntry } from '@/types/big-numbers-restaurant';

interface BigNumbersProps {
	data?: RestaurantBigNumbersEntry | null;
	description: string;
}

export default function BigNumbers({ description, data }: BigNumbersProps) {
	const isLoading = typeof data === 'undefined';
	const error = data === null ? 'Não foi possível carregar os dados.' : undefined;
	const entry = data;

	if (isLoading) {
		return (
			<div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-5'>
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
		<div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-5'>
			<CardDetails
				showForecast={!!forecast}
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
			<CardDetails
				showForecast={!!forecast}
				description={
					previous
						? description +
						  previous.totalAllSalesPreviousData.toLocaleString('pt-BR')
						: ''
				}
				icon={<Sigma />}
				title={'Nº de Vendas'}
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
				title={'Ticket Médio A&B'}
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
				title={'TKT Médio A&B / Locação'}
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
