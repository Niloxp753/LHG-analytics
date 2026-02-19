/** @format */

'use client';

import dynamic from 'next/dynamic';
import React from 'react';
const AreaChartsApex = dynamic(
	() => import('@/app/(dashboard)/_components/charts/AreaChartsApex'),
	{ ssr: false },
);

interface InvoicingXReservsProps {
	series?: number[] | null;
	categories?: string[];
	error?: string | boolean;
}
export default function InvoicingXReservs({
	categories,
	series,
	error,
}: InvoicingXReservsProps) {
	const resolvedError =
		error ?? (series === null ? 'Não foi possível carregar os dados.' : undefined);

	return (
		<>
			<AreaChartsApex
				money
				error={resolvedError}
				categories={categories}
				series={
					series
						? [
								{
									data: series,
									name: 'Faturamento de Reservas',
								},
						  ]
						: undefined
				}
			/>
		</>
	);
}
