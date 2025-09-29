/** @format */

import {
	Activity,
	AlarmClockCheck,
	DoorClosed,
	HandCoins,
	Sigma,
	SquarePercent,
} from 'lucide-react';
import CardDetails from './CardDetails';
import { Skeleton } from '@/components/ui/skeleton';
import GenerateBadge from '../general/_components/generate-badge';
import { parseCurrency } from '@/utils/normalize-bignumbers-general';

interface BigNumbersProps {
	data?: any[];
	description: string;
}

export default function BigNumbers(props: BigNumbersProps) {
	return (
		<>
			{props.data ? (
				props?.data?.map((d, index) => {
					return (
						<div
							key={index}
							className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
							<CardDetails
								description={
									d.previousDate &&
									props.description +
										d.previousDate.totalAllValuePreviousData.toLocaleString(
											'pt-BR',
											{
												style: 'currency',
												currency: 'brl',
											},
										)
								}
								icon={<HandCoins />}
								title={'Faturamento'}
								value={d.currentDate.totalAllValue.toLocaleString('pt-BR', {
									style: 'currency',
									currency: 'brl',
								})}
								Badge={
									d.previousDate && (
										<GenerateBadge
											val={d.currentDate.totalAllValue}
											previousVal={d.previousDate.totalAllValuePreviousData}
										/>
									)
								}
							/>
							<CardDetails
								description={
									d.previousDate &&
									props.description +
										d.previousDate.totalAllRentalsApartmentsPreviousData
								}
								icon={<Sigma />}
								title={'Locações'}
								value={d.currentDate.totalAllRentalsApartments}
								Badge={
									d.previousDate && (
										<GenerateBadge
											val={d.currentDate.totalAllRentalsApartments}
											previousVal={
												d.previousDate.totalAllRentalsApartmentsPreviousData
											}
										/>
									)
								}
							/>
							<CardDetails
								description={
									d.previousDate &&
									props.description +
										d.previousDate.totalAllTicketAveragePreviousData.toLocaleString(
											'pt-BR',
											{
												style: 'currency',
												currency: 'brl',
											},
										)
								}
								icon={<SquarePercent />}
								title={'Ticket Médio'}
								value={d.currentDate.totalAllTicketAverage.toLocaleString(
									'pt-BR',
									{
										style: 'currency',
										currency: 'brl',
									},
								)}
								Badge={
									d.previousDate && (
										<GenerateBadge
											val={d.currentDate.totalAllTicketAverage}
											previousVal={
												d.previousDate.totalAllTicketAveragePreviousData
											}
										/>
									)
								}
							/>
							<CardDetails
								description={
									d.previousDate &&
									props.description +
										'R$ ' +
										d.previousDate.totalAllTrevparPreviousData
								}
								icon={<Activity />}
								title={'Trevpar'}
								value={'R$ ' + d.currentDate.totalAllTrevpar}
								Badge={
									d.previousDate && (
										<GenerateBadge
											val={d.currentDate.totalAllTrevpar}
											previousVal={d.previousDate.totalAllTrevparPreviousData}
										/>
									)
								}
							/>
							<CardDetails
								description={
									d.previousDate &&
									props.description + d.previousDate.totalAllGiroPreviousData
								}
								icon={<DoorClosed />}
								title={'Giro'}
								value={d.currentDate.totalAllGiro}
								Badge={
									d.previousDate && (
										<GenerateBadge
											val={d.currentDate.totalAllGiro}
											previousVal={d.previousDate.totalAllGiroPreviousData}
										/>
									)
								}
							/>
							<CardDetails
								description={
									d.previousDate &&
									props.description +
										d.previousDate.totalAverageOccupationTimePreviousData
								}
								icon={<AlarmClockCheck />}
								title={'TMO'}
								value={d.currentDate.totalAverageOccupationTime}
								Badge={
									d.previousDate && (
										<GenerateBadge
											tmo
											val={d.currentDate.totalAverageOccupationTime}
											previousVal={
												d.previousDate.totalAverageOccupationTimePreviousData
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
					<Skeleton className='w-full h-24' />
					<Skeleton className='w-full h-24' />
					<Skeleton className='w-full h-24' />
				</div>
			)}
		</>
	);
}
