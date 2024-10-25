/** @format */

'use client';
import Chart from 'react-apexcharts';
import ResponsiveContainerChart from '../ResponsiveContainerChart';

interface AreaChartsApexProps {
	series?: ApexAxisChartSeries | ApexNonAxisChartSeries | undefined;
	legend?: string;
	color?: string;
	labelColor?: string;
	categories?: string[];
}

export default function AreaChartsApex(props: AreaChartsApexProps) {
	const options: ApexCharts.ApexOptions = {
		chart: {
			id: 'test-bar',
			stacked: false,
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
		legend: {
			showForSingleSeries: true,
			position: 'top',
			horizontalAlign: 'left',
			fontSize: '16px',
			fontWeight: 'bold',
			onItemHover: { highlightDataSeries: true },
			onItemClick: { toggleDataSeries: false },
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
			style: {
				colors: ['#7c3aed', '#2563eb', '#4f46e5', '#c026d3', '#e11d48'],
			},
			enabled: false,
			formatter: (val: number) =>
				`${val.toLocaleString('pt-BR', {
					style: 'currency',
					currency: 'BRL',
				})}`,
			distributed: false,
			background: {
				enabled: true,
				borderRadius: 4,
				padding: 12,
				borderWidth: 1,
			},
		},
		tooltip: {
			y: {
				formatter: (val: number) =>
					`${val.toLocaleString('pt-BR', {
						style: 'currency',
						currency: 'BRL',
					})}`,
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
			size: 5,
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
			hover: { size: 8 },
			strokeWidth: 1,
		},

		xaxis: {
			axisBorder: { show: true },
			categories: props.categories
				? props.categories
				: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
		},
		yaxis: { show: false, labels: { show: true } },
		stroke: { curve: 'smooth' },
		plotOptions: { area: { fillTo: 'end' } },
	};

	return (
		<ResponsiveContainerChart>
			<Chart
				options={options}
				series={props.series}
				type='area'
				width={'100%'}
				height={280}></Chart>
		</ResponsiveContainerChart>
	);
}
