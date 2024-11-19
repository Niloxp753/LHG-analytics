/** @format */
'use client';

import { Skeleton } from '@/_components/ui/skeleton';
import dynamic from 'next/dynamic';
import React from 'react';
const LineChart = dynamic(
	() => import('@/app/(dashboard)/_components/charts/LineChart'),
	{ ssr: false },
);

interface Rental {
	totalValue: string;
}

interface BillingRental {
	[date: string]: Rental[];
}

interface OrganizedValues {
	[key: string]: number[];
}

interface DataWithValues {
	date: string;
	type: string;
	value: number;
}

export default function InvoicingXLocation(data?: any) {
	const billingRentalType: BillingRental[] = data.data;

	const rentalTypeMapping: { [key: string]: string } = {
		OVERNIGHT: 'Pernoite',
		DAILY: 'Diária',
		DAY_USE: 'Day Use',
		TWELVE_HOURS: 'Doze Horas',
		SIX_HOURS: 'Seis Horas',
		THREE_HOURS: 'Três Horas',
	};

	const organizedValues: OrganizedValues = {
		Pernoite: [],
		Diária: [],
		'Day Use': [],
		'Doze Horas': [],
		'Seis Horas': [],
		'Três Horas': [],
	};

	const dataWithValues: DataWithValues[] = [];

	// Preenchendo a estrutura com os dados e suas respectivas datas
	billingRentalType &&
		billingRentalType?.forEach((item) => {
			const date = Object.keys(item)[0];
			const rentals = item[date];

			// Percorre cada tipo de locação
			rentals?.forEach((rental: any) => {
				const type = Object.keys(rental)[0];
				const value = rental[type].totalValue;

				// Converte o valor para número
				const numericValue = parseFloat(
					value.replace(/[^0-9,]/g, '').replace(',', '.'),
				);

				// Adiciona ao array de dados, agrupando por data e tipo
				dataWithValues.push({
					date: date,
					type: rentalTypeMapping[type],
					value: numericValue,
				});
			});
		});

	// Agora, vamos organizar por data
	dataWithValues?.sort((a, b) => {
		const dateA: any = new Date(a.date.split('/').reverse().join('-')); // Converter dd/mm/yyyy para yyyy-mm-dd
		const dateB: any = new Date(b.date.split('/').reverse().join('-'));
		return dateA - dateB;
	});

	// Reorganizando os valores em organizedValues conforme a nova ordem
	dataWithValues?.forEach((entry) => {
		organizedValues[entry.type].push(entry.value);
	});

	// Converte para o formato desejado, incluindo a data
	const result = Object.keys(organizedValues).map((type) => ({
		name: type,
		data: organizedValues[type],
		dates: dataWithValues
			.filter((entry) => entry.type === type)
			.map((entry) => entry.date), // Adiciona as datas correspondentes
	}));

	return billingRentalType ? (
		<LineChart
			title={'Faturamento por tipo de locação'}
			height={400}
			series={result}
			categories={result[0].dates}
		/>
	) : (
		<Skeleton className='h-[400px] w-full' />
	);
}
