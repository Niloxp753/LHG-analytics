/** @format */

'use client';
import Chart from 'react-apexcharts';
import ResponsiveContainerChart from '../ResponsiveContainerChart';
import { Skeleton } from '@/components/ui/skeleton';
import { DEFAULT_RANGE_TAG, isShortRangeTag } from '@/lib/date-range';
import { useSearchParams } from 'next/navigation';

interface AreaChartsApexProps {
	series?: ApexAxisChartSeries | ApexNonAxisChartSeries | undefined;
	categories?: string[];
	money?: boolean;
	percent?: boolean;
	id?: string;
	title?: string;
	legend?: string;
	width?: string;
}

export default function AreaChartsApex(props: AreaChartsApexProps) {
	const params = useSearchParams();
	const rangeTag = params.get('set') ?? DEFAULT_RANGE_TAG;
	const isShortRange = isShortRangeTag(rangeTag);
	const isCustomData = params.get('startDate') !== null;

	function isEnabled() {
		return isShortRange && !isCustomData;
	}

	const options: ApexCharts.ApexOptions = {
		chart: {
			id: props.id ?? 'chart',
			type: 'area',
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
				colors: ['#7c3aed', '#2563eb', '#4f46e5', '#c026d3', '#e11d48'],
				fontSize: '10px',
			},
			enabled: isEnabled(),
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
							? val.toLocaleString('pt-BR', {
									style: 'currency',
									currency: 'BRL',
							  })
							: props.percent
							? val + '%'
							: val ?? 10
					} `,
			},
		},
		colors: ['#a78bfa', '#60a5fa', '#818cf8', '#e879f9'],
		fill: {
			gradient: {
				opacityFrom: 0.8,
				opacityTo: 0.2,
			},
		},

		markers: {
			size: 3,
			colors: [
				'#7c3aed',
				'#2563eb',
				'#4f46e5',
				'#c026d3',
				'#e11d48',
				'#ea580c',
				'#ca8a04',
				'#65a30d',
			],
			hover: { size: 5 },
			strokeWidth: 1,
		},

		xaxis: {
			type: 'category',

			labels: {
				trim: false,
				hideOverlappingLabels: true,
			},

			crosshairs: {
				show: true,
			},
			axisBorder: { show: true },
			categories: props.categories ?? ['categoria1', 'categoria2'],
		},

		stroke: { curve: 'smooth' },
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
						tickPlacement: 'on',
						offsetX: 0,
						labels: {
							rotate: -45,
							style: { fontSize: '10px' },
						},
					},
					yaxis: {
						show: true,
						crosshairs: {
							show: true,
						},
						axisBorder: {
							show: true,
						},
						labels: {
							style: { fontSize: '10px' },
							formatter: (val: number | string) =>
								`${
									props.money
										? val.toLocaleString('pt-BR', {
												style: 'currency',
												currency: 'BRL',
										  })
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
						tickPlacement: 'between',
						offsetX: 0,
						offsetY: 8,

						labels: {
							rotate: -45,
							style: { fontSize: '11px' },
						},
					},
					dataLabels: {
						enabled: isEnabled(),
						formatter: (val: number | string) =>
							`${
								props.money
									? val.toLocaleString('pt-BR', {
											style: 'currency',
											currency: 'BRL',
									  })
									: props.percent
									? val + '%'
									: val
							} `,
					},
					yaxis: {
						show: true,
						axisBorder: { show: true },
						labels: {
							show: true,
							formatter: (val: number | string) =>
								`${
									props.money
										? val.toLocaleString('pt-BR', {
												style: 'currency',
												currency: 'BRL',
										  })
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
			{props.series ? (
				<Chart
					options={options}
					series={props.series}
					type='area'
					height={280}></Chart>
			) : (
				<>
					<Skeleton className='w-full h-[280px]'></Skeleton>
				</>
			)}
		</ResponsiveContainerChart>
	);
}
