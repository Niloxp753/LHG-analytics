/** @format */
'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import ResponsiveContainerChart from '@/app/(dashboard)/components/ResponsiveContainerChart';
const PieChartsApex = dynamic(
	() => import('@/app/(dashboard)/components/charts/PieChartsApex'),
	{ ssr: false },
);

export default function InvoicingXChannel() {
	return (
		<ResponsiveContainerChart>
			<PieChartsApex
				colors={['#c4b5fd', '#7c3aed', '#2e1065', '#5eead4', '#115e59']}
				dataLabelColors={[
					'#2e1065',
					'#2e1065',
					'#2e1065',
					'#042f2e',
					'#042f2e',
				]}
				data={[59.9, 1.5, 14.3, 5.4, 18.9]}
				title='Faturamento Por Canal'
				labels={[
					'Site Programadas',
					'Guia Programada',
					'Guia GO',
					'Diretas',
					'Site Imediatas',
				]}
			/>
		</ResponsiveContainerChart>
	);
}
