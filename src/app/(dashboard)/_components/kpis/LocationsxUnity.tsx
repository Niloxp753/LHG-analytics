/** @format */

import { NormalizeRentalsByDate } from '@/utils/normalize-rentals-by-date';
import dynamic from 'next/dynamic';
import React from 'react';
const LineChart = dynamic(
	() => import('@/app/(dashboard)/_components/charts/LineChart'),
	{ ssr: false },
);

interface LocationsxUnityProps {
	ipiranga: RentalsEntry;
	lapa: RentalsEntry;
	andar_de_cima: RentalsEntry;
	tout: RentalsEntry;
}

interface RentalsEntry {
	categories: string[];
	series: number[];
}

export default function LocationsxUnity({
	ipiranga,
	lapa,
	andar_de_cima,
	tout,
}: LocationsxUnityProps) {
	return (
		<>
			<LineChart
				height={52}
				title='Locações por Unidade'
				series={[
					{
						data: ipiranga?.series,
						name: 'Lush Ipiranga',
					},
					{
						data: lapa.series,
						name: 'Lush Lapa',
					},
					{
						data: andar_de_cima.series,
						name: 'Andar de Cima',
					},
					{
						data: tout.series,
						name: 'Tout',
					},
				]}
				categories={ipiranga?.categories}
			/>
		</>
	);
}
