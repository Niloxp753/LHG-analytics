/** @format */

import dynamic from 'next/dynamic';
import { ShiftCleaning } from '../../types';
const LineChart = dynamic(
	() => import('@/app/(dashboard)/_components/charts/LineChart'),
	{ ssr: false },
);

export default function NightCleaning({ categories, series }: ShiftCleaning) {
	const ipirangaMorning = series['Lush Ipiranga'].find(
		(e) => e.name === 'Noite',
	);
	const lapaMorning = series['Lush Lapa'].find((e) => e.name === 'Noite');
	const andarMorning = series['Andar de Cima'].find((e) => e.name === 'Noite');
	const toutMorning = series['Tout'].find((e) => e.name === 'Noite');
	return (
		<LineChart
			height={48}
			title='Total de limpezas - Noite'
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
