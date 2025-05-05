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

	const totalAllValue = NormalizeCurrencyNumbers({
		values: [
			dataIpiranga.currentDate.totalAllValue,
			dataLapa.currentDate.totalAllValue,
			dataAndarDeCima.currentDate.totalAllValue,
			dataTout.currentDate.totalAllValue,
		],
		operation: 'soma',
	});

	const totalAllRentalsApartments =
		dataIpiranga.currentDate.totalAllRentalsApartments +
		dataLapa.currentDate.totalAllRentalsApartments +
		dataAndarDeCima.currentDate.totalAllRentalsApartments +
		dataTout.currentDate.totalAllRentalsApartments;

	const totalAllTicketAverage = NormalizeCurrencyNumbers({
		values: [
			dataIpiranga.currentDate.totalAllTicketAverage,
			dataLapa.currentDate.totalAllTicketAverage,
			dataAndarDeCima.currentDate.totalAllTicketAverage,
			dataTout.currentDate.totalAllTicketAverage,
		],
		operation: 'media',
	});
	const totalAllRevpar = NormalizeCurrencyNumbers({
		values: [
			dataIpiranga.currentDate.totalAllRevpar,
			dataLapa.currentDate.totalAllRevpar,
			dataAndarDeCima.currentDate.totalAllRevpar,
			dataTout.currentDate.totalAllRevpar,
		],
		operation: 'media',
	});

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
		dataIpiranga.PreviousDate &&
		NormalizeCurrencyNumbers({
			values: [
				dataIpiranga.PreviousDate.totalAllValuePreviousData,
				dataLapa.PreviousDate.totalAllValuePreviousData,
				dataAndarDeCima.PreviousDate.totalAllValuePreviousData,
				dataTout.PreviousDate.totalAllValuePreviousData,
			],
			operation: 'soma',
		});

	const totalAllRentalsApartmentsPrevious =
		dataIpiranga.PreviousDate &&
		dataIpiranga.PreviousDate.totalAllRentalsApartmentsPreviousData +
			dataLapa.PreviousDate.totalAllRentalsApartmentsPreviousData +
			dataAndarDeCima.PreviousDate.totalAllRentalsApartmentsPreviousData +
			dataTout.PreviousDate.totalAllRentalsApartmentsPreviousData;

	const totalAllTicketAveragePrevious =
		dataIpiranga.PreviousDate &&
		NormalizeCurrencyNumbers({
			values: [
				dataIpiranga.PreviousDate.totalAllTicketAveragePreviousData,
				dataLapa.PreviousDate.totalAllTicketAveragePreviousData,
				dataAndarDeCima.PreviousDate.totalAllTicketAveragePreviousData,
				dataTout.PreviousDate.totalAllTicketAveragePreviousData,
			],
			operation: 'media',
		});

	const totalAllRevparPrevious =
		dataIpiranga.PreviousDate &&
		NormalizeCurrencyNumbers({
			values: [
				dataIpiranga.PreviousDate.totalAllRevparPreviousData,
				dataLapa.PreviousDate.totalAllRevparPreviousData,
				dataAndarDeCima.PreviousDate.totalAllRevparPreviousData,
				dataTout.PreviousDate.totalAllRevparPreviousData,
			],
			operation: 'media',
		});

	const totalAverageOccupationTimePrevious =
		dataIpiranga.PreviousDate &&
		NormalizeTimeNumbers({
			values: [
				dataIpiranga.PreviousDate.totalAverageOccupationTimePreviousData,
				dataLapa.PreviousDate.totalAverageOccupationTimePreviousData,
				dataAndarDeCima.PreviousDate.totalAverageOccupationTimePreviousData,
				dataTout.PreviousDate.totalAverageOccupationTimePreviousData,
			],
			operation: 'media',
		});

	const totalAllGiroPrevious =
		dataIpiranga.PreviousDate &&
		(dataIpiranga.PreviousDate.totalAllGiroPreviousData +
			dataLapa.PreviousDate.totalAllGiroPreviousData +
			dataAndarDeCima.PreviousDate.totalAllGiroPreviousData +
			dataTout.PreviousDate.totalAllGiroPreviousData) /
			4;
	return (
		<div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
			<CardDetails
				type='money'
				description={
					dataIpiranga.PreviousDate
						? props.description +
						  totalAllValuePrevious.toLocaleString('pt-BR', {
								style: 'currency',
								currency: 'brl',
						  })
						: ''
				}
				icon={<HandCoins />}
				title={'Faturamento'}
				value={totalAllValue!}
				Badge={
					dataIpiranga.PreviousDate && (
						<GenerateBadge
							val={Number(totalAllValue)}
							previousVal={totalAllValuePrevious}
						/>
					)
				}
			/>
			<CardDetails
				description={
					dataIpiranga.PreviousDate
						? props.description +
						  Number(totalAllRentalsApartmentsPrevious).toLocaleString('pt-BR')
						: ''
				}
				icon={<Sigma />}
				title={'Locações'}
				value={totalAllRentalsApartments}
				Badge={
					dataIpiranga.PreviousDate && (
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
					dataIpiranga.PreviousDate
						? props.description +
						  totalAllTicketAveragePrevious.toLocaleString('pt-BR', {
								style: 'currency',
								currency: 'brl',
						  })
						: ''
				}
				icon={<SquarePercent />}
				title={'Ticket Médio'}
				value={totalAllTicketAverage!}
				Badge={
					dataIpiranga.PreviousDate && (
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
					dataIpiranga.PreviousDate
						? props.description +
						  totalAllRevparPrevious.toLocaleString('pt-BR', {
								style: 'currency',
								currency: 'brl',
						  })
						: ''
				}
				icon={<Activity />}
				title={'Revpar'}
				value={totalAllRevpar!}
				Badge={
					dataIpiranga.PreviousDate && (
						<GenerateBadge
							val={Number(totalAllRevpar)}
							previousVal={totalAllRevparPrevious}
						/>
					)
				}
			/>
			<CardDetails
				description={
					dataIpiranga.PreviousDate
						? props.description + totalAllGiroPrevious.toFixed(2)
						: ''
				}
				icon={<DoorClosed />}
				title={'Giro'}
				value={totalAllGiro.toFixed(2)}
				Badge={
					dataIpiranga.PreviousDate && (
						<GenerateBadge
							val={Number(totalAllGiro)}
							previousVal={totalAllGiroPrevious}
						/>
					)
				}
			/>
			<CardDetails
				description={
					dataIpiranga.PreviousDate
						? props.description + totalAverageOccupationTimePrevious
						: ''
				}
				icon={<AlarmClockCheck />}
				title={'TMO'}
				value={totalAverageOccupationTime!}
				Badge={
					dataIpiranga.PreviousDate && (
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
