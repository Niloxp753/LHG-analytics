/** @format */

'use client';

import dynamic from 'next/dynamic';
import React from 'react';
const AreaChartsApex = dynamic(
	() => import('@/app/(dashboard)/_components/charts/AreaChartsApex'),
	{ ssr: false },
);

interface CleaningByDateProps {
	series: number[];
	categories: string[];
}

interface TotalCleaningProps {
	data?: CleaningByDateProps | null;
}

export default function TotalCleaning({ data }: TotalCleaningProps) {
	const cleaningByDate = data;
	const error =
		cleaningByDate === null ? 'Não foi possível carregar os dados.' : undefined;

	return (
		<AreaChartsApex
			id='total-cleaning-ipiranga'
			error={error}
			series={
				cleaningByDate
					? [
							{
								data: cleaningByDate?.series,
								name: 'Total de Limpezas',
							},
					  ]
					: undefined
			}
			categories={cleaningByDate?.categories}
		/>
	);
}
