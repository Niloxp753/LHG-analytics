/** @format */

'use client';

import dynamic from 'next/dynamic';
import React from 'react';
const PieChartsApex = dynamic(
	() => import('@/app/(dashboard)/_components/charts/PieChartsApex'),
	{ ssr: false },
);

interface CleaningAverageUnityProps {
	ipiranga: number;
	lapa: number;
}

export default function CleaningAverageUnity({
	ipiranga,
	lapa,
}: CleaningAverageUnityProps) {
	return (
		<PieChartsApex
			height={340}
			series={[ipiranga, lapa]}
			title='Média de limpezas e vistorias por colaborador'
			colors={['#a78bfa', '#fbbf24', '#2dd4bf', '#ef4444']}
			dataLabelColors={['#5b21b6', '#d97706', '#115e59', '#991b1b']}
			labels={['Lush Ipiranga', 'Lush Lapa']}
		/>
	);
}
