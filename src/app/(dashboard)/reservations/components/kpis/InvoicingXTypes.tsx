/** @format */
'use client';

import dynamic from 'next/dynamic';
import React from 'react';
const PieChartsApex = dynamic(
	() => import('@/app/(dashboard)/_components/charts/PieChartsApex'),
	{ ssr: false },
);

export default function InvoicingXTypes() {
	return (
		<PieChartsApex
			title='Formas de Pagamento'
			data={[183, 221, 5]}
			labels={['PIX', 'Cartão de Crédito', 'Boleto']}
		/>
	);
}
