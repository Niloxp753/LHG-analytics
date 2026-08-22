/** @format */

'use client';
import Chart from 'react-apexcharts';
import ResponsiveContainerChart from '../ResponsiveContainerChart';
import DataState from '../DataState';
import EmptyState from '../EmptyState';
import { Skeleton } from '@/components/ui/skeleton';
import { DEFAULT_RANGE_TAG, isShortRangeTag } from '@/lib/date-range';
import {
	DEFAULT_BRL_CURRENCY_CONFIG,
	formatCurrency,
	type CurrencyConfig,
} from '@/lib/currency-format';
import { useSearchParams } from 'next/navigation';
import {
	resolveChartPalette,
	type ChartPaletteMode,
} from './consolidated-unit-palette';
import {
	resolveChartDensity,
	resolveXAxisLabelPolicy,
	Y_AXIS_READABILITY,
} from './chart-density';

type AreaChartSeries = NonNullable<ApexCharts.ApexOptions['series']>;

interface AreaChartsApexProps {
	series?: AreaChartSeries | null;
	categories?: string[];
	money?: boolean;
	percent?: boolean;
	id?: string;
	title?: string;
	legend?: string;
	palette?: ChartPaletteMode;
	width?: string;
	error?: string | boolean;
	currencyConfig?: CurrencyConfig;
}

