/** @format */

import dynamic from 'next/dynamic';
import React from 'react';
import { EmployeeCleaningByShift } from '../../types';
import { transformData } from '@/utils/normalize-cleaning-values';
const LineChart = dynamic(
	() => import('@/app/(dashboard)/_components/charts/LineChart'),
	{ ssr: false },
);

interface MorningCleaningProps {
	ipiranga: EmployeeCleaningByShift;
	lapa: EmployeeCleaningByShift;
	andar_de_cima: EmployeeCleaningByShift;
	tout: EmployeeCleaningByShift;
}

export default function MorningCleaning({
	ipiranga,
	lapa,
	andar_de_cima,
	tout,
}: any) {
	// const dataIpiranga = transformData(ipiranga);
	// const dataLapa = transformData(lapa);
	// const dataAndar = transformData(andar_de_cima);
	// const dataTout = transformData(tout);

	console.log(ipiranga.series['Manhã']);

	return (
		<LineChart
			height={48}
			title='Total de limpezas - Manhã'
			series={[
				{
					name: 'Lush Ipiranga',
					data: ipiranga.series['Manhã'],
				},
				{
					name: 'Lush Lapa',
					data: lapa,
				},
				{
					name: 'Andar de Cima',
					data: andar_de_cima,
				},
				{
					name: 'Tout',
					data: tout,
				},
			]}
			categories={ipiranga.categories}
		/>
	);
}
