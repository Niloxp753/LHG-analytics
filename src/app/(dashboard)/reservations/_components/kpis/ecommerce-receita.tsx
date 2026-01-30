/** @format */

'use client';

import dynamic from 'next/dynamic';
import React from 'react';
const AreaChartsApex = dynamic(
	() => import('@/app/(dashboard)/_components/charts/AreaChartsApex'),
	{ ssr: false },
);

interface EcommerceRevenueProps {
	series?: number[] | null;
	categories?: string[];
	error?: string | boolean;
}
export default function EcommerceRevenue({
	categories,
	series,
	error,
}: EcommerceRevenueProps) {
	const isLoading = typeof series === 'undefined';
	const resolvedError =
		error ?? (series === null ? 'Não foi possível carregar os dados.' : undefined);

	if (!isLoading && !resolvedError && (!series?.length || !categories?.length)) {
		return null;
	}

	return (
		<>
			<AreaChartsApex
				money
				error={resolvedError}
				series={
					series
						? [
								{
									data: series,
									name: 'Receita de e-commerce',
								},
						  ]
						: undefined
				}
				categories={categories}
			/>
		</>
	);
}
