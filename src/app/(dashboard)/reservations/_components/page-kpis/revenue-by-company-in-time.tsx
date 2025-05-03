/** @format */

import dynamic from 'next/dynamic';
import React from 'react';
const LineChartsApex = dynamic(
	() => import('@/app/(dashboard)/_components/charts/LineChart'),
	{ ssr: false },
);

interface InvoicingXReservsProps {
	series: number[];
	categories: string[];
}

interface IData {
	ipiranga: InvoicingXReservsProps;
	lapa: InvoicingXReservsProps;
	andar_de_cima: InvoicingXReservsProps;
	tout: InvoicingXReservsProps;
	title: string;
	money?: boolean;
	percent?: boolean;
}
export default function DataByCompanyReservationsInTime({
	ipiranga,
	lapa,
	andar_de_cima,
	tout,
	title,
	money = false,
	percent = false,
}: IData) {
	return (
		<LineChartsApex
			money={money}
			percent={percent}
			categories={ipiranga.categories}
			series={[
				{
					data: percent ? isPercent(ipiranga) : ipiranga.series,
					name: 'Lush Ipiranga',
				},
				{
					data: percent ? isPercent(lapa) : lapa.series,
					name: 'Lush Lapa',
				},
				{
					data: percent ? isPercent(andar_de_cima) : andar_de_cima.series,
					name: 'Andar de Cima',
				},
				{
					data: percent ? isPercent(tout) : tout.series,
					name: 'Tout',
				},
			]}
			title={title}
			height={undefined}
		/>
	);
}

function isPercent(data: InvoicingXReservsProps) {
	const dataT = data.series.map((item) => {
		const value = item * 100;
		return parseFloat(value.toFixed(2));
	});

	return dataT;
}
