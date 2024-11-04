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

interface BigNumbersProps {
	data: any[];
	description: string;
}

export default function BigNumbers(props: BigNumbersProps) {
	if (!props.data) {
		return <Skeleton className='h-28 w-full' />;
	}
	return (
		<div>
			{props.data.map((d, index) => {
				return (
					<div
						key={index}
						className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
						<CardDetails
							description={props.description}
							icon={<HandCoins />}
							title={'Faturamento'}
							value={d.totalValue}
						/>
						<CardDetails
							description={props.description}
							icon={<Sigma />}
							title={'Locações'}
							value={d.totalAllRentalsApartments}
						/>
						<CardDetails
							description={props.description}
							icon={<SquarePercent />}
							title={'Ticket Médio'}
							value={d.totalAllTicketAverage}
						/>
						<CardDetails
							description={props.description}
							icon={<Activity />}
							title={'Revpar'}
							value={d.totalAllRevpar}
						/>
						<CardDetails
							description={props.description}
							icon={<DoorClosed />}
							title={'Tx de Ocupação'}
							value={d.totalAllOccupancyRate}
						/>
						<CardDetails
							description={props.description}
							icon={<AlarmClockCheck />}
							title={'TMO'}
							value={d.totalAverageOccupationTime}
						/>
					</div>
				);
			})}
		</div>
	);
}
