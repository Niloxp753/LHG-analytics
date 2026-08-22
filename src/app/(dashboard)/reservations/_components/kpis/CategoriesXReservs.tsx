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

const RENTAL_TYPE_LABELS: Record<string, string> = {
	ONE_HOUR: '1 hora',
	TWO_HOURS: '2 horas',
	THREE_HOURS: '3 horas',
	FOUR_HOURS: '4 horas',
	SIX_HOURS: '6 horas',
	TWELVE_HOURS: '12 horas',
	OVERNIGHT: 'Pernoite',
	DAILY: 'Diária',
	DAY_USE: 'Day Use',
};

export default function Categories({
	categories,
	series,
	error,
}: CategoriesProps) {
	const resolvedError =
		error ?? (series === null ? 'Não foi possível carregar os dados.' : undefined);

	const newCategories = categories?.map((item) => RENTAL_TYPE_LABELS[item] ?? item);

	return (
		<ColumnChart
			title='Reservas por Tipo de Locação'
			error={resolvedError}
			categories={newCategories}
			tooltipLabel='category'
			series={series ? [{ data: series }] : undefined}
		/>
	);
}
