/** @format */
'use client';

import dynamic from 'next/dynamic';
import React from 'react';
const AreaChartsApex = dynamic(
	() => import('@/app/(dashboard)/_components/charts/AreaChartsApex'),
	{ ssr: false },
);

interface RevparByDateProps {
	series: number[];
	categories: string[];
}

export default function RevPar(data?: any) {
	const revparByDate: RevparByDateProps | null | undefined = data?.data;
	const error =
		revparByDate === null ? 'Não foi possível carregar os dados.' : undefined;

	return (
		<>
			<AreaChartsApex
				money
				id='revpar-ipiranga'
				error={error}
				series={
					revparByDate
						? [{ data: revparByDate.series, name: 'Revpar' }]
						: undefined
				}
				categories={revparByDate?.categories}
			/>
		</>
	);
}
