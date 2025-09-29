/** @format */
'use client';

import { NormalizeBigNumbersGeneral } from '@/utils/normalize-bignumbers-general';
import dynamic from 'next/dynamic';
import React from 'react';
const PieChartsApex = dynamic(
	() => import('@/app/(dashboard)/_components/charts/PieChartsApex'),
	{ ssr: false },
);

interface InvoicingXUnityProps {
	ipiranga: number;
	lapa: number;
	andar_de_cima: number;
	tout: number;
}

export default function InvoicingXUnity({
	ipiranga,
	lapa,
	andar_de_cima,
	tout,
}: InvoicingXUnityProps) {
	return (
		<>
			<PieChartsApex
				money
				colors={['#a78bfa', '#fbbf24', '#2dd4bf', '#ef4444']}
				dataLabelColors={['#5b21b6', '#d97706', '#115e59', '#991b1b']}
				series={[ipiranga, lapa, andar_de_cima, tout]}
				labels={['Ipiranga', 'Lapa', 'Andar de Cima', 'Tout']}
			/>
		</>
	);
}
