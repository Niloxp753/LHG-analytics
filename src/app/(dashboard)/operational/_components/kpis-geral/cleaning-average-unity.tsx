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
	tout: number;
	andar_de_cima: number;
}

export default function CleaningAverageUnity({
	ipiranga,
	lapa,
	andar_de_cima,
	tout,
}: CleaningAverageUnityProps) {
	return (
		<PieChartsApex
			height={340}
			series={[ipiranga, lapa, andar_de_cima, tout]}
			title='Média de limpezas por unidade'
			colors={['#a78bfa', '#fbbf24', '#2dd4bf', '#ef4444']}
			dataLabelColors={['#5b21b6', '#d97706', '#115e59', '#991b1b']}
			labels={['Lush Ipiranga', 'Lush Lapa', 'Andar de Cima', 'Tout']}
		/>
	);
}
