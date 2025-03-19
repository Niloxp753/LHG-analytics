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
}

interface RentalsEntry {
	[date: string]: {
		totalAllTicketAverage: string;
	};
}

export default function TKTxUnity({ ipiranga, lapa }: TKTxUnityProps) {
	const ticketAverageByDateIpiranga = NormalizeTKTMedio({ data: ipiranga });
	const ticketAverageByDateLapa = NormalizeTKTMedio({ data: lapa });
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
				]}
				categories={ticketAverageByDateIpiranga?.dates}
			/>
		</>
	);
}
