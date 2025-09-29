/** @format */

import { NormalizeOccupancyRate } from '@/utils/normalize-occupancy-rate';
import dynamic from 'next/dynamic';
import React from 'react';
const LineChart = dynamic(
	() => import('@/app/(dashboard)/_components/charts/LineChart'),
	{ ssr: false },
);

interface OccupancyRateEntry {
	categories: string[];
	series: number[];
}

interface OccupationXUnityProps {
	ipiranga: OccupancyRateEntry;
	lapa: OccupancyRateEntry;
	andar_de_cima: OccupancyRateEntry;
	tout: OccupancyRateEntry;
}
export default function OccupationXUnity({
	ipiranga,
	lapa,
	andar_de_cima,
	tout,
}: OccupationXUnityProps) {
	return (
		<>
			<LineChart
				height={148}
				title='Taxa de ocupação por Unidade'
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
		</>
	);
}
