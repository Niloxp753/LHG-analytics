/** @format */

import dynamic from 'next/dynamic';
import React from 'react';
const AreaChartsApex = dynamic(
	() => import('@/app/(dashboard)/components/charts/AreaChartsApex'),
	{ ssr: false },
);

export default function EcommerceRevenue() {
	return (
		<>
			<AreaChartsApex
				series={[{data:[25, 27, 29, 28, 27, 30, 29, 27, 26], name:'Receita de e-commerce'}]}
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
				legend={'Receita de E-commerce'}
			/>
		</>
	);
}
