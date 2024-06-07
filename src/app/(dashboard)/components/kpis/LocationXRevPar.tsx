/** @format */

import dynamic from 'next/dynamic';
import React from 'react';
const AreaChartsApexDouble = dynamic(
	() => import('@/app/(dashboard)/components/charts/AreaChartsApexDouble'),
	{ ssr: false },
);

export default function LocationXRevPar() {
	return (
		<div className='h-full w-full flex justify-center items-center'>
			<AreaChartsApexDouble
				serie01={[70, 50, 60, 70, 60, 70, 60, 65]}
				serie02={[80, 70, 55, 60, 65, 65, 70, 60]}
				legend01='Locações'
				legend02='RevPar'
			/>
		</div>
	);
}
