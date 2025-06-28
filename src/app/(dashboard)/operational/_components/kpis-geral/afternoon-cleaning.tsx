/** @format */

import { accumulateEmployeeData } from '@/utils/normalize-cleaning-values';
import dynamic from 'next/dynamic';
import { EmployeeCleaningByShift } from '../../types';
const LineChart = dynamic(
	() => import('@/app/(dashboard)/_components/charts/LineChart'),
	{ ssr: false },
);

interface AfternoonCleaningProps {
	ipiranga: EmployeeCleaningByShift;
	lapa: EmployeeCleaningByShift;
	andar_de_cima: EmployeeCleaningByShift;
	tout: EmployeeCleaningByShift;
}

export default function AfternoonCleaning({
	ipiranga,
	lapa,
	andar_de_cima,
	tout,
}: any) {
	const dataIpiranga = accumulateEmployeeData(ipiranga.series.Tarde);
	const dataLapa = accumulateEmployeeData(lapa.series.Tarde);
	const dataAndar = accumulateEmployeeData(andar_de_cima.series.Tarde);
	const dataTout = accumulateEmployeeData(tout.series.Tarde);

	return (
		<LineChart
			height={48}
			title='Total de limpezas - Tarde'
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
