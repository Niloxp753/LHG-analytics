/** @format */
'use client';

import { Skeleton } from '@/components/ui/skeleton';
import dynamic from 'next/dynamic';
import React from 'react';
const LineChart = dynamic(
	() => import('@/app/(dashboard)/_components/charts/LineChart'),
	{ ssr: false },
);

interface Rental {
	name: string;
	data: number[];
}

interface BillingRentalTypeProps {
	categories: string[];
	series: Rental[];
}

export default function InvoicingXLocation(data?: any) {
	const billingRentalType: BillingRentalTypeProps = data.data;

	return (
		<>
			{billingRentalType ? (
				<LineChart
					money
					title={'Faturamento por tipo de locação'}
					height={400}
					series={billingRentalType.series}
					categories={billingRentalType.categories}
				/>
			) : (
				<Skeleton className='h-[400px] w-full' />
			)}
			;
		</>
	);
}
