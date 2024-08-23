/** @format */

import dynamic from 'next/dynamic';
import React from 'react';
const AreaChartsApex = dynamic(
	() => import('@/app/(dashboard)/components/charts/AreaChartsApex'),
	{ ssr: false },
);

export default function RevPar() {
	return (
		<div className='h-full w-full flex justify-center items-center'>
			<AreaChartsApex
				series={[{ data: [80, 70, 55, 60, 65, 65, 70, 60], name: 'RevPar' }]}
				legend='RevPar'
				color='#2dd4bf'
				labelColor='#115e59'
			/>
		</div>
	);
}
