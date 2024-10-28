/** @format */

import dynamic from 'next/dynamic';
import React from 'react';
const AreaChartsApex = dynamic(
	() => import('@/app/(dashboard)/components/charts/AreaChartsApex'),
	{ ssr: false },
);

export default function EcommerceRevervs() {
	return (
		<>
			<AreaChartsApex
				series={[
					{
						data: [509, 450, 471, 512, 505, 482, 480, 524, 569, 505, 482, 480],
						name: 'Reservas de e-commerce',
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
				
			/>
		</>
	);
}
