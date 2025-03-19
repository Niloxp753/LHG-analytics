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
}
export default function OccupationXUnity({
	ipiranga,
	lapa,
}: OccupationXUnityProps) {
	const occupancyRateByDateIpiranga = NormalizeOccupancyRate({
		data: ipiranga,
	});
	const occupancyRateByDateLapa = NormalizeOccupancyRate({ data: lapa });
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
				]}
				categories={occupancyRateByDateIpiranga.dates}
			/>
		</>
	);
}
