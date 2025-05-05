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
									d.PreviousDate &&
									props.description + d.PreviousDate.totalAllValuePreviousData
								}
								icon={<HandCoins />}
								title={'Faturamento'}
								value={d.currentDate.totalAllValue}
								Badge={
									<GenerateBadge
										val={parseCurrency(d.currentDate.totalAllValue)}
										previousVal={parseCurrency(
											d.PreviousDate.totalAllValuePreviousData,
										)}
									/>
								}
							/>
							<CardDetails
								description={
									d.PreviousDate &&
									props.description +
										d.PreviousDate.totalAllRentalsApartmentsPreviousData
								}
								icon={<Sigma />}
								title={'Locações'}
								value={d.currentDate.totalAllRentalsApartments}
								Badge={
									<GenerateBadge
										val={d.currentDate.totalAllRentalsApartments}
										previousVal={
											d.PreviousDate.totalAllRentalsApartmentsPreviousData
										}
									/>
								}
							/>
							<CardDetails
								description={
									d.PreviousDate &&
									props.description +
										d.PreviousDate.totalAllTicketAveragePreviousData
								}
								icon={<SquarePercent />}
								title={'Ticket Médio'}
								value={d.currentDate.totalAllTicketAverage}
								Badge={
									<GenerateBadge
										val={parseCurrency(d.currentDate.totalAllTicketAverage)}
										previousVal={parseCurrency(
											d.PreviousDate.totalAllTicketAveragePreviousData,
										)}
									/>
								}
							/>
							<CardDetails
								description={
									d.PreviousDate &&
									props.description + d.PreviousDate.totalAllRevparPreviousData
								}
								icon={<Activity />}
								title={'Revpar'}
								value={d.currentDate.totalAllRevpar}
								Badge={
									<GenerateBadge
										val={parseCurrency(d.currentDate.totalAllRevpar)}
										previousVal={parseCurrency(
											d.PreviousDate.totalAllRevparPreviousData,
										)}
									/>
								}
							/>
							<CardDetails
								description={
									d.PreviousDate &&
									props.description + d.PreviousDate.totalAllGiroPreviousData
								}
								icon={<DoorClosed />}
								title={'Giro'}
								value={d.currentDate.totalAllGiro}
								Badge={
									<GenerateBadge
										val={d.currentDate.totalAllGiro}
										previousVal={d.PreviousDate.totalAllGiroPreviousData}
									/>
								}
							/>
							<CardDetails
								description={
									d.PreviousDate &&
									props.description +
										d.PreviousDate.totalAverageOccupationTimePreviousData
								}
								icon={<AlarmClockCheck />}
								title={'TMO'}
								value={d.currentDate.totalAverageOccupationTime}
								Badge={
									<GenerateBadge
										tmo
										val={d.currentDate.totalAverageOccupationTime}
										previousVal={
											d.PreviousDate.totalAverageOccupationTimePreviousData
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
					<Skeleton className='w-full h-24' />
					<Skeleton className='w-full h-24' />
					<Skeleton className='w-full h-24' />
				</div>
			)}
		</>
	);
}
