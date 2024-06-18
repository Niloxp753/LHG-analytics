/** @format */

import dynamic from 'next/dynamic';
import React from 'react';
const AreaChartsApex = dynamic(
	() => import('@/app/(dashboard)/components/charts/AreaChartsApex'),
	{ ssr: false },
);

export default function Ticket() {
	return (
		<div className='  max-h-[440px] h-full w-full flex items-center justify-center'>
			<AreaChartsApex
				serie={[70, 65, 60, 70, 65, 70, 70, 65]}
				legend='Ticket Médio'
			/>
		</div>
	);
}
