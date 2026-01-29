/** @format */

import dynamic from 'next/dynamic';
import React from 'react';
const AreaChartsApex = dynamic(
	() => import('@/app/(dashboard)/_components/charts/AreaChartsApex'),
	{ ssr: false },
);

interface LocationsXReservsProps {
	series?: number[] | null;
	categories?: string[];
	error?: string | boolean;
}
export default function LocationsXReservs({
	categories,
	series,
	error,
}: LocationsXReservsProps) {
	const isLoading = typeof series === 'undefined';
	const resolvedError =
		error ?? (series === null ? 'Não foi possível carregar os dados.' : undefined);

	if (!isLoading && !resolvedError && (!series?.length || !categories?.length)) {
		return null;
	}

	return (
		<div className='h-full w-full flex items-center justify-center'>
			<AreaChartsApex
				error={resolvedError}
				series={
					series
						? [
								{
									data: series,
									name: 'Nº de reservas',
								},
						  ]
						: undefined
				}
				categories={categories}
			/>
		</div>
	);
}
