/** @format */

import { Blend, HandCoins, Sigma, SquarePercent } from 'lucide-react';

import CardDetails from '../../_components/CardDetails';
import GenerateBadge from '../../general/_components/generate-badge';

interface BigNumbersProps {
	ipiranga: any[];
	lapa: any[];
	andar_de_cima: any[];
	tout: any[];
	description: string;
	ecommerce: boolean;
}

export default function BigNumbersReservationPage(props: BigNumbersProps) {
	const dataIpiranga = props.ipiranga[0];
	const dataLapa = props.lapa[0];
	const dataAndarDeCima = props.andar_de_cima[0];
	const dataTout = props.tout[0];

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
		dataIpiranga.PreviousDate &&
		dataIpiranga.PreviousDate.totalAllValuePreviousData +
			dataLapa.PreviousDate.totalAllValuePreviousData +
			dataAndarDeCima.PreviousDate.totalAllValuePreviousData +
			dataTout.PreviousDate.totalAllValuePreviousData;

	const totalAllBookingsPrevious =
		dataIpiranga.PreviousDate &&
		dataIpiranga.PreviousDate.totalAllBookingsPreviousData +
			dataLapa.PreviousDate.totalAllBookingsPreviousData +
			dataAndarDeCima.PreviousDate.totalAllBookingsPreviousData +
			dataTout.PreviousDate.totalAllBookingsPreviousData;

	const totalAllTicketAveragePrevious =
		dataIpiranga.PreviousDate &&
		(dataIpiranga.PreviousDate.totalAllTicketAveragePreviousData +
			dataLapa.PreviousDate.totalAllTicketAveragePreviousData +
			dataAndarDeCima.PreviousDate.totalAllTicketAveragePreviousData +
			dataTout.PreviousDate.totalAllTicketAveragePreviousData) /
			4;

	const totalAllRepresentativenessPrevious =
		dataIpiranga.PreviousDate &&
		(dataIpiranga.PreviousDate.totalAllRepresentativenessPreviousData +
			dataLapa.PreviousDate.totalAllRepresentativenessPreviousData +
			dataAndarDeCima.PreviousDate.totalAllRepresentativenessPreviousData +
			dataTout.PreviousDate.totalAllRepresentativenessPreviousData) /
			4;

	return (
		<div className='grid grid-cols-1 h-full w-full md:grid-cols-2 2xl:grid-cols-4 gap-5'>
			<CardDetails
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
				title={'Receita De Reservas' + `${props.ecommerce ? ' Ecommerce' : ''}`}
				value={totalAllValue!}
				type='money'
				Badge={
					<GenerateBadge
						val={totalAllValue!}
						previousVal={totalAllValuePrevious}
					/>
				}
			/>
			<CardDetails
				description={
					dataIpiranga.PreviousDate
						? props.description +
						  totalAllBookingsPrevious.toLocaleString('pt-BR')
						: ''
				}
				icon={<Sigma />}
				title={'Número De Reservas' + `${props.ecommerce ? ' Ecommerce' : ''}`}
				value={totalAllBookings}
				Badge={
					<GenerateBadge
						val={totalAllBookings!}
						previousVal={totalAllBookingsPrevious}
					/>
				}
			/>
			<CardDetails
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
				type='money'
				title={'Ticket Médio' + `${props.ecommerce ? ' Ecommerce' : ''}`}
				value={totalAllTicketAverage!}
				Badge={
					<GenerateBadge
						val={totalAllTicketAverage!}
						previousVal={totalAllTicketAveragePrevious}
					/>
				}
			/>
			<CardDetails
				description={
					dataIpiranga.PreviousDate
						? props.description +
						  (totalAllRepresentativenessPrevious * 100).toFixed(2) +
						  '%'
						: ''
				}
				icon={<Blend />}
				title={
					'Representatividade' + `${props.ecommerce ? ' Ecommerce   ' : ''}`
				}
				value={totalAllRepresentativeness}
				type='percent'
				Badge={
					<GenerateBadge
						val={totalAllRepresentativeness!}
						previousVal={totalAllRepresentativenessPrevious}
					/>
				}
			/>
		</div>
	);
}
