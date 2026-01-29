/** @format */

import dynamic from 'next/dynamic';
import { ShiftCleaning } from '../../types';
const LineChart = dynamic(
	() => import('@/app/(dashboard)/_components/charts/LineChart'),
	{ ssr: false },
);

export default function MorningCleaning({ categories, series }: ShiftCleaning) {
	const ipirangaMorning = series['Lush Ipiranga'].find(
		(e) => e.name === 'Manhã',
	);
	const lapaMorning = series['Lush Lapa'].find((e) => e.name === 'Manhã');
	const andarMorning = series['Andar de Cima'].find((e) => e.name === 'Manhã');
	const toutMorning = series['Tout'].find((e) => e.name === 'Manhã');
	return (
		<LineChart
			height={48}
			title='Total de limpezas - Manhã'
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
