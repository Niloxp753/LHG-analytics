/** @format */

import { NormalizeRevenueByDate } from '@/utils/normalize-revenue-by-date';
import dynamic from 'next/dynamic';
import React from 'react';
const LineChart = dynamic(
	() => import('@/app/(dashboard)/_components/charts/LineChart'),
	{ ssr: false },
);
interface RevenueEntry {
	[date: string]: {
		totalValue: string;
	};
}

interface InvoicingXUnityXTimeProps {
	ipiranga: RevenueEntry[];
	lapa: RevenueEntry[];
	andar_de_cima: RevenueEntry[];
	tout: RevenueEntry[];
}
export default function InvoicingXUnityXTime({
	ipiranga,
	lapa,
	andar_de_cima,
	tout,
}: InvoicingXUnityXTimeProps) {
	const revenueByDateIpiranga = NormalizeRevenueByDate({ data: ipiranga });
	const revenueByDateLapa = NormalizeRevenueByDate({ data: lapa });
	const revenueByDateAndar = NormalizeRevenueByDate({ data: andar_de_cima });
	const revenueByDateTout = NormalizeRevenueByDate({ data: tout });
	return (
		<>
			<LineChart
				money
				height={148}
				title='Faturamento por Unidade no tempo'
				series={[
					{
						name: 'Lush Ipiranga',
						data: revenueByDateIpiranga.values,
					},
					{
						name: 'Lush Lapa',
						data: revenueByDateLapa.values,
					},
					{
						name: 'Andar de Cima',
						data: revenueByDateAndar.values,
					},
					{
						name: 'Tout',
						data: revenueByDateTout.values,
					},
				]}
				categories={revenueByDateIpiranga.dates}
			/>
		</>
	);
}
