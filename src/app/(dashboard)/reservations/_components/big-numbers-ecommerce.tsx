/** @format */

import CardDetails from '@/app/(dashboard)/_components/CardDetails';
import GenerateBadge from '../../general/_components/generate-badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { ReservationsBigNumbersEntry } from '@/types/big-numbers-reservations';
import { Blend, HandCoins, Sigma, SquarePercent } from 'lucide-react';

interface BigNumbersEcommerceProps {
	data?: ReservationsBigNumbersEntry[] | null;
	description: string;
}

export default function BigNumbersEcommerce({
	description,
	data,
}: BigNumbersEcommerceProps) {
	const isLoading = typeof data === 'undefined';
	const error = data === null ? 'Não foi possível carregar os dados.' : undefined;
	const unified = data?.[0];

	if (isLoading) {
		return (
			<div className='grid grid-cols-1 lg:grid-cols-4 gap-5 w-full'>
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

	if (!unified) {
		return null;
	}

	const currentDate = unified.currentDate;
	const previousDate = unified.previousDate;
	const monthlyForecast = unified.monthlyForecast;
	const showForecast = !!monthlyForecast;
	const hasPrevious = !!previousDate;
	const previousValue = previousDate?.totalAllValuePreviousData;
	const previousBookings = previousDate?.totalAllBookingsPreviousData;
	const previousTicketAverage = previousDate?.totalAllTicketAveragePreviousData;
	const previousRepresentativeness =
		previousDate?.totalAllRepresentativenessPreviousData;

	return (
		<div className='grid grid-cols-1 lg:grid-cols-4 gap-5 w-full'>
			<CardDetails
				showForecast={showForecast}
				description={
					hasPrevious && typeof previousValue === 'number'
						? description +
							previousValue.toLocaleString('pt-BR', {
								style: 'currency',
								currency: 'brl',
							})
						: ''
				}
				icon={<HandCoins />}
				title={'Receita De Reservas'}
				monthlyForecast={
					showForecast ? monthlyForecast?.totalAllValueForecast : undefined
				}
				value={currentDate.totalAllValue}
				type='money'
				Badge={
					hasPrevious && typeof previousValue === 'number' && (
						<GenerateBadge
							val={currentDate.totalAllValue}
							previousVal={previousValue}
						/>
					)
				}
			/>
			<CardDetails
				showForecast={showForecast}
				description={
					hasPrevious && typeof previousBookings === 'number'
						? description +
							previousBookings.toLocaleString('pt-BR')
						: ''
				}
				icon={<Sigma />}
				title={'Número de Reservas'}
				monthlyForecast={
					showForecast
						? (monthlyForecast?.totalAllBookingsForecast ?? undefined)
						: undefined
				}
				value={currentDate.totalAllBookings}
				Badge={
					hasPrevious && typeof previousBookings === 'number' && (
						<GenerateBadge
							val={currentDate.totalAllBookings}
							previousVal={previousBookings}
						/>
					)
				}
			/>
			<CardDetails
				showForecast={showForecast}
				description={
					hasPrevious && typeof previousTicketAverage === 'number'
						? description +
							previousTicketAverage.toLocaleString(
								'pt-BR',
								{
									style: 'currency',
									currency: 'brl',
								},
							)
						: ''
				}
				icon={<SquarePercent />}
				title={'Ticket Médio'}
				monthlyForecast={
					showForecast
						? (monthlyForecast?.totalAllTicketAverageForecast ?? undefined)
						: undefined
				}
				value={currentDate.totalAllTicketAverage}
				type='money'
				Badge={
					hasPrevious && typeof previousTicketAverage === 'number' && (
						<GenerateBadge
							val={currentDate.totalAllTicketAverage}
							previousVal={previousTicketAverage}
						/>
					)
				}
			/>
			<CardDetails
				showForecast={showForecast}
				description={
					hasPrevious && typeof previousRepresentativeness === 'number'
						? description +
							(previousRepresentativeness * 100).toFixed(2) +
							'%'
						: ''
				}
				icon={<Blend />}
				title={'Representatividade'}
				monthlyForecast={
					showForecast
						? (monthlyForecast?.totalAllRepresentativenessForecast ?? undefined)
						: undefined
				}
				value={currentDate.totalAllRepresentativeness}
				type='percent'
				Badge={
					hasPrevious && typeof previousRepresentativeness === 'number' && (
						<GenerateBadge
							val={currentDate.totalAllRepresentativeness}
							previousVal={previousRepresentativeness}
						/>
					)
				}
			/>
		</div>
	);
}
