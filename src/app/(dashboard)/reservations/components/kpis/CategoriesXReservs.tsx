/** @format */

import dynamic from 'next/dynamic';
import React from 'react';
const BarCharApex = dynamic(
	() => import('@/app/(dashboard)/_components/charts/BarCharApex'),
	{ ssr: false },
);

export default function Categories() {
	return (
		<>
			<BarCharApex
				title='Reservas Por Tipo de Locação'
				colors={['#a78bfa']}
				dataLabelColors={['#5b21b6']}
				categories={[
					'Day Use',
					'Diária',
					'Pernoite',
					'Pernoite Promocional',
					'12Hrs',
					'6Hrs',
					'3Hrs',
				]}
				series={[{ data: [30, 40, 45, 50, 49, 60, 91], type: 'bar' }]}
			/>
		</>
	);
}
