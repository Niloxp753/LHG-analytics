/** @format */
'use client';

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
	const billingRentalType: BillingRentalTypeProps | null | undefined = data?.data;
	const error =
		billingRentalType === null
			? 'Não foi possível carregar os dados.'
			: undefined;

	return (
		<>
			<LineChart
				money
				error={error}
				title={'Faturamento por tipo de locação'}
				height={400}
				series={billingRentalType?.series}
				categories={billingRentalType?.categories}
			/>
		</>
	);
}
