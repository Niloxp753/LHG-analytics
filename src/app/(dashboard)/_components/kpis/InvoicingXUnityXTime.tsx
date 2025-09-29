/** @format */

import { NormalizeRevenueByDate } from '@/utils/normalize-revenue-by-date';
import dynamic from 'next/dynamic';
import React from 'react';
const LineChart = dynamic(
	() => import('@/app/(dashboard)/_components/charts/LineChart'),
	{ ssr: false },
);

interface RevenueEntry {
	categories: string[];
	series: number[];
}

interface InvoicingXUnityXTimeProps {
	ipiranga: RevenueEntry;
	lapa: RevenueEntry;
	andar_de_cima: RevenueEntry;
	tout: RevenueEntry;
}
export default function InvoicingXUnityXTime({
	ipiranga,
	lapa,
	andar_de_cima,
	tout,
}: InvoicingXUnityXTimeProps) {
	return (
		<LineChart
			money
			height={148}
			title='Faturamento por Unidade no tempo'
			series={[
				{
					name: 'Lush Ipiranga',
					data: ipiranga.series,
				},
				{
					name: 'Lush Lapa',
					data: lapa.series,
				},
				{
					name: 'Andar de Cima',
					data: andar_de_cima.series,
				},
				{
					name: 'Tout',
					data: tout.series,
				},
			]}
			categories={ipiranga.categories}
		/>
	);
}
