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
}

interface RentalsEntry {
	[date: string]: {
		totalTrevpar: string;
	};
}

export default function TRevParXUnity({ ipiranga, lapa }: TRevParXUnityProps) {
	const TRevParXUnityIpiranga = NormalizeTrevpar({ data: ipiranga });
	const TRevParXUnityLapa = NormalizeTrevpar({ data: lapa });
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
				]}
				categories={TRevParXUnityIpiranga?.dates}
			/>
		</>
	);
}
