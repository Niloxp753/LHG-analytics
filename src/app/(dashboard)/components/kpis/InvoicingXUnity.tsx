/** @format */
'use client';

import dynamic from 'next/dynamic';
import React from 'react';
const PieChartsApex = dynamic(
	() => import('@/app/(dashboard)/components/charts/PieChartsApex'),
	{ ssr: false },
);

export default function InvoicingXUnity() {
	return (
		<>
			<PieChartsApex />
		</>
	);
}
