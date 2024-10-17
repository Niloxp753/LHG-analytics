/** @format */

import dynamic from 'next/dynamic';
import React from 'react';
const LineChart = dynamic(
	() => import('@/app/(dashboard)/components/charts/LineChart'),
	{ ssr: false },
);

export default function CoustXAB() {
	return (
		<div className='w-full h-full'>
			<LineChart
				title={'Gastos Com Material de A&B'}
				series={[
					{
						name: 'Gasto com enxoval de A&B',
						data: [
							688, 689, 2316, 1228, 540, 3275, 1517, 5525, 484, 1768, 602, 1195,
						],
					},
					{
						name: 'Gasto com utensílios de cozinha',
						data: [
							2443, 3025, 3462, 0, 4668, 8139, 2923, 0, 17077, 1907, 0, 1296,
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
				height={400}
			/>
		</div>
	);
}
