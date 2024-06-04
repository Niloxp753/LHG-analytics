/** @format */

import dynamic from 'next/dynamic';
import React from 'react';
const AreaChartsApexDouble = dynamic(
	() => import('@/app/(dashboard)/components/charts/AreaChartsApexDouble'),
	{ ssr: false },
);

export default function TicketXRevPar() {
	return (
		<div className='  max-h-[440px] h-full w-full flex items-center justify-center'>
			<AreaChartsApexDouble
				serie01={[70, 50, 60, 70, 65, 70, 70, 65]}
				serie02={[80, 40, 50, 50, 60, 65, 60, 60]}
				legend01='Ticket Médio'
				legend02='TRevPar'
			/>
		</div>
	);
}