export default function AreaChartsApex(props: AreaChartsApexProps) {
	const params = useSearchParams();
	const rangeTag = params.get('set') ?? DEFAULT_RANGE_TAG;
	const isShortRange = isShortRangeTag(rangeTag);
	const isCustomData = params.get('startDate') !== null;

	function isEnabled() {
		return isShortRange && !isCustomData;
	}

	const density = resolveChartDensity(props.series);
	const desktopXAxisLabels = resolveXAxisLabelPolicy(props.categories, 12);
	const mobileXAxisLabels = resolveXAxisLabelPolicy(props.categories, 6);
	const dataLabelsEnabled = density.allowDataLabels && isEnabled();

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

	const isEmptyData = !!props.series && (!hasSeriesData || !hasCategories);
	const isLoading = typeof props.series === 'undefined';
	const error =
		props.error ??
		(props.series === null ? 'Não foi possível carregar os dados.' : undefined);

	const seriesName =
		Array.isArray(props.series) &&
		props.series.length > 0 &&
		typeof (props.series[0] as { name?: unknown })?.name === 'string'
			? (props.series[0] as { name: string }).name
			: undefined;
	const emptyTitle = props.title ?? seriesName ?? 'Sem dados';
	const resolvedCurrencyConfig =
		props.currencyConfig ?? DEFAULT_BRL_CURRENCY_CONFIG;
	const seriesNames = Array.isArray(props.series)
		? props.series.flatMap((entry) =>
				typeof entry === 'object' &&
				entry !== null &&
				typeof (entry as { name?: unknown }).name === 'string'
					? [(entry as { name: string }).name]
					: [],
		  )
		: undefined;
	const fallbackSeriesColors = ['#a78bfa', '#60a5fa', '#818cf8', '#e879f9'];
	const fallbackAccentColors = [
		'#7c3aed',
		'#2563eb',
		'#4f46e5',
		'#c026d3',
		'#e11d48',
		'#ea580c',
		'#ca8a04',
		'#65a30d',
	];
	const palette = resolveChartPalette({
		palette: props.palette,
		labels: props.categories,
		seriesNames,
		fallbackSeriesColors,
		fallbackAccentColors,
	});

	const options: ApexCharts.ApexOptions = {
		chart: {
			id: props.id ?? 'chart',
			type: 'area',
			foreColor: '#fafafa',
			animations: { enabled: density.animationsEnabled },
			zoom: {
				enabled: false,
			},
			toolbar: {
				autoSelected: 'pan',
				show: false,
			},
		},
		title: {
			text: props.title,
			style: { fontSize: '16px', fontWeight: '600' },
		},
		legend: {
			show: true,
			showForSingleSeries: true,
			position: 'top',
			horizontalAlign: 'left',
			fontSize: '16px',
			fontWeight: 'bold',
			onItemHover: { highlightDataSeries: true },
			onItemClick: { toggleDataSeries: false },
		},
		grid: { show: false },
		dataLabels: {
			style: {
				colors: palette.accentColors,
				fontSize: '10px',
			},
			enabled: dataLabelsEnabled,
			distributed: false,
			background: {
				enabled: true,
				borderRadius: 4,
				padding: 4,
				borderWidth: 1,
			},
		},
		tooltip: {
			y: {
				formatter: (val: number | string) =>
					`${
						props.money
							? formatCurrency(val, resolvedCurrencyConfig)
							: props.percent
							? val + '%'
							: val ?? 10
					} `,
			},
		},
		colors: palette.seriesColors,
		fill: {
			gradient: {
				opacityFrom: 0.8,
				opacityTo: 0.2,
			},
		},

		markers: {
			size: density.markerSize,
			colors: palette.accentColors,
			hover: { size: density.markerHoverSize },
			strokeWidth: 1,
		},

		xaxis: {
			type: 'category',
			tickAmount: desktopXAxisLabels.tickAmount,

			labels: {
				trim: false,
				hideOverlappingLabels: true,
				rotate: desktopXAxisLabels.rotate,
				rotateAlways: desktopXAxisLabels.rotate !== 0,
			},

			crosshairs: {
				show: true,
			},
			axisBorder: { show: true },
			categories: props.categories ?? ['categoria1', 'categoria2'],
		},

		stroke: { curve: density.curve },
		yaxis: {
			...Y_AXIS_READABILITY,
			labels: { ...Y_AXIS_READABILITY.labels },
		},
		plotOptions: { area: { fillTo: 'origin' } },
		responsive: [
			{
				breakpoint: 580,
				options: {
					chart: {
						height: 400,
						width: '100%',
					},
					dataLabels: {
						enabled: false,
					},
					xaxis: {
						tickAmount: mobileXAxisLabels.tickAmount,
						tickPlacement: 'on',
						offsetX: 0,
						labels: {
							rotate: mobileXAxisLabels.rotate,
							rotateAlways: mobileXAxisLabels.rotate !== 0,
							style: { fontSize: '10px' },
						},
					},
					yaxis: {
						...Y_AXIS_READABILITY,
						show: true,
						crosshairs: {
							show: true,
						},
						axisBorder: {
							show: true,
						},
						labels: {
							...Y_AXIS_READABILITY.labels,
							style: { fontSize: '10px' },
							formatter: (val: number | string) =>
								`${
									props.money
										? formatCurrency(val, resolvedCurrencyConfig)
										: props.percent
										? val + '%'
										: val
								} `,
						},
					},
				},
			},
			{
				breakpoint: 3000,
				options: {
					chart: {
						height: 280,
						width: props.width ?? '100%',
					},
					xaxis: {
						tickAmount: desktopXAxisLabels.tickAmount,
						tickPlacement: 'between',
						offsetX: 0,
						offsetY: 8,

						labels: {
							rotate: desktopXAxisLabels.rotate,
							rotateAlways: desktopXAxisLabels.rotate !== 0,
							style: { fontSize: '11px' },
						},
					},
					dataLabels: {
						enabled: dataLabelsEnabled,
						formatter: (val: number | string) =>
							`${
								props.money
									? formatCurrency(val, resolvedCurrencyConfig)
									: props.percent
									? val + '%'
									: val
							} `,
					},
					yaxis: {
						...Y_AXIS_READABILITY,
						show: true,
						axisBorder: { show: true },
						labels: {
							...Y_AXIS_READABILITY.labels,
							show: true,
							formatter: (val: number | string) =>
								`${
									props.money
										? formatCurrency(val, resolvedCurrencyConfig)
										: props.percent
										? val + '%'
										: val
								} `,
							style: { fontSize: '11px' },
						},
					},
				},
			},
		],
	};

	return (
		<ResponsiveContainerChart>
			<DataState
				isLoading={isLoading}
				error={error}
				skeleton={<Skeleton className='w-full h-[280px]' />}>
				{isEmptyData ? (
					<EmptyState title={emptyTitle} minHeight={280} />
				) : (
					<Chart
						options={options}
						series={props.series as AreaChartSeries}
						type='area'
						height={280}></Chart>
				)}
			</DataState>
		</ResponsiveContainerChart>
	);
}
