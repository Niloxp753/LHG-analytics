/** @format */

import dynamic from 'next/dynamic';
import React from 'react';
const LineChart = dynamic(
	() => import('@/app/(dashboard)/components/charts/LineChart'),
	{ ssr: false },
);

export default function NightCleaningWorkers() {
	return (
		<LineChart
			height={48}
			title='Total de limpezas - Tarde'
			series={[
				{
					name: 'Mona Louis',
					data: [
						3275, 1517, 1768, 1228, 2443, 3025, 3462, 5525, 1768, 602, 1195,
						1195,
					],
				},
				{
					name: 'Larissa Dias',
					data: [
						1688, 2689, 4139, 1907, 5670, 5525, 2443, 3025, 3162, 1768, 2602,
						1195,
					],
				},
				{
					name: 'Rosangela Campinas',
					data: [
						1907, 5670, 1296, 1228, 540, 3275, 1517, 1768, 602, 1195, 1195,
					],
				},
				{
					name: 'Adriana de Souza',
					data: [
						3025, 3462, 5525, 4700, 602, 1195, 1195, 5670, 1296, 1907, 5670,
						1296,
					],
				},
				{
					name: 'Adriana de Souza',
					data: [
						2443, 3025, 3462, 4700, 4668, 6139, 1907, 3025, 3462, 1568, 5070,
						3296,
					],
				},
				{
					name: 'Amanda da Silva',
					data: [
						3139, 5525, 2443, 3025, 540, 3275, 1517, 2443, 2025, 3462, 2270,
						1296,
					],
				},
				{
					name: 'Vanilda Soares',
					data: [
						1296, 1907, 5670, 4700, 3275, 1517, 1768, 5270, 1286, 2443, 3025,
						3462,
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
	);
}
