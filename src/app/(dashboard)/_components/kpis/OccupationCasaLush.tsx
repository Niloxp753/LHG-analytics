/** @format */
'use client';

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const AreaChartsApex = dynamic(
	() => import('@/app/(dashboard)/_components/charts/AreaChartsApex'),
	{ ssr: false },
);

interface OccupancyData {
	category: string; // Nome da categoria, por exemplo, 'LUSH'
	values: number[]; // Array de valores de taxa de ocupação
	categories: string[]; // Array de datas correspondentes
}

export default function OccupationCasaLush(data?: any) {
	const transformOccupancyData = (inputData: any): OccupancyData[] => {
		const result: OccupancyData[] = [];

		inputData?.forEach((dateEntry: any) => {
			Object.entries(dateEntry).forEach(([date, categories]: [string, any]) => {
				Object.entries(categories).forEach(
					([category, info]: [string, any]) => {
						const existingCategory = result.find(
							(item) => item.category === category.toUpperCase(),
						);

						// Converte a taxa de ocupação para número
						const occupancyValue = parseFloat(
							info.occupancyRate.replace('%', ''),
						);

						if (existingCategory) {
							// Se a categoria já existe, adicione o valor e a data
							existingCategory.values.push(occupancyValue);
							existingCategory.categories.push(date);
						} else {
							// Se a categoria não existe, crie uma nova entrada
							result.push({
								category: category.toUpperCase(),
								values: [occupancyValue],
								categories: [date],
							});
						}
					},
				);
			});
		});
		result.forEach((item) => {
			const combined = item.categories.map((cat, index) => ({
				category: cat,
				value: item.values[index],
			}));

			combined.sort(
				(a, b) =>
					new Date(a.category.split('/').reverse().join('-')).getTime() -
					new Date(b.category.split('/').reverse().join('-')).getTime(),
			);

			// Atualiza os arrays ordenados
			item.categories = combined.map((item) => item.category);
			item.values = combined.map((item) => item.value);
		});
		// Visualize o resultado para verificar se todos os dados foram transformados corretamente

		return result;
	};

	const occupancyRateBySuiteCategory: OccupancyData[] = data.data;
	const transformedData = transformOccupancyData(occupancyRateBySuiteCategory);
	const [state, setState] = useState('LUSH');
	const currentSerie = transformedData.find((serie) => {
		return serie.category === state;
	});

	if (
		!currentSerie?.values.length ||
		currentSerie?.values.length == 0 ||
		!currentSerie
	) {
		return (
			<>
				<Skeleton className='w-56 h-10' />
				<Skeleton className='w-full h-[300px]' />
			</>
		);
	}
	return (
		<>
			{occupancyRateBySuiteCategory ? (
				<>
					<Select
						defaultValue={state}
						onValueChange={(value: string) => setState(value)}>
						<SelectTrigger className='w-56 text-zinc-50 dark'>
							<SelectValue placeholder='Selecione uma unidade' />
						</SelectTrigger>
						<SelectContent className='dark'>
							<SelectGroup>
								<SelectItem value='LUSH'>LUSH</SelectItem>
								<SelectItem value='LUSH POP'>LUSH POP</SelectItem>
								<SelectItem value='LUSH SPA'>LUSH SPA</SelectItem>
								<SelectItem value='LUSH SPA SPLASH'>LUSH SPA SPLASH</SelectItem>
								<SelectItem value='LUSH LOUNGE'>LUSH LOUNGE</SelectItem>
								<SelectItem value='LUSH HIDRO'>LUSH HIDRO</SelectItem>
								<SelectItem value='LUSH SPLASH'>LUSH SPLASH</SelectItem>
								<SelectItem value='LUSH CINE'>LUSH CINE</SelectItem>
								<SelectItem value='CASA LUSH'>CASA LUSH</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
					<AreaChartsApex
						title='Taxa de ocupação por categoria de suíte'
						percent
						id='occupation-category'
						series={[
							{
								data: currentSerie?.values!,
								name: currentSerie?.category,
							},
						]}
						categories={currentSerie?.categories}
					/>
				</>
			) : (
				<>
					<Skeleton className='w-56 h-10' />
					<Skeleton className='w-full h-[300px]' />
				</>
			)}
			;
		</>
	);
}
