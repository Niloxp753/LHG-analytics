/** @format */

import dynamic from 'next/dynamic';
import React from 'react';
const ColumnChart = dynamic(
	() => import('@/app/(dashboard)/_components/charts/ColumnChart'),
	{ ssr: false },
);

export default function LocationsXLocationsName() {
	return (
		<>
			<ColumnChart title={'Nº de Locações por tipo'} />
		</>
	);
}
