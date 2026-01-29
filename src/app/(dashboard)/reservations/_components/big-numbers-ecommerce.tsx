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

	const showForecast = !!unified?.monthlyForecast;
	const hasPrevious = !!unified?.previousDate;

	const currentDate = unified?.currentDate;
	const previousDate = unified?.previousDate;
	const monthlyForecast = unified?.monthlyForecast;

	return (
		<div className='grid grid-cols-1 lg:grid-cols-4 gap-5 w-full'>
			<CardDetails
				showForecast={showForecast}
				description={
					hasPrevious
						? description +
							previousDate?.totalAllValuePreviousData?.toLocaleString('pt-BR', {
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
				value={currentDate?.totalAllValue ?? ''}
				type='money'
				Badge={
					hasPrevious && (
						<GenerateBadge
							val={currentDate?.totalAllValue!}
							previousVal={previousDate?.totalAllValuePreviousData!}
						/>
					)
				}
			/>
			<CardDetails
				showForecast={showForecast}
				description={
					hasPrevious
						? description +
							previousDate?.totalAllBookingsPreviousData!.toLocaleString(
								'pt-BR',
							)
						: ''
				}
				icon={<Sigma />}
				title={'Número de Reservas'}
				monthlyForecast={
					showForecast
						? (monthlyForecast?.totalAllBookingsForecast ?? undefined)
						: undefined
				}
				value={currentDate?.totalAllBookings!}
				Badge={
					hasPrevious && (
						<GenerateBadge
							val={currentDate?.totalAllBookings!}
							previousVal={previousDate?.totalAllBookingsPreviousData!}
						/>
					)
				}
			/>
			<CardDetails
				showForecast={showForecast}
				description={
					hasPrevious
						? description +
							previousDate?.totalAllTicketAveragePreviousData!.toLocaleString(
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
				value={currentDate?.totalAllTicketAverage!}
				type='money'
				Badge={
					hasPrevious && (
						<GenerateBadge
							val={currentDate?.totalAllTicketAverage!}
							previousVal={previousDate?.totalAllTicketAveragePreviousData!}
						/>
					)
				}
			/>
			<CardDetails
				showForecast={showForecast}
				description={
					hasPrevious
						? description +
							(
								previousDate?.totalAllRepresentativenessPreviousData! * 100
							).toFixed(2) +
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
				value={currentDate?.totalAllRepresentativeness!}
				type='percent'
				Badge={
					hasPrevious && (
						<GenerateBadge
							val={currentDate?.totalAllRepresentativeness!}
							previousVal={
								previousDate?.totalAllRepresentativenessPreviousData!
							}
						/>
					)
				}
			/>
		</div>
	);
}
