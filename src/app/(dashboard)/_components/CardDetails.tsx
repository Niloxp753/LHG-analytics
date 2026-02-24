/** @format */

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
	DEFAULT_BRL_CURRENCY_CONFIG,
	formatCurrency,
	type CurrencyConfig,
} from '@/lib/currency-format';
import { format } from 'date-fns';
import { ReactNode } from 'react';

interface CardDetailsProps {
	title: string;
	value: number | string;
	icon: ReactNode;
	type?: string;
	description?: string;
	Badge?: ReactNode;
	monthlyForecast?: number | string;
	showForecast?: boolean;
	currencyConfig?: CurrencyConfig;
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
	currencyConfig,
}: CardDetailsProps) {
	const now = new Date();
	const dateReference = format(now, 'MMM/yy');
	const resolvedCurrencyConfig = currencyConfig ?? DEFAULT_BRL_CURRENCY_CONFIG;
	return value ? (
		<Card className='text-zinc-50 w-full border-none bg-gradient-to-br from-zinc-800 to-zinc-900 '>
			<CardHeader>
				<CardTitle className='text-sm font-medium text-zinc-200 flex md:items-center justify-between flex-row gap-5'>
					<div className='flex items-center gap-3'>
						{title}
						{Badge}
					</div>
					{icon}
				</CardTitle>
				{description && (
					<CardDescription className='text-xs text-muted-foreground leading-tight'>
						{description}
					</CardDescription>
				)}
			</CardHeader>
			<CardContent>
				{type == 'money' ? (
					<p className='flex gap-2 items-end justify-between text-2xl font-semibold tracking-tight'>
						{formatCurrency(value, resolvedCurrencyConfig)}
						{showForecast && (
							<span className='flex flex-col items-start gap-1 text-xs font-normal text-muted-foreground'>
								<span className='text-xs text-muted-foreground'>
									{dateReference}
								</span>
								<span className='text-muted-foreground text-xs'>
									Valor previsto mensal:
								</span>{' '}
								<span className='text-xs text-muted-foreground'>
									{monthlyForecast !== undefined && monthlyForecast !== null
										? formatCurrency(
												monthlyForecast,
												resolvedCurrencyConfig,
											)
										: ''}
								</span>
							</span>
						)}
					</p>
				) : type == 'percent' ? (
					<p className='flex gap-2 items-end justify-between text-2xl font-semibold tracking-tight'>
						{Number(value).toFixed(2) + '%'}
						{showForecast && (
							<span className='flex flex-col items-start gap-1 text-xs font-normal text-muted-foreground'>
								<span className='text-xs text-muted-foreground'>
									{dateReference}
								</span>
								<span className='text-muted-foreground text-xs'>
									Valor previsto mensal:
								</span>{' '}
								<span className='text-xs text-muted-foreground'>
									{monthlyForecast !== undefined && monthlyForecast !== null
										? Number(monthlyForecast).toFixed(2) + '%'
										: ''}
								</span>
							</span>
						)}
					</p>
				) : (
					<p className='flex gap-2 items-end justify-between text-2xl font-semibold tracking-tight'>
						{value.toLocaleString('pt-BR')}
						{showForecast && (
							<span className='flex flex-col items-start gap-1 text-xs font-normal text-muted-foreground'>
								<span className='text-xs text-muted-foreground'>
									{dateReference}
								</span>
								<span className='text-muted-foreground text-xs'>
									Valor previsto mensal:
								</span>{' '}
								<span className='text-xs text-muted-foreground'>
									{monthlyForecast !== undefined && monthlyForecast !== null
										? monthlyForecast.toLocaleString('pt-BR')
										: ''}
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
