/** @format */
'use client';

import dynamic from 'next/dynamic';
const PieChartsApex = dynamic(
	() => import('@/app/(dashboard)/_components/charts/PieChartsApex'),
	{ ssr: false },
);

interface EntryData {
	categories: string[];
	series: Array<{ name: string; data: number[] }>;
}

interface BookingsByCompanyProps {
	data?: EntryData | null;
	title: string;
	money?: boolean;
	error?: string | boolean;
}

export default function BookingsByCompany({
	data,
	title,
	money = false,
	error,
}: BookingsByCompanyProps) {
	const resolvedError =
		error ?? (data === null ? 'Não foi possível carregar os dados.' : undefined);

	return (
		<PieChartsApex
			title={title}
			money={money}
			error={resolvedError}
			colors={['#a78bfa', '#fbbf24', '#2dd4bf', '#ef4444']}
			dataLabelColors={['#5b21b6', '#d97706', '#115e59', '#991b1b']}
			series={data?.series}
			labels={data?.categories}
		/>
	);
}
