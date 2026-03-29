/** @format */
'use client';

import dynamic from 'next/dynamic';
import {
	CONSOLIDATED_UNIT_COLORS,
	CONSOLIDATED_UNIT_DATA_LABEL_COLORS,
} from '../charts/consolidated-unit-palette';
const PieChartsApex = dynamic(
	() => import('@/app/(dashboard)/_components/charts/PieChartsApex'),
	{ ssr: false },
);

interface InvoicingXUnityProps {
	categories?: string[];
	series?: number[] | null;
	error?: string | boolean;
}

export default function InvoicingXUnity({
	categories,
	series,
	error,
}: InvoicingXUnityProps) {
	const resolvedError =
		error ?? (series === null ? 'Não foi possível carregar os dados.' : undefined);

	return (
		<>
			<PieChartsApex
				money
				error={resolvedError}
				colors={CONSOLIDATED_UNIT_COLORS}
				dataLabelColors={CONSOLIDATED_UNIT_DATA_LABEL_COLORS}
				series={series ?? undefined}
				labels={categories}
			/>
		</>
	);
}
