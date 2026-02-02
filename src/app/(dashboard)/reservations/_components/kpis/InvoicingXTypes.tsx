/** @format */
'use client';

import dynamic from 'next/dynamic';
import React from 'react';
const BarCharApex = dynamic(
	() => import('@/app/(dashboard)/_components/charts/BarCharApex'),
	{ ssr: false },
);

interface InvoicingXTypesProps {
	series?: number[] | null;
	categories?: string[];
	error?: string | boolean;
}
export default function InvoicingXTypes({
	categories,
	series,
	error,
}: InvoicingXTypesProps) {
	const isLoading = typeof series === 'undefined';
	const resolvedError =
		error ?? (series === null ? 'Não foi possível carregar os dados.' : undefined);

	if (!isLoading && !resolvedError && (!series?.length || !categories?.length)) {
		return null;
	}

	return (
		<BarCharApex
			money
			error={resolvedError}
			title='Faturamento por formas de pagamento'
			tooltipLabel='category'
			tooltipValueLabel='Faturamento'
			series={series ? [{ data: series }] : undefined}
			colors={['#a78bfa', '#4ade80', '#fbbf24']}
			dataLabelColors={['#5b21b6', '#22c55e', '#ca8a04']}
			categories={categories}
		/>
	);
}
