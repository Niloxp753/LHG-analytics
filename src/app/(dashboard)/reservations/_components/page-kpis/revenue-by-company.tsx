/** @format */
'use client';

import { NormalizeBigNumbersGeneral } from '@/utils/normalize-bignumbers-general';
import dynamic from 'next/dynamic';
import React from 'react';
const PieChartsApex = dynamic(
	() => import('@/app/(dashboard)/_components/charts/PieChartsApex'),
	{ ssr: false },
);

interface RevenueByCompanyProps {
	ipiranga: number;
	lapa: number;
	andar_de_cima: number;
	tout: number;
	title: string;
	money?: boolean;
}

export default function RevenueByCompany({
	ipiranga,
	lapa,
	andar_de_cima,
	tout,
	title,
	money = false,
}: RevenueByCompanyProps) {
	return (
		<PieChartsApex
			title={title}
			money={money}
			colors={['#a78bfa', '#fbbf24', '#2dd4bf', '#ef4444']}
			dataLabelColors={['#5b21b6', '#d97706', '#115e59', '#991b1b']}
			series={[ipiranga, lapa, andar_de_cima, tout]}
			labels={['Ipiranga', 'Lapa', 'Andar de Cima', 'Tout']}
		/>
	);
}
