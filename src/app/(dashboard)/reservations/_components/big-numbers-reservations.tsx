/** @format */

import CardDetails from '@/app/(dashboard)/_components/CardDetails';
import { Skeleton } from '@/components/ui/skeleton';
import { Blend, HandCoins, Sigma, SquarePercent } from 'lucide-react';
import GenerateBadge from '../../general/_components/generate-badge';

interface BigNumbersReservationProps {
	data?: any[];
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
								type='money'
								description={
									d.PreviousDate &&
									description +
										Number(
											d.PreviousDate.totalAllValuePreviousData,
										).toLocaleString('pt-BR', {
											style: 'currency',
											currency: 'brl',
										})
								}
								icon={<HandCoins />}
								title={'Receita De Reservas'}
								value={d.currentDate.totalAllValue}
								Badge={
									d.PreviousDate && (
										<GenerateBadge
											val={d.currentDate.totalAllValue!}
											previousVal={d.PreviousDate.totalAllValuePreviousData}
										/>
									)
								}
							/>
							<CardDetails
								description={
									d.PreviousDate &&
									description + d.PreviousDate.totalAllBookingsPreviousData
								}
								icon={<Sigma />}
								title={'Número De Reservas'}
								value={d.currentDate.totalAllBookings}
								Badge={
									d.PreviousDate && (
										<GenerateBadge
											val={d.currentDate.totalAllBookings!}
											previousVal={d.PreviousDate.totalAllBookingsPreviousData}
										/>
									)
								}
							/>
							<CardDetails
								type='money'
								description={
									d.PreviousDate &&
									description +
										Number(
											d.PreviousDate.totalAllTicketAveragePreviousData,
										).toLocaleString('pt-BR', {
											style: 'currency',
											currency: 'brl',
										})
								}
								icon={<SquarePercent />}
								title={'Ticket Médio'}
								value={d.currentDate.totalAllTicketAverage}
								Badge={
									d.PreviousDate && (
										<GenerateBadge
											val={d.currentDate.totalAllTicketAverage!}
											previousVal={
												d.PreviousDate.totalAllTicketAveragePreviousData
											}
										/>
									)
								}
							/>{' '}
							<CardDetails
								type=''
								description={
									d.PreviousDate &&
									description +
										(
											d.PreviousDate.totalAllRepresentativenessPreviousData *
											100
										).toFixed(2) +
										'%'
								}
								icon={<Blend />}
								title={'Representatividade'}
								value={
									(d.currentDate.totalAllRepresentativeness * 100).toFixed(2) +
									'%'
								}
								Badge={
									d.PreviousDate && (
										<GenerateBadge
											val={d.currentDate.totalAllRepresentativeness!}
											previousVal={
												d.PreviousDate.totalAllRepresentativenessPreviousData
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
