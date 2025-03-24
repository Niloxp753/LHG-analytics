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
}

export default function MorningCleaning({
	ipiranga,
	lapa,
}: MorningCleaningProps) {
	const dataIpiranga = transformData(ipiranga);
	const dataLapa = transformData(lapa);

	return (
		<LineChart
			height={48}
			title='Total de limpezas - Manhã'
			series={[
				{
					name: 'Lush Ipiranga',
					data: dataIpiranga.series[0].manhã,
				},
				{
					name: 'Lush Lapa',
					data: dataLapa.series[0].manhã,
				},
			]}
			categories={dataIpiranga.categories}
		/>
	);
}
