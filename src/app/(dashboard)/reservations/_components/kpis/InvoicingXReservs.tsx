/** @format */

'use client';

import dynamic from 'next/dynamic';
import { type CurrencyConfig } from '@/lib/currency-format';
import React from 'react';
const AreaChartsApex = dynamic(
	() => import('@/app/(dashboard)/_components/charts/AreaChartsApex'),
	{ ssr: false },
);

interface InvoicingXReservsProps {
	series?: number[] | null;
	categories?: string[];
	error?: string | boolean;
	currencyConfig?: CurrencyConfig;
}
export default function InvoicingXReservs({
	categories,
	series,
	error,
	currencyConfig,
}: InvoicingXReservsProps) {
	const resolvedError =
		error ?? (series === null ? 'Não foi possível carregar os dados.' : undefined);

	return (
		<>
			<AreaChartsApex
				money
				currencyConfig={currencyConfig}
				error={resolvedError}
				categories={categories}
				series={
					series
						? [
								{
									data: series,
									name: 'Faturamento de Reservas',
								},
						  ]
						: undefined
				}
			/>
		</>
	);
}
