/** @format */

import CardDetails from '@/app/(dashboard)/_components/CardDetails';
import { Skeleton } from '@/components/ui/skeleton';
import { Blend, HandCoins, Sigma, SquarePercent } from 'lucide-react';
import GenerateBadge from '../../general/_components/generate-badge';
import { ReservationsBigNumbersEntry } from '@/types/big-numbers-reservations';

interface BigNumbersReservationProps {
	data?: ReservationsBigNumbersEntry[];
	description: string;
}

export default function BigNumbersReservation({
	description,
	data,
}: BigNumbersReservationProps) {
	return (
		<>
			{data ? (
				data?.map((d, index) => {
					return (
						<div
							key={index}
							className='grid grid-cols-1 lg:grid-cols-4 gap-5'>
							<CardDetails
								showForecast={!!d.monthlyForecast}
								type='money'
								description={
									d.previousDate &&
									description +
										Number(
											d.previousDate.totalAllValuePreviousData,
										).toLocaleString('pt-BR', {
											style: 'currency',
											currency: 'brl',
										})
								}
								icon={<HandCoins />}
								title={'Receita De Reservas'}
								monthlyForecast={
									d.monthlyForecast
										? d.monthlyForecast.totalAllValueForecast
										: undefined
								}
								value={d.currentDate.totalAllValue}
								Badge={
									d.previousDate && (
										<GenerateBadge
											val={d.currentDate.totalAllValue!}
											previousVal={d.previousDate.totalAllValuePreviousData}
										/>
									)
								}
							/>
							<CardDetails
								showForecast={!!d.monthlyForecast}
								description={
									d.previousDate &&
									description + d.previousDate.totalAllBookingsPreviousData
								}
								icon={<Sigma />}
								title={'Número de Reservas'}
								monthlyForecast={
									d.monthlyForecast
										? d.monthlyForecast.totalAllBookingsForecast
										: undefined
								}
								value={d.currentDate.totalAllBookings}
								Badge={
									d.previousDate && (
										<GenerateBadge
											val={d.currentDate.totalAllBookings!}
											previousVal={d.previousDate.totalAllBookingsPreviousData}
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
										Number(
											d.previousDate.totalAllTicketAveragePreviousData,
										).toLocaleString('pt-BR', {
											style: 'currency',
											currency: 'brl',
										})
								}
								icon={<SquarePercent />}
								title={'Ticket Médio'}
								monthlyForecast={
									d.monthlyForecast
										? d.monthlyForecast.totalAllTicketAverageForecast
										: undefined
								}
								value={d.currentDate.totalAllTicketAverage}
								Badge={
									d.previousDate && (
										<GenerateBadge
											val={d.currentDate.totalAllTicketAverage!}
											previousVal={
												d.previousDate.totalAllTicketAveragePreviousData
											}
										/>
									)
								}
							/>{' '}
							<CardDetails
								showForecast={!!d.monthlyForecast}
								type=''
								description={
									d.previousDate &&
									description +
										(
											d.previousDate.totalAllRepresentativenessPreviousData *
											100
										).toFixed(2) +
										'%'
								}
								icon={<Blend />}
								title={'Representatividade'}
								monthlyForecast={
									d.monthlyForecast
										? d.monthlyForecast.totalAllRepresentativenessForecast
										: undefined
								}
								value={
									(d.currentDate.totalAllRepresentativeness * 100).toFixed(2) +
									'%'
								}
								Badge={
									d.previousDate && (
										<GenerateBadge
											val={d.currentDate.totalAllRepresentativeness!}
											previousVal={
												d.previousDate.totalAllRepresentativenessPreviousData
											}
										/>
									)
								}
							/>
						</div>
					);
				})
			) : (
				<div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
					<Skeleton className='w-full h-24' />
					<Skeleton className='w-full h-24' />
					<Skeleton className='w-full h-24' />
				</div>
			)}
		</>
	);
}
