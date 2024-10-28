/** @format */


'use client';
import dynamic from 'next/dynamic';
import React from 'react';
const AreaChartsApex = dynamic(
	() => import('@/app/(dashboard)/components/charts/AreaChartsApex'),
	{ ssr: false },
);

export default function Cmv() {
	return (
		<div className='w-full'>
			<AreaChartsApex
				
				series={[
					{
						name: 'CMV',
						data: [44, 55, 57, 56, 61, 58, 63, 60, 66, 55, 57, 56],
					},
				]}
				categories={[
					'jan/24',
					'fev/24',
					'mar/24',
					'abr/24',
					'mai/24',
					'jun/24',
					'jul/24',
					'ago/24',
					'set/24',
					'out/24',
					'nov/24',
					'dez/24',
				]}
			/>
		</div>
	);
}
