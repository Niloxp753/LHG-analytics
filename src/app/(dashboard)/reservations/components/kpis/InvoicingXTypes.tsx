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
				colors={['#a78bfa', '#ef4444', '#2dd4bf', '#fbbf24']}
				dataLabelColors={['#5b21b6', '#991b1b', '#115e59', '#d97706']}
				title='Formas de Pagamento'
				data={[183, 221, 5]}
				labels={['PIX', 'Cartão de Crédito', 'Boleto']}
			/>
		</div>
	);
}
