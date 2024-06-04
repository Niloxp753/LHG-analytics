/** @format */

import dynamic from 'next/dynamic';
import React from 'react';
const AreaChartsApex = dynamic(
	() => import('@/app/(dashboard)/components/charts/AreaChartsApex'),
	{ ssr: false },
);

export default function Invoicing() {
	return (
		<>
			<AreaChartsApex />
		</>
	);
}
