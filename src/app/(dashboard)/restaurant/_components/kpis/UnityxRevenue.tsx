/** @format */
'use client';

import dynamic from 'next/dynamic';
import React from 'react';

const ColumnChart = dynamic(
	() => import('@/app/(dashboard)/_components/charts/ColumnChart'),
	{ ssr: false },
);

type SeriesEntry = { name: string; data: number[] };

interface EntryData {
	categories: string[];
	series: number[] | SeriesEntry[];
}

interface UnityxRevenueProps {
	data?: EntryData | EntryData[] | null;
	error?: string | boolean;
}

function normalizeComparisonInput(data?: EntryData | EntryData[] | null) {
	const entry = Array.isArray(data) ? data[0] : data;
	const categories = entry?.categories;
	const rawSeries = entry?.series;

	if (!Array.isArray(rawSeries)) {
		return {
			categories,
			series: undefined as number[] | undefined,
		};
	}

	if (rawSeries.length === 0) {
		return {
			categories,
			series: [] as number[],
		};
	}

	if (typeof rawSeries[0] === 'number') {
		return {
			categories,
			series: rawSeries as number[],
		};
	}

	const firstSeries = rawSeries[0] as SeriesEntry;

	return {
		categories,
		series: Array.isArray(firstSeries?.data) ? firstSeries.data : [],
	};
}

export default function UnityxRevenue({ data, error }: UnityxRevenueProps) {
	const normalized = normalizeComparisonInput(data);
	const resolvedError =
		error ?? (data === null ? 'Não foi possível carregar os dados.' : undefined);

	return (
		<ColumnChart
			money
			palette='units'
			height={400}
			title='Receita de A&B por unidade'
			error={resolvedError}
			series={normalized.series}
			categories={normalized.categories}
		/>
	);
}
