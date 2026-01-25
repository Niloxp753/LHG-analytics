/** @format */

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
	data: InvoicingXReservsProps;
	title: string;
	money?: boolean;
	percent?: boolean;
}
export default function DataByCompanyReservationsInTime({
	data,
	title,
	money = false,
	percent = false,
}: IData) {
	return (
		<LineChartsApex
			money={money}
			percent={percent}
			categories={data.categories}
			series={data.series}
			title={title}
			height={undefined}
		/>
	);
}
