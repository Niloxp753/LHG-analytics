/** @format */

import CardDetails from '@/app/(dashboard)/_components/CardDetails';
import { Skeleton } from '@/components/ui/skeleton';
import { Blend, HandCoins, Sigma, SquarePercent } from 'lucide-react';
import GenerateBadge from '../../general/_components/generate-badge';

interface BigNumbersEcommerceProps {
	data?: any[];
	description: string;
}

export default function BigNumbersEcommerce({
	description,
	data,
}: BigNumbersEcommerceProps) {
	return (
		<>
			{data ? (
				data?.map((d, index) => {
					return (
						<div
							key={index}
							className='grid grid-cols-1 lg:grid-cols-4 gap-5 w-full '>
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
								title={'Receita De Reservas - Ecommerce'}
								value={d.currentDate.totalAllValue}
								Badge={
									<GenerateBadge
										val={d.currentDate.totalAllValue!}
										previousVal={d.PreviousDate.totalAllValuePreviousData}
									/>
								}
							/>
							<CardDetails
								description={
									d.PreviousDate &&
									description + d.PreviousDate.totalAllBookingsPreviousData
								}
								icon={<Sigma />}
								title={'Número De Reservas - Ecommerce'}
								value={d.currentDate.totalAllBookings}
								Badge={
									<GenerateBadge
										val={d.currentDate.totalAllBookings!}
										previousVal={d.PreviousDate.totalAllBookingsPreviousData}
									/>
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
								title={'Ticket Médio - Ecommerce'}
								value={d.currentDate.totalAllTicketAverage}
								Badge={
									<GenerateBadge
										val={d.currentDate.totalAllTicketAverage!}
										previousVal={
											d.PreviousDate.totalAllTicketAveragePreviousData
										}
									/>
								}
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
								title={'Representatividade - Ecommerce'}
								value={
									Number(
										d.currentDate.totalAllRepresentativeness * 100,
									).toFixed(2) + '%'
								}
								Badge={
									<GenerateBadge
										val={d.currentDate.totalAllRepresentativeness!}
										previousVal={
											d.PreviousDate.totalAllRepresentativenessPreviousData
										}
									/>
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
