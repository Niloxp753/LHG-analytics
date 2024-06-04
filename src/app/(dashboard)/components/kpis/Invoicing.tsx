/** @format */

import dynamic from 'next/dynamic';
import React from 'react';
const AreaChartsApex = dynamic(
	() => import('@/app/(dashboard)/components/AreaChartsApex'),
	{ ssr: false },
);

export default function Invoicing() {
	return (
		<>
			<AreaChartsApex />
		</>
	);
}
