/** @format */

import dynamic from 'next/dynamic';
import React from 'react';
const BarCharApex = dynamic(
	() => import('@/app/(dashboard)/components/charts/BarCharApex'),
	{ ssr: false },
);

export default function Categories() {
	return (
		<>
			<BarCharApex />
		</>
	);
}
