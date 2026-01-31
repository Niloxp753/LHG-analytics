/** @format */

'use client';

import dynamic from 'next/dynamic';
import ResponsiveContainerChart from '@/app/(dashboard)/_components/ResponsiveContainerChart';
import DataState from '@/app/(dashboard)/_components/DataState';
import { Skeleton } from '@/components/ui/skeleton';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

type PieTotalFormatterContext = {
	globals: {
		series: number[];
	};
};

interface PieChartsApexProps {
	title?: string;
	labels?: string[];
	series?: ApexNonAxisChartSeries | null;
	colors?: string[];
	dataLabelColors?: string[];
	height?: number;
	money?: boolean;
	percent?: boolean;
	categories?: string[];
	error?: string | boolean;
}

export default function PieChartsApex(props: PieChartsApexProps) {
	const hasSeriesData = Array.isArray(props.series)
		? props.series.length > 0
		: false;
	const hasLabels = props.labels ? props.labels.length > 0 : true;

	if (props.series && (!hasSeriesData || !hasLabels)) {
		return null;
	}
	const isLoading = typeof props.series === 'undefined';
	const error =
		props.error ??
		(props.series === null ? 'Não foi possível carregar os dados.' : undefined);

	const options: ApexCharts.ApexOptions = {
		chart: {
			id: 'donut-chart',
			stacked: false,
			foreColor: '#000',
			dropShadow: {
				enabled: false,
			},
			zoom: {
				enabled: false,
			},
			type: 'donut',

			toolbar: {
				show: false,
			},
		},
		legend: {
			show: true,
			position: 'bottom',
			itemMargin: { vertical: 6, horizontal: 24 },
			fontSize: '12px',
			fontWeight: 'bold',
			offsetY: 8,
			labels: {
				colors: '#f4f4f5',
			},
			onItemHover: { highlightDataSeries: false },
			onItemClick: { toggleDataSeries: false },
		},
		title: {
			align: 'left',
			text: props.title ? props.title : 'Faturamento por unidade',
			style: { color: '#f4f4f5', fontSize: '16px', fontWeight: 'bold' },
			margin: 12,
		},

		colors: ['#a78bfa', '#60a5fa', '#818cf8', '#e879f9', '#fb7185'],
		labels: props.labels
			? props.labels
			: ['Lush Ipiranga', 'Lush Lapa', 'Tout', 'Andar de Cima'],
		stroke: { show: false },
		dataLabels: {
			enabled: true,
			textAnchor: 'end',
			style: {
				colors: ['#7c3aed', '#2563eb', '#4f46e5', '#c026d3', '#e11d48'],
				fontWeight: 'semibold',
				fontSize: '12px',
			},
			dropShadow: { enabled: true },
			background: {
				enabled: true,
				padding: 8,
				borderRadius: 8,
				dropShadow: {
					enabled: false,
				},
			},
		},
		tooltip: {
			enabled: true,
			fillSeriesColor: false,
			y: {
				formatter: (val: number | string) =>
					`${
						props.money
							? val.toLocaleString('pt-BR', {
									style: 'currency',
									currency: 'BRL',
								})
							: props.percent
								? val + '%'
								: (val ?? 10)
					} `,
			},
		},
		plotOptions: {
			pie: {
				expandOnClick: true,
				donut: {
					labels: {
						value: {
							show: true,
							fontSize: '20px',
							color: '#fafafa',
							fontWeight: 'bold',
							formatter: (val: number | string) =>
								`${
									props.money
										? val.toLocaleString('pt-BR', {
												style: 'currency',
												currency: 'BRL',
											})
										: props.percent
											? val + '%'
											: (val ?? 10)
								} `,
						},
						name: {
							show: false,
						},
						show: true,
						total: {
							show: true,
							showAlways: true,
							formatter: (w: PieTotalFormatterContext) => {
								const data = w.globals.series.reduce(
									(acc, cur) => acc + cur,
									0,
								);
								return `${
									props.money
										? data.toLocaleString('pt-BR', {
												style: 'currency',
												currency: 'BRL',
											})
										: props.percent
											? data + '%'
											: data.toLocaleString('pt-br')
								} `;
							},
						},
					},
				},
			},
		},
	};

	return (
		<ResponsiveContainerChart>
			<DataState
				isLoading={isLoading}
				error={error}
				skeleton={<Skeleton className='w-full h-[324px]' />}>
				<Chart
					options={options}
					width={'100%'}
					height={400}
					series={props.series as ApexNonAxisChartSeries}
					type='donut'></Chart>
			</DataState>
		</ResponsiveContainerChart>
	);
}
