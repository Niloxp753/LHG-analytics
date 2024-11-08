/** @format */
'use client';

import dynamic from 'next/dynamic';
import React from 'react';
const PieChartsApex = dynamic(
	() => import('@/app/(dashboard)/_components/charts/PieChartsApex'),
	{ ssr: false },
);

export default function SuitesOutsourcedInternal() {
	return (
		<PieChartsApex
			labels={[
				'Turno da Manhã',
				'Turno da Tarde',
				'Turno da Noite',
				'Terceirizados',
			]}
			data={[40, 78, 80, 28]}
			height={340}
			title='Performance de supervisores'
		/>
	);
}
