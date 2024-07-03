/** @format */

import dynamic from 'next/dynamic';
import React from 'react';
const BarCharApex = dynamic(
	() => import('@/app/(dashboard)/components/charts/BarCharApex'),
	{ ssr: false },
);

export default function Categories() {
	return (
		<>
			<BarCharApex
				series={[
					{
						name: 'Faturamento',
						data: [30, 40, 45, 50, 49, 60, 70, 91, 120],
						type: 'bar',
					},
				]}
				dataLabelColors={['#5b21b6']}
				colors={['#a78bfa']}
				title='Faturamento por Suíte'
				categories={[
					'Lush',
					'Lush Pop',
					'Lush Hidro',
					'Lush Lounge',
					'Lush Spa',
					'Lush Cine',
					'Lush Splash',
					'Lush Spa Splash',
					'Casa Lush',
				]}
			/>
		</>
	);
}
