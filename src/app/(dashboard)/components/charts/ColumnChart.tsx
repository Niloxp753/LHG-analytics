/** @format */

'use client';
import Chart from 'react-apexcharts';
import ResponsiveContainerChart from '../ResponsiveContainerChart';

interface ColumnChartProps {
	title: string;
	categories?: string[];
	data?: any[];
	series?: ApexAxisChartSeries | ApexNonAxisChartSeries | undefined;
}

export default function ColumnChart(props: ColumnChartProps) {
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

		markers: {
			size: 0,
			colors: ['#a78bfa', '#60a5fa', '#818cf8', '#e879f9'],
			hover: { size: 0 },
			strokeWidth: 0,
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
				columnWidth: 28,
				borderRadiusApplication: 'end',
				horizontal: false,
				rangeBarOverlap: true,
			},
		},
	};

	return (
		<ResponsiveContainerChart>
			<Chart
				options={options}
				series={props.series}
				type='bar'
				width={'100%'}
				height={240}></Chart>
		</ResponsiveContainerChart>
	);
}
