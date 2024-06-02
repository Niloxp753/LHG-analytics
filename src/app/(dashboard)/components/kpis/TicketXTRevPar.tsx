/** @format */

import dynamic from 'next/dynamic';
import React from 'react';
const LineChartsApex = dynamic(
	() => import('@/app/(dashboard)/components/LineChartsApex'),
	{ ssr: false },
);

export default function TicketXRevPar() {
	return (
		<div className='  max-h-[440px] h-full w-full flex items-center justify-center'>
			<LineChartsApex
				title={'Ticket Médio x TRevPar'}
				legend01={'Ticket Médio'}
				legend02='TRevPar'
			/>
		</div>
	);
}
