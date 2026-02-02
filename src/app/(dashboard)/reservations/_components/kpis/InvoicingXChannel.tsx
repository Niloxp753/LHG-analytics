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
export default function InvoicingXChannel({
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

	const newCategories = categories?.map((item) => {
		if (item === 'WEBSITE_IMMEDIATE') {
			return 'Site Imediatas';
		} else if (item === 'WEBSITE_SCHEDULED') {
			return 'Site Programadas';
		} else if (item === 'GUIA_GO') {
			return 'Guia Go';
		} else if (item === 'GUIA_SCHEDULED') {
			return 'Guia Programada';
		} else if (item === 'INTERNAL') {
			return 'Direta';
		} else if (item === 'BOOKING') {
			return 'Booking';
		} else if (item === 'EXPEDIA') {
			return 'Expedia';
		}
		return item;
	});

	return (
		<BarCharApex
			money
			error={resolvedError}
			title='Faturamento por canal de vendas'
			tooltipLabel='category'
			tooltipValueLabel='Faturamento'
			series={series ? [{ data: series, type: 'bar' }] : undefined}
			colors={['#a78bfa', '#4ade80', '#fbbf24']}
			dataLabelColors={['#5b21b6', '#22c55e', '#ca8a04']}
			categories={newCategories}
		/>
	);
}
