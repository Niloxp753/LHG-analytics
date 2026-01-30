/** @format */

'use client';
import Chart from 'react-apexcharts';
import ResponsiveContainerChart from '../ResponsiveContainerChart';
import DataState from '../DataState';
import { Skeleton } from '@/components/ui/skeleton';

interface BarChartsApexProps {
	title: string;
	colors: string[];
	categories?: string[];
	series?: ApexAxisChartSeries | ApexNonAxisChartSeries | null;
	dataLabelColors: string[];
	money?: boolean;
	error?: string | boolean;
	stacked?: boolean;
	showDataLabels?: boolean;
	showTotalLabels?: boolean;
	showLegend?: boolean;
	showXAxisLabels?: boolean;
	showXAxisGrid?: boolean;
	barHeight?: number | string;
	height?: number;
	hideDataLabelsOnMobile?: boolean;
}

export default function BarChartsApex(props: BarChartsApexProps) {
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
	const hasCategories =
		Array.isArray(props.categories) ? props.categories.length > 0 : true;

	if (props.series && (!hasSeriesData || !hasCategories)) {
		return null;
	}
	const isLoading = typeof props.series === 'undefined';
	const error =
		props.error ??
		(props.series === null ? 'Não foi possível carregar os dados.' : undefined);

	const stacked = props.stacked ?? false;
	const showDataLabels = props.showDataLabels ?? true;
	const showTotalLabels = props.showTotalLabels ?? false;
	const showLegend = props.showLegend ?? false;
	const showXAxisLabels = props.showXAxisLabels ?? false;
	const showXAxisGrid = props.showXAxisGrid ?? false;
	const barHeight = props.barHeight ?? 24;
	const dataLabelsEnabled = showDataLabels || showTotalLabels;
	const hideDataLabelsOnMobile = props.hideDataLabelsOnMobile ?? false;
	const seriesLength = Array.isArray(props.series) ? props.series.length : 0;
	const lastSeriesIndex = seriesLength > 0 ? seriesLength - 1 : 0;

	const formatCompactValue = (value: number) => {
		const numericValue = Number(value);
		if (Number.isNaN(numericValue)) {
			return '';
		}
		if (props.money) {
			return numericValue.toLocaleString('pt-BR', {
				style: 'currency',
				currency: 'BRL',
				notation: 'compact',
			});
		}
		return `${numericValue}`;
	};

	const gridColor = showXAxisGrid ? 'rgba(167, 139, 250, 0.2)' : '#a78bfa';

	const options: ApexCharts.ApexOptions = {
		chart: {
			id: 'bar-chart',
			stacked,

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
			margin: 8,
		},
		grid: {
			borderColor: gridColor,
			show: true,
			xaxis: {
				lines: {
					show: showXAxisGrid,
				},
			},
			yaxis: {
				lines: {
					show: false,
				},
			},
		},

		dataLabels: {
			enabled: dataLabelsEnabled,
			...(showTotalLabels ? { enabledOnSeries: [lastSeriesIndex] } : {}),
			formatter: (val: number, opts) => {
				if (showTotalLabels && stacked) {
					const totals = opts?.w?.globals?.stackedSeriesTotals;
					const total = totals?.[opts.dataPointIndex];
					return formatCompactValue(Number(total ?? val));
				}

				if (!showDataLabels) {
					return '';
				}

				return formatCompactValue(val);
			},
			background: {
				enabled: true,
				borderRadius: 4,
				padding: showTotalLabels ? 8 : 12,
				borderWidth: 1,
			},
			style: {
				colors: props.dataLabelColors,
				fontSize: '11px',
			},
			offsetX: showTotalLabels ? 8 : 0,
		},
		tooltip: {
			y: {
				formatter: (val: number) =>
					`${
						props.money
							? val.toLocaleString('pt-BR', {
									style: 'currency',
									currency: 'BRL',
							  })
							: val
					}`,
			},
		},
		colors: props.colors,
		fill: {
			gradient: {
				opacityFrom: 0.5,
				opacityTo: 0.2,
				gradientToColors: ['#a78bfa', '#2e1065'],
			},
		},

		xaxis: {
			type: 'category',
			axisBorder: { show: false },
			sorted: true,
			categories: props.categories,
			axisTicks: { show: false },
			labels: {
				show: showXAxisLabels,
				...(showXAxisLabels
					? {
							formatter: (value: string) => {
								const numericValue = Number(value);
								if (Number.isNaN(numericValue)) {
									return value;
								}
								return formatCompactValue(numericValue);
							},
					  }
					: {}),
				style: {
					fontSize: '10px',
				},
			},
		},
		yaxis: { show: true, labels: { show: true } },
		stroke: { curve: 'smooth' },

		plotOptions: {
			bar: {
				borderRadius: 5,
				borderRadiusApplication: 'end',
				horizontal: true,
				rangeBarGroupRows: true,
				barHeight,
			},
		},
	};

	if (showLegend) {
		options.legend = {
			show: true,
			position: 'top',
			horizontalAlign: 'left',
			fontSize: '11px',
			fontWeight: 600,
			itemMargin: { horizontal: 8, vertical: 0 },
		};
	}

	if (hideDataLabelsOnMobile) {
		options.responsive = [
			{
				breakpoint: 768,
				options: {
					dataLabels: {
						enabled: false,
					},
				},
			},
		];
	}

	return (
		<ResponsiveContainerChart>
			<DataState
				isLoading={isLoading}
				error={error}
				skeleton={<Skeleton className='w-full h-[600px]' />}>
				<Chart
					options={options}
					series={props.series as ApexAxisChartSeries}
					type='bar'
					width={'100%'}
					height={props.height ?? 720}></Chart>
			</DataState>
		</ResponsiveContainerChart>
	);
}
