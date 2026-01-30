/** @format */

'use client';

import dynamic from 'next/dynamic';
import React from 'react';
const AreaChartsApex = dynamic(
	() => import('@/app/(dashboard)/_components/charts/AreaChartsApex'),
	{ ssr: false },
);

interface RepresentationProps {
	series?: number[] | null;
	categories?: string[];
	error?: string | boolean;
}
export default function Representation({
	categories,
	series,
	error,
}: RepresentationProps) {
	const isLoading = typeof series === 'undefined';
	const resolvedError =
		error ?? (series === null ? 'Não foi possível carregar os dados.' : undefined);

	if (!isLoading && !resolvedError && (!series?.length || !categories?.length)) {
		return null;
	}

	const mappedSeries = series?.map((item) => {
		const value = item * 100;
		return parseFloat(value.toFixed(2));
	});

	return (
		<>
			<AreaChartsApex
				percent
				error={resolvedError}
				series={
					mappedSeries
						? [
								{
									name: 'Representatividade De Reservas',
									data: mappedSeries,
								},
						  ]
						: undefined
				}
				categories={categories}
			/>
		</>
	);
}
