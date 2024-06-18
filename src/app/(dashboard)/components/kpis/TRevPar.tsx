/** @format */

import dynamic from 'next/dynamic';
import React from 'react';
const AreaChartsApex = dynamic(
	() => import('@/app/(dashboard)/components/charts/AreaChartsApex'),
	{ ssr: false },
);

export default function TRevPar() {
	return (
		<div className='  max-h-[440px] h-full w-full flex items-center justify-center'>
			<AreaChartsApex
				serie={[80, 60, 55, 73, 60, 75, 60, 70]}
				legend='TRevPar'
				color='#86efac'
				labelColor='#14532d'
			/>
		</div>
	);
}
