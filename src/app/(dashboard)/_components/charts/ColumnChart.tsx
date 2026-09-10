/** @format */

'use client';
import Chart from 'react-apexcharts';
import ResponsiveContainerChart from '../ResponsiveContainerChart';
import DataState from '../DataState';
import EmptyState from '../EmptyState';
import { Skeleton } from '@/components/ui/skeleton';
import { useDashboardViewport } from '@/hooks/use-dashboard-viewport';
import { resolveXAxisLabelPolicy } from './chart-density';
import { sortUnitComparison } from './unit-comparison-data';
import MobileBarChart from './MobileBarChart';
import { DEFAULT_BRL_CURRENCY_CONFIG, formatCurrency, type CurrencyConfig } from '@/lib/currency-format';
import {
	normalizeUnitLabel,
	resolveUnitPaletteFromLabels,
	type ChartPaletteMode,
} from './consolidated-unit-palette';

const DEFAULT_CATEGORIES = [
	'3 horas',
	'6 horas',
	'12 horas',
	'Day Use',
	'Diária',
	'Pernoite',
];
const DEFAULT_COLORS = ['#a78bfa', '#60a5fa', '#818cf8', '#e879f9', '#fb7185'];

interface ColumnChartProps {
	title: string;
	categories?: string[];
	data?: unknown[];
	series?: ApexAxisChartSeries | ApexNonAxisChartSeries | null;
	error?: string | boolean;
	tooltipLabel?: 'series' | 'category';
	money?: boolean;
	palette?: ChartPaletteMode;
	comparison?: boolean;
	height?: number;
	colors?: string[];
	currencyConfig?: CurrencyConfig;
}

export default function ColumnChart(props: ColumnChartProps) {
	const unitPalette = props.palette === 'units';
	const comparison = unitPalette || props.comparison;
	const ranked = comparison && Array.isArray(props.series)
		&& props.series.every((value) => typeof value === 'number')
		? sortUnitComparison(props.categories ?? [], props.series as number[])
		: undefined;
	const categories = ranked?.categories ?? props.categories ?? (comparison ? [] : DEFAULT_CATEGORIES);
	const series = ranked
		? [{ name: props.title, data: ranked.series }]
		: props.series;
	const viewport = useDashboardViewport();
	const mobile = comparison && viewport === 'mobile';
	const height = props.height ?? 280;
	const chartLabels = unitPalette ? categories.map(normalizeUnitLabel) : categories;
	const categoryColors = props.colors ?? DEFAULT_COLORS;
	const currencyConfig = props.currencyConfig ?? DEFAULT_BRL_CURRENCY_CONFIG;
	const chartColors = unitPalette
		? resolveUnitPaletteFromLabels(categories).map((color) => color ?? '#94a3b8')
		: categories.map((label) => categoryColors[Math.max(0, props.categories?.indexOf(label) ?? 0) % categoryColors.length]);
	const formatCompactValue = (value: number) =>
		formatCurrency(value, currencyConfig, { notation: 'compact' });
	const formatValue = (value: number) => props.money
		? formatCompactValue(value)
		: value.toLocaleString('pt-BR', { maximumFractionDigits: 2 });
	const desktopXAxisLabels = resolveXAxisLabelPolicy(categories, 12);
	const mobileXAxisLabels = resolveXAxisLabelPolicy(categories, 6);
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
	const hasCategories = comparison || props.categories ? categories.length > 0 : true;

	const isEmptyData = !!props.series && (!hasSeriesData || !hasCategories);
	const isLoading = typeof props.series === 'undefined';
	const error =
		props.error ??
		(props.series === null ? 'Não foi possível carregar os dados.' : undefined);

	const options: ApexCharts.ApexOptions = {
		chart: {
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
			style: { color: '#f4f4f5', fontSize: '16px', fontWeight: 400 },
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
			...(props.money || comparison ? { formatter: formatValue } : {}),
			offsetY: comparison ? -20 : 0,
			background: {
				enabled: !comparison,
				borderRadius: 4,
				padding: 12,
				borderWidth: 1,
			},
			style: {
				colors: comparison ? ['#f4f4f5'] : ['#7c3aed', '#2563eb', '#4f46e5', '#c026d3', '#e11d48'],
				...(comparison ? { fontSize: '12px' } : {}),
			},
		},
		colors: comparison ? chartColors : ['#a78bfa', '#60a5fa', '#818cf8', '#e879f9'],
		...(comparison ? { legend: { show: false } } : {}),
		fill: comparison ? { type: 'solid', opacity: 1 } : {
			gradient: {
				opacityFrom: 0.5,
				opacityTo: 0.2,
				gradientToColors: ['#a78bfa', '#2e1065'],
			},
		},
		xaxis: {
			type: 'category',
			tickAmount: comparison ? undefined : desktopXAxisLabels.tickAmount,
			axisBorder: { show: true },
			categories: comparison
				? chartLabels.map((label) => label.split(' '))
				: categories,
			labels: {
				hideOverlappingLabels: !comparison,
				rotate: comparison ? 0 : desktopXAxisLabels.rotate,
				rotateAlways: !comparison && desktopXAxisLabels.rotate !== 0,
				trim: false,
				...(comparison ? { style: { fontSize: '12px' } } : {}),
			},
		},
		yaxis: {
			show: !!props.money || comparison,
			...(props.money || comparison ? { min: 0 } : {}),
			labels: {
				show: true,
				...(props.money || comparison ? { formatter: formatValue } : {}),
			},
		},
		stroke: { curve: 'smooth' },
		plotOptions: {
			bar: {
				borderRadius: 4,
				columnWidth: comparison ? '55%' : 24,
				distributed: !!comparison,
				...(comparison ? { dataLabels: { position: 'top' } } : {}),
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
				: props.money || comparison
					? {
						x: { formatter: (_value, context) => chartLabels[context?.dataPointIndex ?? -1] ?? '' },
						y: { formatter: (value) => props.money
							? formatCurrency(value, currencyConfig)
							: formatValue(value) },
					}
					: undefined,
		responsive: comparison ? [] : [
			{
				breakpoint: 580,
				options: {
					xaxis: {
						tickAmount: mobileXAxisLabels.tickAmount,
						labels: {
							hideOverlappingLabels: true,
							rotate: mobileXAxisLabels.rotate,
							rotateAlways: mobileXAxisLabels.rotate !== 0,
							trim: false,
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
				skeleton={<Skeleton className='w-full' style={{ height }} />}>
				{isEmptyData ? (
					<EmptyState title={props.title} minHeight={height} />
				) : mobile && ranked ? (
					<MobileBarChart
						title={props.title}
						labels={chartLabels}
						values={ranked.series}
						colors={chartColors}
						formatValue={props.money
							? (value) => formatCurrency(value, currencyConfig)
							: formatValue}
					/>
				) : (
					<div
						className={comparison ? 'overflow-x-auto' : undefined}
						role={comparison ? 'region' : undefined}
						aria-label={comparison ? props.title : undefined}
						tabIndex={comparison ? 0 : undefined}>
						<div style={comparison ? { minWidth: Math.max(600, categories.length * 80 + 64) } : undefined}>
							<Chart
								options={options}
								series={series as ApexAxisChartSeries}
								type='bar'
								width='100%'
								height={height}
							/>
						</div>
					</div>
				)}
			</DataState>
		</ResponsiveContainerChart>
	);
}
