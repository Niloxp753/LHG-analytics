/** @format */

'use client';
import Chart from 'react-apexcharts';
import ResponsiveContainerChart from '../ResponsiveContainerChart';
import DataState from '../DataState';
import { Skeleton } from '@/components/ui/skeleton';

interface ColumnChartProps {
	title: string;
	categories?: string[];
	data?: unknown[];
	series?: ApexAxisChartSeries | ApexNonAxisChartSeries | null;
	error?: string | boolean;
	tooltipLabel?: 'series' | 'category';
}

export default function ColumnChart(props: ColumnChartProps) {
	const hasSeriesData = Array.isArray(props.series)
		? props.series.length > 0 &&
		  props.series.some((entry) => {
				if (typeof entry === 'number') {
					return true;
				}
				const data = (entry as { data?: unknown[] })?.data;
				return Array.isArray(data) ? data.length > 0 : false;
		  })
		: false;
	const hasCategories = props.categories ? props.categories.length > 0 : true;

	if (props.series && (!hasSeriesData || !hasCategories)) {
		return null;
	}
	const isLoading = typeof props.series === 'undefined';
	const error =
		props.error ??
		(props.series === null ? 'Não foi possível carregar os dados.' : undefined);

	const options: ApexCharts.ApexOptions = {
		chart: {
			id: 'bar-chart',
			stacked: false,
			type: 'bar',

			foreColor: '#fafafa',
			zoom: {
				enabled: false,
			},
			toolbar: {
				autoSelected: 'pan',
				show: false,
			},
		},
		title: {
			align: 'left',
			text: props.title,
			style: { color: '#f4f4f5', fontSize: '16px', fontWeight: 'bold' },
			margin: 4,
		},
		grid: {
			borderColor: '#a78bfa',
			show: true,
			yaxis: {
				lines: {
					show: false,
				},
			},
		},
		dataLabels: {
			enabled: true,
			distributed: false,
			background: {
				enabled: true,
				borderRadius: 4,
				padding: 12,
				borderWidth: 1,
			},
			style: {
				colors: ['#7c3aed', '#2563eb', '#4f46e5', '#c026d3', '#e11d48'],
			},
		},
		colors: ['#a78bfa', '#60a5fa', '#818cf8', '#e879f9'],
		fill: {
			gradient: {
				opacityFrom: 0.5,
				opacityTo: 0.2,
				gradientToColors: ['#a78bfa', '#2e1065'],
			},
		},
		xaxis: {
			type: 'category',
			axisBorder: { show: true },

			categories: props.categories
				? props.categories
				: ['3 horas', '6 horas', '12 horas', 'Day Use', 'Diária', 'Pernoite'],
		},
		yaxis: { show: false, labels: { show: true } },
		stroke: { curve: 'smooth' },
		plotOptions: {
			bar: {
				borderRadius: 4,
				columnWidth: 24,
				borderRadiusApplication: 'end',
				horizontal: false,
				rangeBarOverlap: true,
			},
		},
		tooltip:
			props.tooltipLabel === 'category'
				? {
						custom: ({ series, seriesIndex, dataPointIndex, w }) => {
							const label =
								w.globals.labels?.[dataPointIndex] ??
								w.globals.categories?.[dataPointIndex] ??
								'';
							const value =
								series?.[seriesIndex]?.[dataPointIndex] ?? '0';
							const color = w.globals.colors?.[seriesIndex] ?? '#a78bfa';
							return (
								`<div class="apexcharts-tooltip-title">${label}</div>` +
								`<div class="apexcharts-tooltip-series-group" style="display:flex;align-items:center;gap:6px;padding:4px 8px;">` +
								`<span class="apexcharts-tooltip-marker" style="background-color:${color};"></span>` +
								`<div class="apexcharts-tooltip-text"><div class="apexcharts-tooltip-y-group"><span>Reservas: ${value}</span></div></div>` +
								`</div>`
							);
						},
				  }
				: undefined,
	};

	return (
		<ResponsiveContainerChart>
			<DataState
				isLoading={isLoading}
				error={error}
				skeleton={<Skeleton className='w-full h-[280px]' />}>
				<Chart
					options={options}
					series={props.series as ApexAxisChartSeries}
					type='bar'
					width={'100%'}
					height={280}></Chart>
			</DataState>
		</ResponsiveContainerChart>
	);
}
