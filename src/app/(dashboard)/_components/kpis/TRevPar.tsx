/** @format */

'use client';

import dynamic from 'next/dynamic';
import { type CurrencyConfig } from '@/lib/currency-format';
import React from 'react';
const AreaChartsApex = dynamic(
	() => import('@/app/(dashboard)/_components/charts/AreaChartsApex'),
	{ ssr: false },
);

interface TrevparByDateProps {
	series: number[];
	categories: string[];
}

interface TRevParProps {
	data?: TrevparByDateProps | null;
	currencyConfig?: CurrencyConfig;
	fillHeight?: boolean;
}

export default function TRevPar({ data, currencyConfig, fillHeight }: TRevParProps) {
	const trevparByDate = data;
	const error =
		trevparByDate === null ? 'Não foi possível carregar os dados.' : undefined;

	return (
		<>
			<AreaChartsApex
				fillHeight={fillHeight}
				id='trevpar-ipiranga'
				error={error}
				series={
					trevparByDate
						? [
								{
									data: trevparByDate.series,
									name: 'Trevpar',
								},
						  ]
						: undefined
				}
				categories={trevparByDate?.categories}
				money
				currencyConfig={currencyConfig}
			/>
		</>
	);
}
