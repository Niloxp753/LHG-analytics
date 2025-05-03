/** @format */
'use client';

import dynamic from 'next/dynamic';
import React from 'react';
const PieChartsApex = dynamic(
	() => import('@/app/(dashboard)/_components/charts/PieChartsApex'),
	{ ssr: false },
);

interface PerformanceUnityProps {
	ipiranga: DataSet;
	lapa: DataSet;
	andar_de_cima: DataSet;
	tout: DataSet;
}

type DataSet = {
	categories: string[];
	series: number[];
};

export default function PerformanceUnity({
	ipiranga,
	lapa,
	andar_de_cima,
	tout,
}: PerformanceUnityProps) {
	const totalIpiranga = ipiranga.series.reduce((acc, curr) => acc + curr, 0);
	const totalLapa = lapa.series.reduce((acc, curr) => acc + curr, 0);
	const totalTout = tout.series.reduce((acc, curr) => acc + curr, 0);
	const totalAndar = andar_de_cima.series.reduce((acc, curr) => acc + curr, 0);

	return (
		<PieChartsApex
			height={340}
			series={[totalIpiranga, totalLapa, totalAndar, totalTout]}
			categories={[
				'Lush Ipiranga',
				'Lush Lapa',
				'Andar de Cima',
				'Tout',
			]}
			title='Total de vistorias por unidade'
			colors={['#a78bfa', '#fbbf24', '#2dd4bf', '#ef4444']}
			dataLabelColors={['#5b21b6', '#d97706', '#115e59', '#991b1b']}
			labels={['Lush Ipiranga', 'Lush Lapa', 'Andar de Cima', 'Tout']}
		/>
	);
}
