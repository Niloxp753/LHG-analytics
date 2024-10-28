/** @format */
'use client';

import dynamic from 'next/dynamic';
import React from 'react';
const LineChart = dynamic(
	() => import('@/app/(dashboard)/components/charts/LineChart'),
	{ ssr: false },
);

interface Rental {
	[key: string]: {
		totalValue: string;
	};
}

interface BillingRentalType {
	[date: string]: Rental[];
}

interface OrganizedValues {
	[key: string]: number[];
}

export default function InvoicingXLocation(data: any) {
	const billingRentalType: BillingRentalType[] = data.data;

	const datas = billingRentalType.map((item) => Object.keys(item)[0]);

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

	billingRentalType.forEach((item) => {
		const rentals = item[Object.keys(item)[0]]; // Obtém os valores de locação

		// Percorre cada tipo de locação
		rentals.forEach((rental) => {
			const type = Object.keys(rental)[0];
			const value = rental[type].totalValue;

			// Converte o valor para número e adiciona ao tipo correspondente
			// eslint-disable-next-line
			organizedValues[rentalTypeMapping[type]].push(
				parseFloat(value.replace(/[^0-9,]/g, '').replace(',', '.')),
			); // Mantém como número
		});
	});

	// Converte para o formato desejado
	const result = Object.keys(organizedValues).map((type) => ({
		name: type,
		// eslint-disable-next-line
		data: organizedValues[type],
	}));

	// Exibe os valores organizados

	// const processData = (billingRentalType: any[]) => {
	// 	const seriesData = {
	// 		'3 horas': [],
	// 		'6 horas': [],
	// 		'12 horas': [],
	// 		'Day Use': [],
	// 		Diária: [],
	// 		Pernoite: [],
	// 	};

	// 	billingRentalType.forEach((entry: any) => {
	// 		const date = Object.keys(entry)[0]; // Pega a data
	// 		const rentals = entry[date];

	// 		rentals.forEach((rental: any) => {
	// 			const rentalType = Object.keys(rental)[0]; // Pega o tipo de locação
	// 			const totalValue = parseFloat(
	// 				rental[rentalType].totalValue
	// 					.replace('R$ ', '')
	// 					.replace('.', '')
	// 					.replace(',', '.'),
	// 			); // Converte o valor para número

	// 			// Adiciona o valor ao array correspondente
	// 			if (seriesData[rentalType]) {
	// 				seriesData[rentalType].push(totalValue);
	// 			}
	// 		});
	// 	});

	// 	return Object.keys(seriesData).map((key) => ({
	// 		name: key,
	// 		data: seriesData[key],
	// 	}));
	// };

	// const series = processData(billingRentalType);

	return (
		<>
			<LineChart
				title={'Faturamento por tipo de locação'}
				height={400}
				series={result}
				categories={datas}
			/>
		</>
	);
}
