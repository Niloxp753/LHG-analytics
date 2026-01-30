/** @format */

'use client';

import dynamic from 'next/dynamic';
import React from 'react';
const LineChartsApex = dynamic(
	() => import('@/app/(dashboard)/_components/charts/LineChart'),
	{ ssr: false },
);

interface InvoicingXReservsProps {
	categories: string[];
	series: Array<{ name: string; data: number[] }>;
}

interface IData {
	data?: InvoicingXReservsProps | null;
	title: string;
	money?: boolean;
	percent?: boolean;
	error?: string | boolean;
}
export default function DataByCompanyReservationsInTime({
	data,
	title,
	money = false,
	percent = false,
	error,
}: IData) {
	const isLoading = typeof data === 'undefined';
	const resolvedError =
		error ?? (data === null ? 'Não foi possível carregar os dados.' : undefined);

	if (!isLoading && !resolvedError && (!data?.series?.length || !data?.categories?.length)) {
		return null;
	}

	return (
		<LineChartsApex
			money={money}
			percent={percent}
			error={resolvedError}
			categories={data?.categories}
			series={data?.series}
			title={title}
			height={undefined}
		/>
	);
}
