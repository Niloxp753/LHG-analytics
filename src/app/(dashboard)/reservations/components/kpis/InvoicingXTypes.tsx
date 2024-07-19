/** @format */
'use client';

import dynamic from 'next/dynamic';
import React from 'react';
const PieChartsApex = dynamic(
	() => import('@/app/(dashboard)/components/charts/PieChartsApex'),
	{ ssr: false },
);

export default function InvoicingXTypes() {
	return (
		<div className='w-1/2'>
			<PieChartsApex
				title='Formas de Pagamento'
				data={[183, 221, 5]}
				labels={['PIX', 'Cartão de Crédito', 'Boleto']}
			/>
		</div>
	);
}
