/** @format */

import dynamic from 'next/dynamic';
import React from 'react';
import { EmployeeCleaningByShift } from '../../types';
import { transformData } from '@/utils/normalize-cleaning-values';
const LineChart = dynamic(
	() => import('@/app/(dashboard)/_components/charts/LineChart'),
	{ ssr: false },
);

interface NightCleaningProps {
	ipiranga: EmployeeCleaningByShift;
	lapa: EmployeeCleaningByShift;
}

export default function NightCleaning({ ipiranga, lapa }: NightCleaningProps) {
	const dataIpiranga = transformData(ipiranga);
	const dataLapa = transformData(lapa);
	return (
		<LineChart
			height={48}
			title='Total de limpezas - Noite'
			series={[
				{
					name: 'Lush Ipiranga',
					data: dataIpiranga.series[0].noite,
				},
				{
					name: 'Lush Lapa',
					data: dataLapa.series[0].noite,
				},
			]}
			categories={dataIpiranga.categories}
		/>
	);
}
