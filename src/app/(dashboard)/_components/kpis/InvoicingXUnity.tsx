/** @format */
'use client';

import dynamic from 'next/dynamic';
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
				palette='units'
				error={resolvedError}
				series={series ?? undefined}
				labels={categories}
			/>
		</>
	);
}
