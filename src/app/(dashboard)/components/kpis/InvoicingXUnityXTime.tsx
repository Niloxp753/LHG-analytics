/** @format */

import dynamic from 'next/dynamic';
import React from 'react';
const LineChartsApexUnity = dynamic(
	() => import('@/app/(dashboard)/components/charts/LineChartsApexUnity'),
	{ ssr: false },
);

export default function InvoicingXUnityXTime() {
	return (
		<>
			<LineChartsApexUnity
				title='Faturamento por Unidade no tempo'
				legend01='Lush Ipiranga'
				legend02='Lush Guarujá'
				legend03='Tout Campinas'
				legend04='Andar de Cima'
				serie01={[35, 55, 25, 35, 65, 35]}
				serie02={[45, 35, 35, 45, 55, 45]}
				serie03={[30, 45, 40, 55, 35, 25]}
				serie04={[55, 40, 55, 65, 45, 30]}
			/>
		</>
	);
}
