/** @format */

'use client';

import dynamic from 'next/dynamic';
import React from 'react';
const AreaChartsApex = dynamic(
	() => import('@/app/(dashboard)/_components/charts/AreaChartsApex'),
	{ ssr: false },
);

interface EcommerceRevervsProps {
	series?: number[] | null;
	categories?: string[];
	error?: string | boolean;
}
export default function EcommerceRevervs({
	categories,
	series,
	error,
}: EcommerceRevervsProps) {
	const resolvedError =
		error ?? (series === null ? 'Não foi possível carregar os dados.' : undefined);

	return (
		<>
			<AreaChartsApex
				error={resolvedError}
				series={
					series
						? [
								{
									data: series,
									name: 'Reservas de e-commerce',
								},
						  ]
						: undefined
				}
				categories={categories}
			/>
		</>
	);
}
