/** @format */

'use client';
import Chart from 'react-apexcharts';
import ResponsiveContainerChart from './ResponsiveContainerChart';

export default function BarChartsApex() {
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
		legend: {
			showForSingleSeries: true,
			position: 'top',
			horizontalAlign: 'left',
			fontSize: '16px',
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
			enabled: true,
			distributed: true,
			background: {
				enabled: true,
				borderRadius: 4,
				padding: 12,
				borderWidth: 1,
			},
			style: { colors: ['#5b21b6'] },
		},
		colors: ['#a78bfa'],
		fill: {
			gradient: {
				opacityFrom: 0.5,
				opacityTo: 0.2,
				gradientToColors: ['#a78bfa', '#2e1065'],
			},
		},

		markers: {
			size: 0,
			colors: ['#a78bfa'],
			hover: { size: 0 },
			strokeWidth: 0,
		},

		xaxis: {
			type: 'category',
			axisBorder: { show: true },
			categories: [
				'Lush',
				'Lush Pop',
				'Lush Hidro',
				'Lush Lounge',
				'Lush Spa',
				'Lush Cine',
				'Lush Splash',
				'Lush Spa Splash',
				'Casa Lush',
			],
		},
		yaxis: { show: true, labels: { show: true } },
		stroke: { curve: 'smooth' },
		plotOptions: {
			bar: {
				borderRadius: 4,
				borderRadiusApplication: 'end',
				horizontal: true,
			},
		},
	};

	const series: ApexAxisChartSeries | ApexNonAxisChartSeries = [
		{
			name: 'Faturamento',
			data: [30, 40, 45, 50, 49, 60, 70, 91, 120],
			type: 'bar',
		},
	];
	return (
		<ResponsiveContainerChart>
			<Chart
				options={options}
				series={series}
				type='bar'
				width={'100%'}
				height={600}></Chart>
		</ResponsiveContainerChart>
	);
}
