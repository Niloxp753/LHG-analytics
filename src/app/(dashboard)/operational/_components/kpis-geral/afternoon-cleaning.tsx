/** @format */

import dynamic from 'next/dynamic';
import { EmployeeCleaningByShift, ShiftCleaning } from '../../types';
const LineChart = dynamic(
	() => import('@/app/(dashboard)/_components/charts/LineChart'),
	{ ssr: false },
);

export default function AfternoonCleaning({
	categories,
	series,
}: ShiftCleaning) {
	const ipirangaMorning = series['Lush Ipiranga'].find(
		(e) => e.name === 'Tarde',
	);
	const lapaMorning = series['Lush Lapa'].find((e) => e.name === 'Tarde');
	const andarMorning = series['Andar de Cima'].find((e) => e.name === 'Tarde');
	const toutMorning = series['Tout'].find((e) => e.name === 'Tarde');
	return (
		<LineChart
			height={48}
			title='Total de limpezas - Tarde'
			series={[
				{ name: 'Lush Ipiranga', data: ipirangaMorning?.data! },
				{ name: 'Lush Lapa', data: lapaMorning?.data! },
				{ name: 'Andar de Cima', data: andarMorning?.data! },
				{ name: 'Tout', data: toutMorning?.data! },
			]}
			categories={categories}
		/>
	);
}
