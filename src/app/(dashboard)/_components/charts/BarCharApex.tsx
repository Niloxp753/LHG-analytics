/** @format */

'use client';
import Chart from 'react-apexcharts';
import ResponsiveContainerChart from '../ResponsiveContainerChart';
import { Skeleton } from '@/components/ui/skeleton';

interface BarChartsApexProps {
	title: string;
	colors: string[];
	categories: string[];
	series: ApexAxisChartSeries | ApexNonAxisChartSeries;
	dataLabelColors: string[];
	money?: boolean;
}

export default function BarChartsApex(props: BarChartsApexProps) {
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
			margin: 8,
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
			formatter: (val: number) =>
				`${
					props.money
						? val.toLocaleString('pt-BR', {
								style: 'currency',
								currency: 'BRL',
								notation: 'compact',
						  })
						: val
				}`,
			background: {
				enabled: true,
				borderRadius: 4,
				padding: 12,
				borderWidth: 1,
			},
			style: {
				colors: props.dataLabelColors,
				fontSize: '11px',
			},
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
				show: false,
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
				barHeight: 24,
			},
		},
	};

	return (
		<ResponsiveContainerChart>
			{props.series ? (
				<Chart
					options={options}
					series={props.series}
					type='bar'
					width={'100%'}
					height={720}></Chart>
			) : (
				<>
					<Skeleton className='w-full h-[600px]'></Skeleton>
				</>
			)}
		</ResponsiveContainerChart>
	);
}
