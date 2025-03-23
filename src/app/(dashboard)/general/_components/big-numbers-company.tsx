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
import {
	NormalizeCurrencyNumbers,
	NormalizeTimeNumbers,
} from '@/utils/normalize-bignumbers-general';

interface BigNumbersProps {
	ipiranga: any[];
	lapa: any[];
	description: string;
}

export default function BigNumbersCompany(props: BigNumbersProps) {
	const dataIpiranga = props.ipiranga[0];
	const dataLapa = props.lapa[0];

	const totalAllValue = NormalizeCurrencyNumbers({
		values: [
			dataIpiranga.currentDate.totalAllValue,
			dataLapa.currentDate.totalAllValue,
		],
		operation: 'soma',
	});

	const totalAllRentalsApartments =
		dataIpiranga.currentDate.totalAllRentalsApartments +
		dataLapa.currentDate.totalAllRentalsApartments;
	const totalAllTicketAverage = NormalizeCurrencyNumbers({
		values: [
			dataIpiranga.currentDate.totalAllTicketAverage,
			dataLapa.currentDate.totalAllTicketAverage,
		],
		operation: 'media',
	});
	const totalAllRevpar = NormalizeCurrencyNumbers({
		values: [
			dataIpiranga.currentDate.totalAllRevpar,
			dataLapa.currentDate.totalAllRevpar,
		],
		operation: 'media',
	});

	const totalAverageOccupationTime = NormalizeTimeNumbers({
		values: [
			dataIpiranga.currentDate.totalAverageOccupationTime,
			dataLapa.currentDate.totalAverageOccupationTime,
		],
		operation: 'media',
	});

	const totalAllGiro =
		(dataIpiranga.currentDate.totalAllGiro +
			dataLapa.currentDate.totalAllGiro) /
		2;

	const totalAllValuePrevious = NormalizeCurrencyNumbers({
		values: [
			dataIpiranga.PreviousDate.totalAllValuePreviousData,
			dataLapa.PreviousDate.totalAllValuePreviousData,
		],
		operation: 'soma',
	});

	const totalAllRentalsApartmentsPrevious =
		dataIpiranga.PreviousDate.totalAllRentalsApartmentsPreviousData +
		dataLapa.PreviousDate.totalAllRentalsApartmentsPreviousData;

	const totalAllTicketAveragePrevious = NormalizeCurrencyNumbers({
		values: [
			dataIpiranga.PreviousDate.totalAllTicketAveragePreviousData,
			dataLapa.PreviousDate.totalAllTicketAveragePreviousData,
		],
		operation: 'media',
	});
	const totalAllRevparPrevious = NormalizeCurrencyNumbers({
		values: [
			dataIpiranga.PreviousDate.totalAllRevparPreviousData,
			dataLapa.PreviousDate.totalAllRevparPreviousData,
		],
		operation: 'media',
	});

	const totalAverageOccupationTimePrevious = NormalizeTimeNumbers({
		values: [
			dataIpiranga.PreviousDate.totalAverageOccupationTimePreviousData,
			dataLapa.PreviousDate.totalAverageOccupationTimePreviousData,
		],
		operation: 'media',
	});

	const totalAllGiroPrevious =
		(dataIpiranga.PreviousDate.totalAllGiroPreviousData +
			dataLapa.PreviousDate.totalAllGiroPreviousData) /
		2;
	return (
		<div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
			<CardDetails
				description={props.description + totalAllValuePrevious}
				icon={<HandCoins />}
				title={'Faturamento'}
				value={totalAllValue!}
			/>
			<CardDetails
				description={
					props.description +
					Number(totalAllRentalsApartmentsPrevious).toLocaleString('pt-BR')
				}
				icon={<Sigma />}
				title={'Locações'}
				value={totalAllRentalsApartments}
			/>
			<CardDetails
				description={props.description + totalAllTicketAveragePrevious}
				icon={<SquarePercent />}
				title={'Ticket Médio'}
				value={totalAllTicketAverage!}
			/>
			<CardDetails
				description={props.description + totalAllRevparPrevious}
				icon={<Activity />}
				title={'Revpar'}
				value={totalAllRevpar!}
			/>
			<CardDetails
				description={props.description + totalAllGiroPrevious.toFixed(2)}
				icon={<DoorClosed />}
				title={'Giro'}
				value={totalAllGiro}
			/>
			<CardDetails
				description={props.description + totalAverageOccupationTimePrevious}
				icon={<AlarmClockCheck />}
				title={'TMO'}
				value={totalAverageOccupationTime!}
			/>
		</div>
	);
}
