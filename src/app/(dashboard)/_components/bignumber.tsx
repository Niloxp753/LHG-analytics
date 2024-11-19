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

interface BigNumbersProps {
	data?: any[];
	description: string;
}

export default function BigNumbers(props: BigNumbersProps) {
	return props.data ? (
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
					/>
					<CardDetails
						description={
							d.PreviousDate &&
							props.description + d.PreviousDate.totalAllRevparPreviousData
						}
						icon={<Activity />}
						title={'Revpar'}
						value={d.currentDate.totalAllRevpar}
					/>
					<CardDetails
						description={
							d.PreviousDate &&
							props.description +
								d.PreviousDate.totalAllOccupancyRatePreviousData
						}
						icon={<DoorClosed />}
						title={'Tx de Ocupação'}
						value={d.currentDate.totalAllOccupancyRate}
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
					/>
				</div>
			);
		})
	) : (
		<></>
	);
}
