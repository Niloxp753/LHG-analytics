/** @format */
'use client';

import dynamic from 'next/dynamic';

const ColumnChart = dynamic(
	() => import('@/app/(dashboard)/_components/charts/ColumnChart'),
	{ ssr: false },
);

type SeriesEntry = { name: string; data: number[] };

interface EntryData {
	categories: string[];
	series: number[] | SeriesEntry[];
}

interface RevenueByCompanyProps {
	data?: EntryData | EntryData[] | null;
	title: string;
	money?: boolean;
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

export default function RevenueByCompany({
	data,
	title,
	money = false,
	error,
}: RevenueByCompanyProps) {
	const normalized = normalizeComparisonInput(data);
	const resolvedError =
		error ?? (data === null ? 'Não foi possível carregar os dados.' : undefined);

	return (
		<ColumnChart
			height={400}
			title={title}
			money={money}
			palette='units'
			error={resolvedError}
			series={normalized.series}
			categories={normalized.categories}
		/>
	);
}
