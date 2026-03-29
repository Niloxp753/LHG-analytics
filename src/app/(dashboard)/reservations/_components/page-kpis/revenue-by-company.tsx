/** @format */
'use client';

import dynamic from 'next/dynamic';
import {
	CONSOLIDATED_UNIT_COLORS,
	CONSOLIDATED_UNIT_DATA_LABEL_COLORS,
} from '@/app/(dashboard)/_components/charts/consolidated-unit-palette';

const PieChartsApex = dynamic(
	() => import('@/app/(dashboard)/_components/charts/PieChartsApex'),
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

function normalizePieInput(data?: EntryData | EntryData[] | null) {
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
	const normalized = normalizePieInput(data);
	const resolvedError =
		error ?? (data === null ? 'Não foi possível carregar os dados.' : undefined);

	return (
		<PieChartsApex
			title={title}
			money={money}
			error={resolvedError}
			colors={CONSOLIDATED_UNIT_COLORS}
			dataLabelColors={CONSOLIDATED_UNIT_DATA_LABEL_COLORS}
			series={normalized.series}
			labels={normalized.categories}
		/>
	);
}
