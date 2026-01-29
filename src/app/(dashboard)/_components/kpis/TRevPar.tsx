/** @format */

'use client';

import dynamic from 'next/dynamic';
import React from 'react';
const AreaChartsApex = dynamic(
	() => import('@/app/(dashboard)/_components/charts/AreaChartsApex'),
	{ ssr: false },
);

interface TrevparEntry {
	[date: string]: {
		totalTrevpar: string;
	};
}

interface TransformedEntry {
	date: string;
	totalTrevpar: number;
}

interface TrevparByDateProps {
	series: number[];
	categories: string[];
}

export default function TRevPar(data?: any) {
	const trevparByDate: TrevparByDateProps | null | undefined = data?.data;
	const error =
		trevparByDate === null ? 'Não foi possível carregar os dados.' : undefined;

	return (
		<>
			<AreaChartsApex
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
			/>
		</>
	);
}
