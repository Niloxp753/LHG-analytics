/** @format */

import { accumulateEmployeeData } from '@/utils/normalize-cleaning-values';
import dynamic from 'next/dynamic';
const LineChart = dynamic(
	() => import('@/app/(dashboard)/_components/charts/LineChart'),
	{ ssr: false },
);

export default function NightCleaning({
	ipiranga,
	lapa,
	andar_de_cima,
	tout,
}: any) {
	const dataIpiranga = accumulateEmployeeData(ipiranga.series.Noite);
	const dataLapa = accumulateEmployeeData(lapa.series.Noite);
	const dataAndar = accumulateEmployeeData(andar_de_cima.series.Noite);
	const dataTout = accumulateEmployeeData(tout.series.Noite);

	return (
		<LineChart
			height={48}
			title='Total de limpezas - Noite'
			series={[
				{
					name: 'Lush Ipiranga',
					data: dataIpiranga,
				},
				{
					name: 'Lush Lapa',
					data: dataLapa,
				},
				{
					name: 'Andar de Cima',
					data: dataAndar,
				},
				{
					name: 'Tout',
					data: dataTout,
				},
			]}
			categories={ipiranga.categories}
		/>
	);
}
