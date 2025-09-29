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
	series: number[];
	categories: string[];
}

export default function OccupationCasaLush(data?: any) {
	const occupancyData: OccupancyDataProps = data.data;

	const [state, setState] = useState(occupancyData.categories[0]);

	return (
		<>
			{occupancyData ? (
				<>
					<Select
						defaultValue={state}
						onValueChange={(value: string) => setState(value)}>
						<SelectTrigger className='w-56 text-zinc-50 dark'>
							<SelectValue placeholder='Selecione uma unidade' />
						</SelectTrigger>
						<SelectContent className='dark'>
							<SelectGroup>
								{occupancyData.categories.map((item, index) => {
									return (
										<SelectItem
											value={item}
											key={index}>
											{item}
										</SelectItem>
									);
								})}
							</SelectGroup>
						</SelectContent>
					</Select>
					<AreaChartsApex
						percent
						id='occupation-category'
						series={occupancyData.series}
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
