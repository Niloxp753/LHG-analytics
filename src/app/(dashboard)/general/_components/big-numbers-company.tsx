/** @format */

import {
	Activity,
	AlarmClockCheck,
	DoorClosed,
	HandCoins,
	Sigma,
	SquarePercent,
} from 'lucide-react';

import CardDetails from '../../_components/CardDetails';
import GenerateBadge from './generate-badge';
import { CompanyBigNumbersEntry } from '@/types/big-numbers-company';

interface BigNumbersProps {
	data?: CompanyBigNumbersEntry[] | null;
	description: string;
}

export default function BigNumbersCompany(props: BigNumbersProps) {
	const data = props.data?.[0];

	if (!data) {
		return null;
	}

	const previous = data.previousDate;
	const forecast = data.monthlyForecast;

	return (
		<div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
			<CardDetails
				showForecast={!!forecast}
				type='money'
				description={
					previous
						? props.description +
							previous.totalAllValuePreviousData.toLocaleString('pt-BR', {
								style: 'currency',
								currency: 'brl',
							})
						: ''
				}
				icon={<HandCoins />}
				title={'Faturamento'}
				monthlyForecast={forecast?.totalAllValueForecast}
				value={data.currentDate.totalAllValue}
				Badge={
					previous && (
						<GenerateBadge
							val={Number(data.currentDate.totalAllValue)}
							previousVal={previous.totalAllValuePreviousData}
						/>
					)
				}
			/>
			<CardDetails
				showForecast={!!forecast}
				description={
					previous
						? props.description +
							Number(
								previous.totalAllRentalsApartmentsPreviousData,
							).toLocaleString('pt-BR')
						: ''
				}
				monthlyForecast={forecast?.totalAllRentalsApartmentsForecast}
				icon={<Sigma />}
				title={'Locações'}
				value={data.currentDate.totalAllRentalsApartments}
				Badge={
					previous && (
						<GenerateBadge
							val={Number(data.currentDate.totalAllRentalsApartments)}
							previousVal={previous.totalAllRentalsApartmentsPreviousData}
						/>
					)
				}
			/>
			<CardDetails
				showForecast={!!forecast}
				type='money'
				description={
					previous
						? props.description +
							previous.totalAllTicketAveragePreviousData.toLocaleString(
								'pt-BR',
								{
									style: 'currency',
									currency: 'brl',
								},
							)
						: ''
				}
				monthlyForecast={forecast?.totalAllTicketAverageForecast}
				icon={<SquarePercent />}
				title={'Ticket Médio'}
				value={data.currentDate.totalAllTicketAverage}
				Badge={
					previous && (
						<GenerateBadge
							val={Number(data.currentDate.totalAllTicketAverage)}
							previousVal={previous.totalAllTicketAveragePreviousData}
						/>
					)
				}
			/>
			<CardDetails
				showForecast={!!forecast}
				type='money'
				description={
					previous
						? props.description +
							previous.totalAllTrevparPreviousData.toLocaleString('pt-BR', {
								style: 'currency',
								currency: 'brl',
							})
						: ''
				}
				monthlyForecast={forecast?.totalAllTrevparForecast}
				icon={<Activity />}
				title={'Trevpar'}
				value={data.currentDate.totalAllTrevpar}
				Badge={
					previous && (
						<GenerateBadge
							val={Number(data.currentDate.totalAllTrevpar)}
							previousVal={previous.totalAllTrevparPreviousData}
						/>
					)
				}
			/>
			<CardDetails
				showForecast={!!forecast}
				description={
					previous
						? props.description + previous.totalAllGiroPreviousData.toFixed(2)
						: ''
				}
				icon={<DoorClosed />}
				title={'Giro'}
				value={data.currentDate.totalAllGiro.toFixed(2)}
				monthlyForecast={forecast?.totalAllGiroForecast.toFixed(2)}
				Badge={
					previous && (
						<GenerateBadge
							val={Number(data.currentDate.totalAllGiro)}
							previousVal={previous.totalAllGiroPreviousData}
						/>
					)
				}
			/>
			<CardDetails
				showForecast={!!forecast}
				description={
					previous
						? props.description +
							previous.totalAverageOccupationTimePreviousData
						: ''
				}
				monthlyForecast={forecast?.totalAverageOccupationTimeForecast}
				icon={<AlarmClockCheck />}
				title={'TMO'}
				value={data.currentDate.totalAverageOccupationTime}
				Badge={
					previous && (
						<GenerateBadge
							tmo
							val={data.currentDate.totalAverageOccupationTime}
							previousVal={previous.totalAverageOccupationTimePreviousData}
						/>
					)
				}
			/>
		</div>
	);
}
