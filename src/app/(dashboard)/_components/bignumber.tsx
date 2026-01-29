/** @format */

import { CompanyBigNumbersEntry } from '@/types/big-numbers-company';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import {
	Activity,
	AlarmClockCheck,
	DoorClosed,
	HandCoins,
	Sigma,
	SquarePercent,
} from 'lucide-react';
import GenerateBadge from '../general/_components/generate-badge';
import CardDetails from './CardDetails';

interface BigNumbersProps {
	data?: CompanyBigNumbersEntry[] | null;
	description: string;
}

export default function BigNumbers(props: BigNumbersProps) {
	const isLoading = typeof props.data === 'undefined';
	const error =
		props.data === null ? 'Não foi possível carregar os dados.' : undefined;
	const entry = props.data?.[0];

	if (isLoading) {
		return (
			<div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
				{Array.from({ length: 6 }).map((_, index) => (
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

	if (!entry) {
		return null;
	}

	const previous = entry.previousDate;
	const forecast = entry.monthlyForecast;

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
				monthlyForecast={forecast?.totalAllValueForecast}
				icon={<HandCoins />}
				title={'Faturamento'}
				value={entry.currentDate.totalAllValue}
				Badge={
					previous && (
						<GenerateBadge
							val={Number(entry.currentDate.totalAllValue)}
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
				value={entry.currentDate.totalAllRentalsApartments}
				Badge={
					previous && (
						<GenerateBadge
							val={Number(entry.currentDate.totalAllRentalsApartments)}
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
				value={entry.currentDate.totalAllTicketAverage}
				Badge={
					previous && (
						<GenerateBadge
							val={Number(entry.currentDate.totalAllTicketAverage)}
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
				value={entry.currentDate.totalAllTrevpar}
				Badge={
					previous && (
						<GenerateBadge
							val={Number(entry.currentDate.totalAllTrevpar)}
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
				monthlyForecast={forecast?.totalAllGiroForecast?.toFixed(2)}
				icon={<DoorClosed />}
				title={'Giro'}
				value={entry.currentDate.totalAllGiro.toFixed(2)}
				Badge={
					previous && (
						<GenerateBadge
							val={Number(entry.currentDate.totalAllGiro)}
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
				value={entry.currentDate.totalAverageOccupationTime}
				Badge={
					previous && (
						<GenerateBadge
							tmo
							val={entry.currentDate.totalAverageOccupationTime}
							previousVal={previous.totalAverageOccupationTimePreviousData}
						/>
					)
				}
			/>
		</div>
	);
}
