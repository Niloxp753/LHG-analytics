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

interface InvoicingXLocationProps {
	data?: BillingRentalTypeProps | null;
}

export default function InvoicingXLocation({ data }: InvoicingXLocationProps) {
	const billingRentalType = data;
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
