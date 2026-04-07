/** @format */

'use client';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
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

interface AreaChartsApexProps {
	title: string;
	categories?: string[];
	data?: unknown[];
	series?: ApexAxisChartSeries | ApexNonAxisChartSeries | null;
	palette?: ChartPaletteMode;
	height: string | number | undefined;
	money?: boolean;
	percent?: boolean;
	error?: string | boolean;
	currencyConfig?: CurrencyConfig;
}

export default function LineChartsApexUnity(props: AreaChartsApexProps) {
	const params = useSearchParams();
	const rangeTag = params.get('set') ?? DEFAULT_RANGE_TAG;
	const isShortRange = isShortRangeTag(rangeTag);
	const isCustomData = params.get('startDate') !== null;

	function isEnabled() {
		return isShortRange && !isCustomData;
	}

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
	const parsedHeight =
		typeof props.height === 'number'
			? props.height
			: typeof props.height === 'string'
				? Number.parseInt(props.height, 10)
				: Number.NaN;
	const emptyHeight = Number.isFinite(parsedHeight) ? parsedHeight : 340;
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
	const fallbackSeriesColors = [
		'#a78bfa',
		'#60a5fa',
		'#818cf8',
		'#e879f9',
		'#fb7185',
		'#fb923c',
		'#facc15',
		'#a3e635',
	];
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
			id: 'line-bar',
			stacked: false,
			width: '100%',
			type: 'line',
			foreColor: '#fafafa',
			zoom: {
				enabled: false,
			},
			toolbar: {
				autoSelected: 'pan',
				show: false,
			},
		},
		legend: {
			showForSingleSeries: true,
			position: 'top',
			horizontalAlign: 'center',
			fontSize: '8x',
			fontWeight: 'bold',
			onItemHover: { highlightDataSeries: true },
			onItemClick: { toggleDataSeries: false },
			itemMargin: {
				vertical: 8,
				horizontal: 20,
			},
		},
		grid: {
			borderColor: 'rgba(255,255,255,0.1)',

			xaxis: {
				lines: {
					show: true,
				},
			},
			show: true,
			yaxis: {
				lines: {
					show: true,
				},
			},
		},
		dataLabels: {
			formatter: (val: number | string) =>
				`${
					props.money
						? formatCurrency(val, resolvedCurrencyConfig)
						: props.percent
						? val + '%'
						: val.toLocaleString('pt-br')
				} `,
			enabled: false,
			distributed: false,
			background: {
				enabled: true,
				borderRadius: 4,
				padding: 8,
				borderWidth: 1,
				foreColor: '#fafafa',
			},
			style: {
				colors: palette.accentColors,
				fontSize: '10px',
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
							: val
					} `,
			},
		},
		colors: palette.seriesColors,
		title: {
			text: props.title,
			style: { fontWeight: 'bold', fontSize: '18px' },
		},
		fill: {
			gradient: {
				opacityFrom: 0.5,
				opacityTo: 0.2,
			},
		},
		markers: {
			size: 3,
			colors: palette.accentColors,
			hover: { size: 5 },
			strokeWidth: 1,
		},

		xaxis: {
			type: 'category',
			tickPlacement: 'between',
			axisBorder: { show: true },
			categories: props.categories,
		},
		yaxis: {
			show: true,
			labels: {
				show: true,
				style: { fontSize: '9px' },
				formatter: (val: number | string) =>
					`${
						props.money
							? formatCurrency(val, resolvedCurrencyConfig)
							: props.percent
							? val + '%'
							: val
					} `,
			},
			axisBorder: { show: true },
		},
		stroke: { curve: 'smooth', width: 2 },
		responsive: [
			{
				breakpoint: 580,
				options: {
					chart: {
						height: 580,
					},
					dataLabels: {
						enabled: false,
					},
					xaxis: {
						axisTicks: { show: true },
						tickPlacement: 'on',
						offsetY: 2,
						labels: {
							trim: false,
							style: { fontSize: '10px' },
							hideOverlappingLabels: true,
							rotate: -45,
						},
					},
					legend: {
						position: 'bottom',
						offsetY: 10,
						fontSize: '12x',
						itemMargin: {
							vertical: 8,
							horizontal: 8,
						},
					},
				},
			},
			{
				breakpoint: 3000,
				options: {
					chart: {
						height: 340,
					},
					dataLabels: {
						enabled: isEnabled(),
					},
					xaxis: {
						labels: {
							trim: false,
							style: { fontSize: '12px' },
							rotate: isEnabled() ? 0 : -45,
							hideOverlappingLabels: true,
						},
					},
					legend: {
						position: 'top',
						offsetY: 0,
						fontSize: '12x',
						itemMargin: {
							vertical: 14,
							horizontal: 12,
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
				skeleton={<Skeleton className='w-full h-[340px]' />}>
				{isEmptyData ? (
					<EmptyState title={props.title} minHeight={emptyHeight} />
				) : (
					<Chart
						options={options}
						series={props.series as ApexAxisChartSeries}
						type='line'
						width={'100%'}
						height={props.height}></Chart>
				)}
			</DataState>
		</ResponsiveContainerChart>
	);
}
