/** @format */

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ReactNode } from 'react';

interface CardDetailsProps {
	title: string;
	value: number | string;
	icon: any;
	type?: string;
	description?: string;
	Badge?: ReactNode;
	monthlyForecast?: number | string;
	showForecast: boolean;
}

export default function CardDetails({
	title,
	value,
	icon,
	type,
	Badge,
	monthlyForecast,
	description,
	showForecast,
}: CardDetailsProps) {
	return value ? (
		<Card className='text-zinc-50 w-full border-none bg-gradient-to-br from-zinc-800 to-zinc-900 '>
			<CardHeader>
				<CardTitle className='text-base flex md:items-center justify-between flex-row gap-5'>
					<div className='flex items-center gap-3'>
						{title}
						{Badge}
					</div>
					{icon}
				</CardTitle>
				{description && (
					<CardDescription className='text-muted-foreground'>
						{description}
					</CardDescription>
				)}
			</CardHeader>
			<CardContent>
				{type == 'money' ? (
					<p className='flex gap-1 items-end justify-between'>
						{value.toLocaleString('pt-BR', {
							style: 'currency',
							currency: 'BRL',
						})}
						{showForecast && (
							<span className='flex flex-col items-start gap-1'>
								<span className='text-xs text-muted-foreground'>Out/25</span>
								<span className='text-muted-foreground text-xs'>
									Valor previsto mensal:
								</span>{' '}
								<span className='text-sm'>
									{monthlyForecast &&
										monthlyForecast.toLocaleString('pt-BR', {
											style: 'currency',
											currency: 'BRL',
										})}
								</span>
							</span>
						)}
					</p>
				) : type == 'percent' ? (
					<p className='flex gap-1 items-center'>
						{(Number(value) * 100).toFixed(2) + '%'}
					</p>
				) : (
					<p className='flex gap-1 items-end justify-between'>
						{value.toLocaleString('pt-BR')}
						{showForecast && (
							<span className='flex flex-col items-start gap-1'>
								<span className='text-xs text-muted-foreground'>Out/25</span>
								<span className='text-muted-foreground text-xs'>
									Valor previsto mensal:
								</span>{' '}
								<span className='text-sm'>
									{monthlyForecast?.toLocaleString('pt-BR')}
								</span>
							</span>
						)}
					</p>
				)}
			</CardContent>
		</Card>
	) : (
		<Skeleton className='h-28 w-full' />
	);
}
