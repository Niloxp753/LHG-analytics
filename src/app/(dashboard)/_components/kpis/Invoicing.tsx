/** @format */
'use client';
import dynamic from 'next/dynamic';
import React from 'react';
const AreaChartsApex = dynamic(
	() => import('@/app/(dashboard)/_components/charts/AreaChartsApex'),
	{ ssr: false },
);

interface RevenueByDateProps {
	categories: string[];
	series: number[];
}

export default function Invoicing(data?: any) {
	const revenueByDate: RevenueByDateProps | null | undefined = data?.data;
	const error =
		revenueByDate === null ? 'Não foi possível carregar os dados.' : undefined;

	return (
		<>
			<AreaChartsApex
				id='invoicing-ipiranga'
				money
				error={error}
				series={
					revenueByDate
						? [{ data: revenueByDate.series, name: 'Faturamento Total' }]
						: undefined
				}
				categories={revenueByDate?.categories}
			/>
		</>
	);
}
