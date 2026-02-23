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
	const resolvedError =
		error ??
		(series === null ? 'Não foi possível carregar os dados.' : undefined);

	const mappedSeries = series?.map((item) => {
		const value = item;
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
									name: 'Rep. De Reservas',
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
