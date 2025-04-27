/** @format */

import { NormalizeOccupancyRate } from '@/utils/normalize-occupancy-rate';
import dynamic from 'next/dynamic';
import React from 'react';
const LineChart = dynamic(
	() => import('@/app/(dashboard)/_components/charts/LineChart'),
	{ ssr: false },
);

interface OccupancyRateEntry {
	[date: string]: {
		totalOccupancyRate: string;
	};
}

interface OccupationXUnityProps {
	ipiranga: OccupancyRateEntry[];
	lapa: OccupancyRateEntry[];
	andar_de_cima: OccupancyRateEntry[];
	tout: OccupancyRateEntry[];
}
export default function OccupationXUnity({
	ipiranga,
	lapa,
	andar_de_cima,
	tout,
}: OccupationXUnityProps) {
	const occupancyRateByDateIpiranga = NormalizeOccupancyRate({
		data: ipiranga,
	});
	const occupancyRateByDateLapa = NormalizeOccupancyRate({ data: lapa });
	const occupancyRateByDateAndar = NormalizeOccupancyRate({
		data: andar_de_cima,
	});
	const occupancyRateByDateTout = NormalizeOccupancyRate({ data: tout });

	return (
		<>
			<LineChart
				height={148}
				title='Taxa de ocupação por Unidade'
				series={[
					{
						name: 'Lush Ipiranga',
						data: occupancyRateByDateIpiranga.values,
					},
					{
						name: 'Lush Lapa',
						data: occupancyRateByDateLapa.values,
					},
					{
						name: 'Andar de Cima',
						data: occupancyRateByDateAndar.values,
					},
					{
						name: 'Tout',
						data: occupancyRateByDateTout.values,
					},
				]}
				categories={occupancyRateByDateLapa.dates}
			/>
		</>
	);
}
