/** @format */

import dynamic from 'next/dynamic';
import React from 'react';
const LineChart = dynamic(
	() => import('@/app/(dashboard)/_components/charts/LineChart'),
	{ ssr: false },
);

export default function OccupationXUnity() {
	return (
		<>
			<LineChart
				height={148}
				title='Taxa de ocupação por Unidade'
				series={[
					{
						name: 'Lush Ipiranga',
						data: [
							3275, 1517, 1768, 1228, 2443, 3025, 3462, 5525, 1768, 602, 1195,
							1195,
						],
					},
					{
						name: 'Lush Lapa',
						data: [
							688, 689, 2316, 3275, 1517, 5525, 2443, 3025, 3462, 1768, 602,
							1195,
						],
					},
					{
						name: 'Tout Campinas',
						data: [
							1907, 5670, 1296, 1228, 540, 3275, 1517, 1768, 602, 1195, 1195,
						],
					},
					{
						name: 'Andar de Cima',
						data: [
							2443, 3025, 3462, 4700, 4668, 8139, 1907, 5670, 1296, 1907, 5670,
							1296,
						],
					},
				]}
				categories={[
					'jan/24',
					'fev/24',
					'mar/24',
					'abr/24',
					'mai/24',
					'jun/24',
					'jul/24',
					'ago/24',
					'set/24',
					'out/24',
					'nov/24',
					'dez/24',
				]}
			/>
		</>
	);
}
