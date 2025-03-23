/** @format */

'use client';

import dynamic from 'next/dynamic';
import React from 'react';
const PieChartsApex = dynamic(
	() => import('@/app/(dashboard)/_components/charts/PieChartsApex'),
	{ ssr: false },
);

interface TotalCleaningUnityProps {
	ipiranga: DataSet;
	lapa: DataSet;
}

type DataSet = {
	categories: string[];
	series: number[];
};

export default function TotalCleaningUnity({
	ipiranga,
	lapa,
}: TotalCleaningUnityProps) {
	const totalIpiranga = ipiranga.series.reduce((acc, curr) => acc + curr, 0);
	const totalLapa = lapa.series.reduce((acc, curr) => acc + curr, 0);
	return (
		<PieChartsApex
			height={340}
			series={[totalIpiranga, totalLapa]}
			title='Total de limpezas e vistorias'
			colors={['#a78bfa', '#fbbf24', '#2dd4bf', '#ef4444']}
			dataLabelColors={['#5b21b6', '#d97706', '#115e59', '#991b1b']}
			labels={['Lush Ipiranga', 'Lush Lapa']}
		/>
	);
}
