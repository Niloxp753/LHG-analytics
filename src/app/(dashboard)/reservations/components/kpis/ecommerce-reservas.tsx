/** @format */

import dynamic from 'next/dynamic';
import React from 'react';
const ColumnChart = dynamic(
	() => import('@/app/(dashboard)/components/charts/ColumnChart'),
	{ ssr: false },
);

export default function EcommerceRevervs() {
	return (
		<>
			<ColumnChart
				data={[509, 450, 461, 512, 505, 482, 480, 524, 599, 692, 562, 512]}
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
				title={'Reservas de E-commerce'}
			/>
		</>
	);
}
