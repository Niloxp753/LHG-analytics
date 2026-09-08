/** @format */
'use client';

import dynamic from 'next/dynamic';
const ColumnChart = dynamic(
	() => import('@/app/(dashboard)/_components/charts/ColumnChart'),
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
		<ColumnChart
			title='Faturamento por unidade'
			money
			palette='units'
			height={400}
			error={resolvedError}
			series={series}
			categories={categories}
		/>
	);
}
