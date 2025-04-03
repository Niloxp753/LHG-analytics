/** @format */

import CardDetails from '@/app/(dashboard)/_components/CardDetails';
import { Skeleton } from '@/components/ui/skeleton';
import {
	Blend,
	Eye,
	HandCoins,
	Leaf,
	LeafyGreen,
	Sigma,
	SquarePercent,
} from 'lucide-react';

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
							/>
							<CardDetails
								description={
									d.PreviousDate &&
									description + d.PreviousDate.totalAllBookingsPreviousData
								}
								icon={<Sigma />}
								title={'Número De Reservas'}
								value={d.currentDate.totalAllBookings}
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
							/>{' '}
							<CardDetails
								type=''
								description={
									d.PreviousDate &&
									description +
										d.PreviousDate.totalAllRepresentativenessPreviousData *
											100 +
										'%'
								}
								icon={<Blend />}
								title={'Representatividade'}
								value={d.currentDate.totalAllRepresentativeness * 100 + '%'}
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
