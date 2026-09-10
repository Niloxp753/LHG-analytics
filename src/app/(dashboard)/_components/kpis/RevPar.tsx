/** @format */
'use client';

import dynamic from 'next/dynamic';
import { type CurrencyConfig } from '@/lib/currency-format';
import React from 'react';
const AreaChartsApex = dynamic(
	() => import('@/app/(dashboard)/_components/charts/AreaChartsApex'),
	{ ssr: false },
);

interface RevparByDateProps {
	series: number[];
	categories: string[];
}

interface RevParProps {
	data?: RevparByDateProps | null;
	currencyConfig?: CurrencyConfig;
	fillHeight?: boolean;
}

export default function RevPar({ data, currencyConfig, fillHeight }: RevParProps) {
	const revparByDate = data;
	const error =
		revparByDate === null ? 'Não foi possível carregar os dados.' : undefined;

	return (
		<>
			<AreaChartsApex
				fillHeight={fillHeight}
				money
				currencyConfig={currencyConfig}
				id='revpar-ipiranga'
				error={error}
				series={
					revparByDate
						? [{ data: revparByDate.series, name: 'Revpar' }]
						: undefined
				}
				categories={revparByDate?.categories}
			/>
		</>
	);
}
