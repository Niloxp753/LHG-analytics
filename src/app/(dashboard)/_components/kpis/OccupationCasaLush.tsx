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

interface OccupancyDataProps {
	series: SeriesDataProps[];
	categories: string[];
}

interface SeriesDataProps {
	name: string;
	data: number[];
}

export default function OccupationCasaLush(data?: any) {
	const occupancyData: OccupancyDataProps = data.data;



	const [state, setState] = useState<SeriesDataProps>({
		name: occupancyData.series[0].name,
		data: occupancyData.series[0].data,
	});

	function handleChange(value: string) {
		const newData = occupancyData.series.find((item) => item.name === value);
		if (newData) {
			setState({ name: newData.name, data: newData.data });
		}
	}

	return (
		<>
			{occupancyData ? (
				<>
					<Select
						defaultValue={state.name}
						onValueChange={(value: string) => handleChange(value)}>
						<SelectTrigger className='w-56 text-zinc-50 dark'>
							<SelectValue placeholder='Selecione uma unidade' />
						</SelectTrigger>
						<SelectContent className='dark'>
							<SelectGroup>
								{occupancyData.series.map((item, index) => {
									return (
										<SelectItem
											defaultValue={state.name}
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
						series={[{ name: state.name, data: state.data }]}
						categories={occupancyData?.categories}
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
