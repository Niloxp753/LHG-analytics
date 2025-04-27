/** @format */

import { NormalizeTrevpar } from '@/utils/normalize-trevpar-by-date';
import dynamic from 'next/dynamic';
const LineChart = dynamic(
	() => import('@/app/(dashboard)/_components/charts/LineChart'),
	{ ssr: false },
);

interface TRevParXUnityProps {
	ipiranga: RentalsEntry[];
	lapa: RentalsEntry[];
	andar_de_cima: RentalsEntry[];
	tout: RentalsEntry[];
}

interface RentalsEntry {
	[date: string]: {
		totalTrevpar: string;
	};
}

export default function TRevParXUnity({
	ipiranga,
	lapa,
	andar_de_cima,
	tout,
}: TRevParXUnityProps) {
	const TRevParXUnityIpiranga = NormalizeTrevpar({ data: ipiranga });
	const TRevParXUnityLapa = NormalizeTrevpar({ data: lapa });
	const TRevParXUnityAndar = NormalizeTrevpar({ data: andar_de_cima });
	const TRevParXUnityTout = NormalizeTrevpar({ data: tout });
	return (
		<>
			<LineChart
				money
				title='Trevpar por unidade'
				height={148}
				series={[
					{
						name: 'Lush Ipiranga',
						data: TRevParXUnityIpiranga.values,
					},
					{
						name: 'Lush Lapa',
						data: TRevParXUnityLapa.values,
					},
					{
						name: 'Andar de Cima',
						data: TRevParXUnityAndar.values,
					},
					{
						name: 'Tout',
						data: TRevParXUnityTout.values,
					},
				]}
				categories={TRevParXUnityLapa?.dates}
			/>
		</>
	);
}
