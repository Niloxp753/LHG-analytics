/** @format */

import { Blend, HandCoins, Sigma, SquarePercent } from 'lucide-react';

import CardDetails from '../../_components/CardDetails';
import GenerateBadge from '../../general/_components/generate-badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { ReservationsBigNumbersEntry } from '@/types/big-numbers-reservations';

interface BigNumbersProps {
	data?: ReservationsBigNumbersEntry[] | null;
	description: string;
	ecommerce: boolean;
}

export default function BigNumbersReservationPage(props: BigNumbersProps) {
	const isLoading = typeof props.data === 'undefined';
	const error =
		props.data === null ? 'Não foi possível carregar os dados.' : undefined;
	const unified = props.data?.[0];

	if (isLoading) {
		return (
			<div className='grid grid-cols-1 h-full w-full md:grid-cols-2 2xl:grid-cols-4 gap-5'>
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
		<div className='grid grid-cols-1 h-full w-full md:grid-cols-2 2xl:grid-cols-4 gap-5'>
			<CardDetails
				showForecast={showForecast}
				description={
					hasPrevious
						? props.description +
							previousDate?.totalAllValuePreviousData?.toLocaleString('pt-BR', {
								style: 'currency',
								currency: 'brl',
							})
						: ''
				}
				icon={<HandCoins />}
				title={'Receita De Reservas' + `${props.ecommerce ? ' Ecommerce' : ''}`}
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
				showForecast={!!showForecast}
				description={
					hasPrevious
						? props.description +
							previousDate?.totalAllBookingsPreviousData!.toLocaleString(
								'pt-BR',
							)
						: ''
				}
				icon={<Sigma />}
				title={'Número de Reservas' + `${props.ecommerce ? ' Ecommerce' : ''}`}
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
						? props.description +
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
				type='money'
				title={'Ticket Médio' + `${props.ecommerce ? ' Ecommerce' : ''}`}
				monthlyForecast={
					showForecast
						? (monthlyForecast?.totalAllTicketAverageForecast ?? undefined)
						: undefined
				}
				value={currentDate?.totalAllTicketAverage!}
				Badge={
					hasPrevious && (
						<GenerateBadge
							val={currentDate?.totalAllTicketAverage!!}
							previousVal={previousDate?.totalAllTicketAveragePreviousData!}
						/>
					)
				}
			/>
			<CardDetails
				showForecast={showForecast}
				description={
					hasPrevious
						? props.description +
							(
								previousDate?.totalAllRepresentativenessPreviousData! * 100
							).toFixed(2) +
							'%'
						: ''
				}
				icon={<Blend />}
				title={
					'Representatividade' + `${props.ecommerce ? ' Ecommerce   ' : ''}`
				}
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
