/** @format */

import {
	Activity,
	AlarmClockCheck,
	DoorClosed,
	HandCoins,
	Sigma,
	SquarePercent,
} from 'lucide-react';

import { NormalizeTimeNumbers } from '@/utils/normalize-bignumbers-general';
import CardDetails from '../../_components/CardDetails';
import GenerateBadge from './generate-badge';

interface BigNumbersProps {
	ipiranga: any[];
	lapa: any[];
	andar_de_cima: any[];
	tout: any[];
	description: string;
}

export default function BigNumbersCompany(props: BigNumbersProps) {
	const dataIpiranga = props.ipiranga[0];
	const dataLapa = props.lapa[0];
	const dataAndarDeCima = props.andar_de_cima[0];
	const dataTout = props.tout[0];

	const totalAllValue =
		dataIpiranga.currentDate.totalAllValue +
		dataLapa.currentDate.totalAllValue +
		dataAndarDeCima.currentDate.totalAllValue +
		dataTout.currentDate.totalAllValue;

	const totalAllRentalsApartments =
		dataIpiranga.currentDate.totalAllRentalsApartments +
		dataLapa.currentDate.totalAllRentalsApartments +
		dataAndarDeCima.currentDate.totalAllRentalsApartments +
		dataTout.currentDate.totalAllRentalsApartments;

	const totalAllTicketAverage =
		(dataIpiranga.currentDate.totalAllTicketAverage +
			dataLapa.currentDate.totalAllTicketAverage +
			dataAndarDeCima.currentDate.totalAllTicketAverage +
			dataTout.currentDate.totalAllTicketAverage) /
		4;

	const totalAllTrevpar =
		(dataIpiranga.currentDate.totalAllTrevpar +
			dataLapa.currentDate.totalAllTrevpar +
			dataAndarDeCima.currentDate.totalAllTrevpar +
			dataTout.currentDate.totalAllTrevpar) /
		4;

	const totalAverageOccupationTime = NormalizeTimeNumbers({
		values: [
			dataIpiranga.currentDate.totalAverageOccupationTime,
			dataLapa.currentDate.totalAverageOccupationTime,
			dataAndarDeCima.currentDate.totalAverageOccupationTime,
			dataTout.currentDate.totalAverageOccupationTime,
		],
		operation: 'media',
	});

	const totalAllGiro =
		(dataIpiranga.currentDate.totalAllGiro +
			dataLapa.currentDate.totalAllGiro +
			dataAndarDeCima.currentDate.totalAllGiro +
			dataTout.currentDate.totalAllGiro) /
		4;

	const totalAllValuePrevious =
		dataIpiranga.previousDate &&
		dataIpiranga.previousDate.totalAllValuePreviousData +
			dataLapa.previousDate?.totalAllValuePreviousData +
			dataAndarDeCima.previousDate?.totalAllValuePreviousData +
			dataTout.previousDate?.totalAllValuePreviousData;

	const totalAllRentalsApartmentsPrevious =
		dataIpiranga.previousDate &&
		dataIpiranga.previousDate?.totalAllRentalsApartmentsPreviousData +
			dataLapa.previousDate?.totalAllRentalsApartmentsPreviousData +
			dataAndarDeCima.previousDate?.totalAllRentalsApartmentsPreviousData +
			dataTout.previousDate?.totalAllRentalsApartmentsPreviousData;

	const totalAllTicketAveragePrevious =
		dataIpiranga.previousDate &&
		(dataIpiranga.previousDate?.totalAllTicketAveragePreviousData +
			dataLapa.previousDate?.totalAllTicketAveragePreviousData +
			dataAndarDeCima.previousDate?.totalAllTicketAveragePreviousData +
			dataTout.previousDate?.totalAllTicketAveragePreviousData) /
			4;

	const totalAllTrevparPrevious =
		dataIpiranga.previousDate &&
		(dataIpiranga.previousDate?.totalAllTrevparPreviousData +
			dataLapa.previousDate?.totalAllTrevparPreviousData +
			dataAndarDeCima.previousDate?.totalAllTrevparPreviousData +
			dataTout.previousDate?.totalAllTrevparPreviousData) /
			4;

	const totalAverageOccupationTimePrevious =
		dataIpiranga.previousDate &&
		NormalizeTimeNumbers({
			values: [
				dataIpiranga.previousDate?.totalAverageOccupationTimePreviousData,
				dataLapa.previousDate?.totalAverageOccupationTimePreviousData,
				dataAndarDeCima.previousDate?.totalAverageOccupationTimePreviousData,
				dataTout.previousDate?.totalAverageOccupationTimePreviousData,
			],
			operation: 'media',
		});

	const totalAllGiroPrevious =
		dataIpiranga.previousDate &&
		(dataIpiranga.previousDate?.totalAllGiroPreviousData +
			dataLapa.previousDate?.totalAllGiroPreviousData +
			dataAndarDeCima.previousDate?.totalAllGiroPreviousData +
			dataTout.previousDate?.totalAllGiroPreviousData) /
			4;

	const totalAllValueForecast =
		dataIpiranga.monthlyForecast.totalAllValueForecast +
		dataLapa.monthlyForecast.totalAllValueForecast +
		dataAndarDeCima.monthlyForecast.totalAllValueForecast +
		dataTout.monthlyForecast.totalAllValueForecast;

	const totalAllRentalsApartmentsForecast =
		dataIpiranga.monthlyForecast.totalAllRentalsApartmentsForecast +
		dataLapa.monthlyForecast.totalAllRentalsApartmentsForecast +
		dataAndarDeCima.monthlyForecast.totalAllRentalsApartmentsForecast +
		dataTout.monthlyForecast.totalAllRentalsApartmentsForecast;

	const totalAllTicketAverageForecast =
		(dataIpiranga.monthlyForecast.totalAllTicketAverageForecast +
			dataLapa.monthlyForecast.totalAllTicketAverageForecast +
			dataAndarDeCima.monthlyForecast.totalAllTicketAverageForecast +
			dataTout.monthlyForecast.totalAllTicketAverageForecast) /
		4;

	const totalAllTrevparForecast =
		(dataIpiranga.monthlyForecast.totalAllTrevparForecast +
			dataLapa.monthlyForecast.totalAllTrevparForecast +
			dataAndarDeCima.monthlyForecast.totalAllTrevparForecast +
			dataTout.monthlyForecast.totalAllTrevparForecast) /
		4;

	const totalAllGiroForecast =
		(dataIpiranga.monthlyForecast.totalAllGiroForecast +
			dataLapa.monthlyForecast.totalAllGiroForecast +
			dataAndarDeCima.monthlyForecast.totalAllGiroForecast +
			dataTout.monthlyForecast.totalAllGiroForecast) /
		4;

	const totalAverageOccupationTimeForecast = NormalizeTimeNumbers({
		values: [
			dataIpiranga.monthlyForecast.totalAverageOccupationTimeForecast,
			dataLapa.monthlyForecast.totalAverageOccupationTimeForecast,
			dataAndarDeCima.monthlyForecast.totalAverageOccupationTimeForecast,
			dataTout.monthlyForecast.totalAverageOccupationTimeForecast,
		],
		operation: 'media',
	});

	return (
		<div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
			<CardDetails
				type='money'
				description={
					dataIpiranga.previousDate
						? props.description +
						  totalAllValuePrevious.toLocaleString('pt-BR', {
								style: 'currency',
								currency: 'brl',
						  })
						: ''
				}
				icon={<HandCoins />}
				title={'Faturamento'}
				monthlyForecast={totalAllValueForecast}
				value={totalAllValue!}
				Badge={
					dataIpiranga.previousDate && (
						<GenerateBadge
							val={Number(totalAllValue)}
							previousVal={totalAllValuePrevious}
						/>
					)
				}
			/>
			<CardDetails
				description={
					dataIpiranga.previousDate
						? props.description +
						  Number(totalAllRentalsApartmentsPrevious).toLocaleString('pt-BR')
						: ''
				}
				monthlyForecast={totalAllRentalsApartmentsForecast}
				icon={<Sigma />}
				title={'Locações'}
				value={totalAllRentalsApartments}
				Badge={
					dataIpiranga.previousDate && (
						<GenerateBadge
							val={Number(totalAllRentalsApartments)}
							previousVal={totalAllRentalsApartmentsPrevious}
						/>
					)
				}
			/>
			<CardDetails
				type='money'
				description={
					dataIpiranga.previousDate
						? props.description +
						  totalAllTicketAveragePrevious.toLocaleString('pt-BR', {
								style: 'currency',
								currency: 'brl',
						  })
						: ''
				}
				monthlyForecast={totalAllTicketAverageForecast}
				icon={<SquarePercent />}
				title={'Ticket Médio'}
				value={totalAllTicketAverage!}
				Badge={
					dataIpiranga.previousDate && (
						<GenerateBadge
							val={Number(totalAllTicketAverage)}
							previousVal={totalAllTicketAveragePrevious}
						/>
					)
				}
			/>
			<CardDetails
				type='money'
				description={
					dataIpiranga.previousDate
						? props.description +
						  totalAllTrevparPrevious.toLocaleString('pt-BR', {
								style: 'currency',
								currency: 'brl',
						  })
						: ''
				}
				monthlyForecast={totalAllTrevparForecast}
				icon={<Activity />}
				title={'Trevpar'}
				value={totalAllTrevpar!}
				Badge={
					dataIpiranga.previousDate && (
						<GenerateBadge
							val={Number(totalAllTrevpar)}
							previousVal={totalAllTrevparPrevious}
						/>
					)
				}
			/>
			<CardDetails
				description={
					dataIpiranga.previousDate
						? props.description + totalAllGiroPrevious.toFixed(2)
						: ''
				}
				icon={<DoorClosed />}
				title={'Giro'}
				value={totalAllGiro.toFixed(2)}
				monthlyForecast={totalAllGiroForecast.toFixed(2)}
				Badge={
					dataIpiranga.previousDate && (
						<GenerateBadge
							val={Number(totalAllGiro)}
							previousVal={totalAllGiroPrevious}
						/>
					)
				}
			/>
			<CardDetails
				description={
					dataIpiranga.previousDate
						? props.description + totalAverageOccupationTimePrevious
						: ''
				}
				monthlyForecast={totalAverageOccupationTimeForecast}
				icon={<AlarmClockCheck />}
				title={'TMO'}
				value={totalAverageOccupationTime!}
				Badge={
					dataIpiranga.previousDate && (
						<GenerateBadge
							tmo
							val={totalAverageOccupationTime!}
							previousVal={totalAverageOccupationTimePrevious}
						/>
					)
				}
			/>
		</div>
	);
}
