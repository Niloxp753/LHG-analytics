/** @format */

import dynamic from 'next/dynamic';
const LineChart = dynamic(
	() => import('@/app/(dashboard)/_components/charts/LineChart'),
	{ ssr: false },
);

interface TRevParXUnityProps {
	ipiranga: RentalsEntry;
	lapa: RentalsEntry;
	andar_de_cima: RentalsEntry;
	tout: RentalsEntry;
}

interface RentalsEntry {
	categories: string[];
	series: number[];
}

export default function TRevParXUnity({
	ipiranga,
	lapa,
	andar_de_cima,
	tout,
}: TRevParXUnityProps) {
	return (
		<>
			<LineChart
				money
				title='Trevpar por unidade'
				height={148}
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
				categories={ipiranga?.categories}
			/>
		</>
	);
}
