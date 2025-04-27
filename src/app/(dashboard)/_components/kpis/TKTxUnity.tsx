/** @format */

import { NormalizeTKTMedio } from '@/utils/normalize-tkm-medio';
import dynamic from 'next/dynamic';
import React from 'react';
const LineChart = dynamic(
	() => import('@/app/(dashboard)/_components/charts/LineChart'),
	{ ssr: false },
);

interface TKTxUnityProps {
	ipiranga: RentalsEntry[];
	lapa: RentalsEntry[];
	andar_de_cima: RentalsEntry[];
	tout: RentalsEntry[];
}

interface RentalsEntry {
	[date: string]: {
		totalAllTicketAverage: string;
	};
}

export default function TKTxUnity({
	ipiranga,
	lapa,
	andar_de_cima,
	tout,
}: TKTxUnityProps) {
	const ticketAverageByDateIpiranga = NormalizeTKTMedio({ data: ipiranga });
	const ticketAverageByDateLapa = NormalizeTKTMedio({ data: lapa });
	const ticketAverageByDateAndar = NormalizeTKTMedio({ data: andar_de_cima });
	const ticketAverageByDateTout = NormalizeTKTMedio({ data: tout });
	return (
		<>
			<LineChart
				money
				height={148}
				title='Ticket Médio por Unidade'
				series={[
					{
						name: 'Lush Ipiranga',
						data: ticketAverageByDateIpiranga.values,
					},
					{
						name: 'Lush Lapa',
						data: ticketAverageByDateLapa.values,
					},
					{
						name: 'Andar de Cima',
						data: ticketAverageByDateAndar.values,
					},
					{
						name: 'Tout',
						data: ticketAverageByDateTout.values,
					},
				]}
				categories={ticketAverageByDateIpiranga?.dates}
			/>
		</>
	);
}
