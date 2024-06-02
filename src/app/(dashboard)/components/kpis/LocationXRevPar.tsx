/** @format */

import dynamic from 'next/dynamic';
import React from 'react';
const LineChartsApex = dynamic(
	() => import('@/app/(dashboard)/components/LineChartsApex'),
	{ ssr: false },
);

export default function LocationXRevPar() {
	return (
		<div className='h-full w-full flex justify-center items-center'>
			<LineChartsApex
				title={'Ticket Médio x TRevPar'}
				legend01={'Locação'}
				legend02='RevPar'
			/>
		</div>
	);
}
