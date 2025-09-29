/** @format */

import { Skeleton } from '@/components/ui/skeleton';
import dynamic from 'next/dynamic';
const AreaChartsApex = dynamic(
	() => import('@/app/(dashboard)/_components/charts/AreaChartsApex'),
	{ ssr: false },
);

interface RentalsByDateProps {
	series: number[];
	categories: string[];
}

export default function Locations(data?: any) {
	const rentalsByDate: RentalsByDateProps = data.data;


	return (
		<>
			{rentalsByDate ? (
				<AreaChartsApex
					id='locations'
					series={[
						{
							data: rentalsByDate?.series,
							name: 'Quantidade de Locações',
						},
					]}
					categories={rentalsByDate?.categories}
				/>
			) : (
				<Skeleton className='w-full h-[300px]' />
			)}
			;
		</>
	);
}
