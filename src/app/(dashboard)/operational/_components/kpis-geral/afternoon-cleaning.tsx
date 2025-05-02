/** @format */

import dynamic from 'next/dynamic';
import React from 'react';
import { EmployeeCleaningByShift } from '../../types';
import { transformData } from '@/utils/normalize-cleaning-values';
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
}: AfternoonCleaningProps) {
	const dataIpiranga = transformData(ipiranga);
	const dataLapa = transformData(lapa);
	const dataAndar = transformData(andar_de_cima);
	const dataTout = transformData(tout);

	return (
		<LineChart
			height={48}
			title='Total de limpezas - Tarde'
			series={[
				{
					name: 'Lush Ipiranga',
					data: dataIpiranga.series[0].tarde,
				},
				{
					name: 'Lush Lapa',
					data: dataLapa.series[0].tarde,
				},
				{
					name: 'Andar de Cima',
					data: dataAndar.series[0].tarde,
				},
				{
					name: 'Tout',
					data: dataTout.series[0].tarde,
				},
			]}
			categories={dataIpiranga.categories}
		/>
	);
}
