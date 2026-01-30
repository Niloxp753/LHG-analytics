/** @format */

'use client';

import dynamic from 'next/dynamic';
const AreaChartsApex = dynamic(
	() => import('@/app/(dashboard)/_components/charts/AreaChartsApex'),
	{ ssr: false },
);

interface RentalsByDateProps {
	series: number[];
	categories: string[];
}

interface LocationsProps {
	data?: RentalsByDateProps | null;
}

export default function Locations({ data }: LocationsProps) {
	const rentalsByDate = data;
	const error =
		rentalsByDate === null ? 'Não foi possível carregar os dados.' : undefined;

	return (
		<>
			<AreaChartsApex
				id='locations'
				error={error}
				series={
					rentalsByDate
						? [
								{
									data: rentalsByDate?.series,
									name: 'Quantidade de Locações',
								},
						  ]
						: undefined
				}
				categories={rentalsByDate?.categories}
			/>
		</>
	);
}
