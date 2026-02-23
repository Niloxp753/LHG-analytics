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
import DataState from '@/app/(dashboard)/_components/DataState';
import EmptyState from '@/app/(dashboard)/_components/EmptyState';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const AreaChartsApex = dynamic(
	() => import('@/app/(dashboard)/_components/charts/AreaChartsApex'),
	{ ssr: false },
);

interface OccupancyDataProps {
	series: SeriesDataProps[];
	categories: string[];
}

interface SeriesDataProps {
	name: string;
	data: number[];
}

interface OccupationCasaLushProps {
	data?: OccupancyDataProps | null;
}

export default function OccupationCasaLush({ data }: OccupationCasaLushProps) {
	const occupancyData = data;
	const isLoading = typeof occupancyData === 'undefined';
	const error =
		occupancyData === null ? 'Não foi possível carregar os dados.' : undefined;
	const [selectedName, setSelectedName] = useState<string>('');

	if (isLoading || error) {
		return (
			<DataState
				isLoading={isLoading}
				error={error}
				skeleton={
					<>
						<Skeleton className='w-56 h-10' />
						<Skeleton className='w-full h-[300px]' />
					</>
				}
			/>
		);
	}

	const hasSeries =
		Array.isArray(occupancyData?.series) && occupancyData.series.length > 0;
	const hasCategories =
		Array.isArray(occupancyData?.categories) &&
		occupancyData.categories.length > 0;

	if (!hasSeries || !hasCategories) {
		return <EmptyState title='Ocupação por categoria' minHeight={300} />;
	}

	const fallbackName = occupancyData.series[0].name;
	const currentName = selectedName || fallbackName;
	const selectedSeries =
		occupancyData.series.find((item) => item.name === currentName) ??
		occupancyData.series[0];

	return (
		<>
			<Select
				defaultValue={currentName}
				onValueChange={(value: string) => setSelectedName(value)}>
				<SelectTrigger className='w-56 text-zinc-50 dark'>
					<SelectValue placeholder='Selecione uma unidade' />
				</SelectTrigger>
				<SelectContent className='dark'>
					<SelectGroup>
						{occupancyData.series.map((item, index) => {
							return (
								<SelectItem
									defaultValue={currentName}
									value={item.name}
									key={index}>
									{item.name}
								</SelectItem>
							);
						})}
					</SelectGroup>
				</SelectContent>
			</Select>
			<AreaChartsApex
				percent
				id='occupation-category'
				series={[{ name: selectedSeries.name, data: selectedSeries.data }]}
				categories={occupancyData.categories}
			/>
		</>
	);
}
