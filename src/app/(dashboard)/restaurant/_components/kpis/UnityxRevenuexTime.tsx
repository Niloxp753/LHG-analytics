/** @format */

import dynamic from 'next/dynamic';
import React from 'react';
const LineChart = dynamic(
	() => import('@/app/(dashboard)/_components/charts/LineChart'),
	{ ssr: false },
);

interface DataProps {
	series: number[];
	categories: string[];
}
interface UnityxRevenuexTimePrps {
	ipiranga: DataProps;
	lapa: DataProps;
	andar_de_cima: DataProps;
	tout: DataProps;
}

export default function UnityxRevenuexTime({
	ipiranga,
	lapa,
	andar_de_cima,
	tout,
}: UnityxRevenuexTimePrps) {
	return (
		<div className='w-full'>
			<LineChart
				title={'Receita de A&B por unidade'}
				series={[
					{
						name: 'Lush Ipiranga',
						data: ipiranga.series,
					},
					{
						name: 'Lush Lapa',
						data: lapa.series,
					},
					{
						name: 'Andar de Cima',
						data: andar_de_cima.series,
					},
					{
						name: 'Tout',
						data: tout.series,
					},
				]}
				categories={ipiranga.categories}
				height={400}
			/>
		</div>
	);
}
