/** @format */
'use client';
import dynamic from 'next/dynamic';
import { type CurrencyConfig } from '@/lib/currency-format';
import React from 'react';
const AreaChartsApex = dynamic(
	() => import('@/app/(dashboard)/_components/charts/AreaChartsApex'),
	{ ssr: false },
);

interface RevenueByDateProps {
	categories: string[];
	series: number[];
}

interface InvoicingProps {
	data?: RevenueByDateProps | null;
	currencyConfig?: CurrencyConfig;
}

export default function Invoicing({ data, currencyConfig }: InvoicingProps) {
	const revenueByDate = data;
	const error =
		revenueByDate === null ? 'Não foi possível carregar os dados.' : undefined;

	return (
		<>
			<AreaChartsApex
				id='invoicing-ipiranga'
				money
				currencyConfig={currencyConfig}
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
