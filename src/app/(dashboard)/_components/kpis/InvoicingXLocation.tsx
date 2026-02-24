/** @format */
'use client';

import dynamic from 'next/dynamic';
import { type CurrencyConfig } from '@/lib/currency-format';
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
	currencyConfig?: CurrencyConfig;
}

export default function InvoicingXLocation({
	data,
	currencyConfig,
}: InvoicingXLocationProps) {
	const billingRentalType = data;
	const error =
		billingRentalType === null
			? 'Não foi possível carregar os dados.'
			: undefined;

	return (
		<>
			<LineChart
				money
				currencyConfig={currencyConfig}
				error={error}
				title={'Faturamento por tipo de locação'}
				height={400}
				series={billingRentalType?.series}
				categories={billingRentalType?.categories}
			/>
		</>
	);
}
