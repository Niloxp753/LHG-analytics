/** @format */

'use client';
import Chart from 'react-apexcharts';
import ResponsiveContainerChart from '../ResponsiveContainerChart';

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
						  })
						: val
				}`,
			distributed: true,
			background: {
				enabled: true,
				borderRadius: 4,
				padding: 12,
				borderWidth: 1,
			},
			style: {
				colors: props.dataLabelColors,
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

		markers: {
			size: 0,
			colors: ['#a78bfa'],
			hover: { size: 0 },
			strokeWidth: 0,
		},

		xaxis: {
			type: 'category',
			axisBorder: { show: true },
			categories: props.categories,
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
				height={620}></Chart>
		</ResponsiveContainerChart>
	);
}
