/** @format */

import { Blend, HandCoins, Sigma, SquarePercent } from 'lucide-react';

import CardDetails from '../../_components/CardDetails';
import GenerateBadge from '../../general/_components/generate-badge';
import { ReservationsBigNumbersEntry } from '@/types/big-numbers-reservations';

interface BigNumbersProps {
	ipiranga?: ReservationsBigNumbersEntry[] | null;
	lapa?: ReservationsBigNumbersEntry[] | null;
	andar_de_cima?: ReservationsBigNumbersEntry[] | null;
	tout?: ReservationsBigNumbersEntry[] | null;
	description: string;
	ecommerce: boolean;
}

export default function BigNumbersReservationPage(props: BigNumbersProps) {
	const dataIpiranga = props.ipiranga?.[0];
	const dataLapa = props.lapa?.[0];
	const dataAndarDeCima = props.andar_de_cima?.[0];
	const dataTout = props.tout?.[0];

	if (!dataIpiranga || !dataLapa || !dataAndarDeCima || !dataTout) {
		return null;
	}

	const totalAllValue =
		dataIpiranga.currentDate.totalAllValue +
		dataLapa.currentDate.totalAllValue +
		dataAndarDeCima.currentDate.totalAllValue +
		dataTout.currentDate.totalAllValue;

	const totalAllBookings =
		dataIpiranga.currentDate.totalAllBookings +
		dataLapa.currentDate.totalAllBookings +
		dataAndarDeCima.currentDate.totalAllBookings +
		dataTout.currentDate.totalAllBookings;

	const totalAllTicketAverage =
		(dataIpiranga.currentDate.totalAllTicketAverage +
			dataLapa.currentDate.totalAllTicketAverage +
			dataAndarDeCima.currentDate.totalAllTicketAverage +
			dataTout.currentDate.totalAllTicketAverage) /
		4;

	const totalAllRepresentativeness =
		(dataIpiranga.currentDate.totalAllRepresentativeness +
			dataLapa.currentDate.totalAllRepresentativeness +
			dataAndarDeCima.currentDate.totalAllRepresentativeness +
			dataTout.currentDate.totalAllRepresentativeness) /
		4;

	const totalAllValuePrevious =
		dataIpiranga.previousDate &&
		dataIpiranga.previousDate.totalAllValuePreviousData +
			dataLapa.previousDate.totalAllValuePreviousData +
			dataAndarDeCima.previousDate.totalAllValuePreviousData +
			dataTout.previousDate.totalAllValuePreviousData;

	const totalAllBookingsPrevious =
		dataIpiranga.previousDate &&
		dataIpiranga.previousDate.totalAllBookingsPreviousData +
			dataLapa.previousDate.totalAllBookingsPreviousData +
			dataAndarDeCima.previousDate.totalAllBookingsPreviousData +
			dataTout.previousDate.totalAllBookingsPreviousData;

	const totalAllTicketAveragePrevious =
		dataIpiranga.previousDate &&
		(dataIpiranga.previousDate.totalAllTicketAveragePreviousData +
			dataLapa.previousDate.totalAllTicketAveragePreviousData +
			dataAndarDeCima.previousDate.totalAllTicketAveragePreviousData +
			dataTout.previousDate.totalAllTicketAveragePreviousData) /
			4;

	const totalAllRepresentativenessPrevious =
		dataIpiranga.previousDate &&
		(dataIpiranga.previousDate.totalAllRepresentativenessPreviousData +
			dataLapa.previousDate.totalAllRepresentativenessPreviousData +
			dataAndarDeCima.previousDate.totalAllRepresentativenessPreviousData +
			dataTout.previousDate.totalAllRepresentativenessPreviousData) /
			4;

	const hasMonthlyForecast =
		dataIpiranga.monthlyForecast &&
		dataLapa.monthlyForecast &&
		dataAndarDeCima.monthlyForecast &&
		dataTout.monthlyForecast;

	const totalAllValueForecast = hasMonthlyForecast
		? dataIpiranga.monthlyForecast.totalAllValueForecast +
		  dataLapa.monthlyForecast.totalAllValueForecast +
		  dataAndarDeCima.monthlyForecast.totalAllValueForecast +
		  dataTout.monthlyForecast.totalAllValueForecast
		: null;

	const totalAllBookingsForecast = hasMonthlyForecast
		? dataIpiranga.monthlyForecast.totalAllBookingsForecast +
		  dataLapa.monthlyForecast.totalAllBookingsForecast +
		  dataAndarDeCima.monthlyForecast.totalAllBookingsForecast +
		  dataTout.monthlyForecast.totalAllBookingsForecast
		: null;

	const totalAllTicketAverageForecast = hasMonthlyForecast
		? (dataIpiranga.monthlyForecast.totalAllTicketAverageForecast +
				dataLapa.monthlyForecast.totalAllTicketAverageForecast +
				dataAndarDeCima.monthlyForecast.totalAllTicketAverageForecast +
				dataTout.monthlyForecast.totalAllTicketAverageForecast) /
		  4
		: null;

	const totalAllRepresentativenessForecast = hasMonthlyForecast
		? (dataIpiranga.monthlyForecast.totalAllRepresentativenessForecast +
				dataLapa.monthlyForecast.totalAllRepresentativenessForecast +
				dataAndarDeCima.monthlyForecast.totalAllRepresentativenessForecast +
				dataTout.monthlyForecast.totalAllRepresentativenessForecast) /
		  4
		: null;

	return (
		<div className='grid grid-cols-1 h-full w-full md:grid-cols-2 2xl:grid-cols-4 gap-5'>
			<CardDetails
				showForecast={!!hasMonthlyForecast}
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
				title={'Receita De Reservas' + `${props.ecommerce ? ' Ecommerce' : ''}`}
				monthlyForecast={
					hasMonthlyForecast ? totalAllValueForecast ?? undefined : undefined
				}
				value={totalAllValue!}
				type='money'
				Badge={
					dataIpiranga.previousDate && (
						<GenerateBadge
							val={totalAllValue!}
							previousVal={totalAllValuePrevious}
						/>
					)
				}
			/>
			<CardDetails
				showForecast={!!hasMonthlyForecast}
				description={
					dataIpiranga.previousDate
						? props.description +
						  totalAllBookingsPrevious.toLocaleString('pt-BR')
						: ''
				}
				icon={<Sigma />}
				title={'Número de Reservas' + `${props.ecommerce ? ' Ecommerce' : ''}`}
				monthlyForecast={
					hasMonthlyForecast ? totalAllBookingsForecast ?? undefined : undefined
				}
				value={totalAllBookings}
				Badge={
					dataIpiranga.previousDate && (
						<GenerateBadge
							val={totalAllBookings!}
							previousVal={totalAllBookingsPrevious}
						/>
					)
				}
			/>
			<CardDetails
				showForecast={!!hasMonthlyForecast}
				description={
					dataIpiranga.previousDate
						? props.description +
						  totalAllTicketAveragePrevious.toLocaleString('pt-BR', {
								style: 'currency',
								currency: 'brl',
						  })
						: ''
				}
				icon={<SquarePercent />}
				type='money'
				title={'Ticket Médio' + `${props.ecommerce ? ' Ecommerce' : ''}`}
				monthlyForecast={
					hasMonthlyForecast
						? totalAllTicketAverageForecast ?? undefined
						: undefined
				}
				value={totalAllTicketAverage!}
				Badge={
					dataIpiranga.previousDate && (
						<GenerateBadge
							val={totalAllTicketAverage!}
							previousVal={totalAllTicketAveragePrevious}
						/>
					)
				}
			/>
			<CardDetails
				showForecast={!!hasMonthlyForecast}
				description={
					dataIpiranga.previousDate
						? props.description +
						  (totalAllRepresentativenessPrevious * 100).toFixed(2) +
						  '%'
						: ''
				}
				icon={<Blend />}
				title={
					'Representatividade' + `${props.ecommerce ? ' Ecommerce   ' : ''}`
				}
				monthlyForecast={
					hasMonthlyForecast
						? totalAllRepresentativenessForecast ?? undefined
						: undefined
				}
				value={totalAllRepresentativeness}
				type='percent'
				Badge={
					dataIpiranga.previousDate && (
						<GenerateBadge
							val={totalAllRepresentativeness!}
							previousVal={totalAllRepresentativenessPrevious}
						/>
					)
				}
			/>
		</div>
	);
}
