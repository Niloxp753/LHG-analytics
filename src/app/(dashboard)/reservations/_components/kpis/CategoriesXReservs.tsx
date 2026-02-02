/** @format */

'use client';

import dynamic from 'next/dynamic';
import React from 'react';
const ColumnChart = dynamic(
	() => import('@/app/(dashboard)/_components/charts/ColumnChart'),
	{ ssr: false },
);

interface CategoriesProps {
	series?: number[] | null;
	categories?: string[];
	error?: string | boolean;
}
export default function Categories({
	categories,
	series,
	error,
}: CategoriesProps) {
	const isLoading = typeof series === 'undefined';
	const resolvedError =
		error ?? (series === null ? 'Não foi possível carregar os dados.' : undefined);

	if (!isLoading && !resolvedError && (!series?.length || !categories?.length)) {
		return null;
	}

	const newCategories = categories?.map((item) => {
		if (item === 'OVERNIGHT') {
			return 'Pernoite';
		} else if (item === 'DAILY') {
			return 'Diária';
		} else if (item === 'THREE_HOURS') {
			return '03 Horas';
		} else if (item === 'SIX_HOURS') {
			return '06 Horas';
		} else if (item === 'TWELVE_HOURS') {
			return '12 Horas';
		} else if (item === 'DAY_USE') {
			return 'Day Use';
		}
		return item;
	});
	return (
		<ColumnChart
			title='Reservas Por Tipo de Locação'
			error={resolvedError}
			categories={newCategories}
			tooltipLabel='category'
			series={series ? [{ data: series }] : undefined}
		/>
	);
}
