/** @format */

import dynamic from 'next/dynamic';
const LineChart = dynamic(
	() => import('@/app/(dashboard)/_components/charts/LineChart'),
	{ ssr: false },
);

interface TKTxUnityProps {
	ipiranga: RentalsEntry;
	lapa: RentalsEntry;
	andar_de_cima: RentalsEntry;
	tout: RentalsEntry;
}

interface RentalsEntry {
	categories: string[];
	series: number[];
}

export default function TKTxUnity({
	ipiranga,
	lapa,
	andar_de_cima,
	tout,
}: TKTxUnityProps) {
	return (
		<>
			<LineChart
				money
				height={148}
				title='Ticket Médio por Unidade'
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
