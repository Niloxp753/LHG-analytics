/** @format */

import dynamic from 'next/dynamic';
import React from 'react';
const ColumnChart = dynamic(
	() => import('@/app/(dashboard)/components/charts/ColumnChart'),
	{ ssr: false },
);

export default function InvoicingXLocation() {
	return (
		<>
			<ColumnChart />
		</>
	);
}
