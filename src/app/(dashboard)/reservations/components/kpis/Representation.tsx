/** @format */

import dynamic from 'next/dynamic';
import React from 'react';
const ColumnChart = dynamic(
	() => import('@/app/(dashboard)/_components/charts/ColumnChart'),
	{ ssr: false },
);

export default function Representation() {
	return (
		<>
			<ColumnChart
				series={[
					{
						name: 'Rep De Reservas',
						data: [25, 27, 29, 25, 26, 30, 29, 25, 26, 29, 26, 30],
					},
				]}
				categories={[
					'jan/2024',
					'fav/2024',
					'mar/2024',
					'abr/2024',
					'mai/2024',
					'jun/2034',
					'jul/2024',
					'ago/2024',
					'set/2024',
					'out/2024',
					'nov/2024',
					'dez/2024',
				]}
				title={'Representatividade de reservas'}
			/>
		</>
	);
}
