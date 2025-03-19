/** @format */

import { NormalizeRentalsByDate } from '@/utils/normalize-rentals-by-date';
import dynamic from 'next/dynamic';
import React from 'react';
const LineChart = dynamic(
	() => import('@/app/(dashboard)/_components/charts/LineChart'),
	{ ssr: false },
);

interface LocationsxUnityProps {
	ipiranga: RentalsEntry[];
	lapa: RentalsEntry[];
}

interface RentalsEntry {
	[date: string]: {
		totalAllRentalsApartments: number;
	};
}

export default function LocationsxUnity({
	ipiranga,
	lapa,
}: LocationsxUnityProps) {
	const rentalsByDateIpiranga = NormalizeRentalsByDate({ data: ipiranga });

	const rentalsByDateLapa = NormalizeRentalsByDate({ data: lapa });

	return (
		<>
			<LineChart
				height={52}
				title='Locações por Unidade'
				series={[
					{
						data: rentalsByDateIpiranga?.values,
						name: 'Lush Ipiranga',
					},
					{
						data: rentalsByDateLapa.values,
						name: 'Lush Lapa',
					},
				]}
				categories={rentalsByDateIpiranga?.dates}
			/>
		</>
	);
}
