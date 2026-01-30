/** @format */

'use client';
import Chart from 'react-apexcharts';
import ResponsiveContainerChart from '../ResponsiveContainerChart';

interface AreaChartsApexProps {
	serie01?: number[];
	serie02?: number[];
	legend01?: string;
	legend02?: string;
	serie03?: number[];
	serie04?: number[];
	legend03?: string;
	legend04?: string;
	title?: string;
}

export default function LineChartsApexUnity(props: AreaChartsApexProps) {
	const options: ApexCharts.ApexOptions = {
		chart: {
			id: 'line-bar',
			stacked: false,
			type: 'area',
			foreColor: '#fafafa',
			height: 248,
			zoom: {
				enabled: false,
			},
			toolbar: {
				show: false,
			},
		},
		legend: {
			showForSingleSeries: true,
			position: 'bottom',
			horizontalAlign: 'center',
			fontSize: '12x',
			fontWeight: 'bold',
			onItemHover: { highlightDataSeries: true },
			onItemClick: { toggleDataSeries: false },
			offsetY: 10,
			itemMargin: { horizontal: 12, vertical: 5 },
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
			enabled: false,
			distributed: false,
			background: {
				enabled: true,
				borderRadius: 4,
				padding: 12,
				borderWidth: 1,
				foreColor: '#fafafa',
			},
			style: {
				colors: ['#7c3aed', '#2563eb', '#4f46e5', '#c026d3', '#e11d48'],
			},
		},
		colors: ['#a78bfa', '#60a5fa', '#818cf8', '#e879f9'],
		title: {
			text: props.title,
			style: { fontWeight: 'bold', fontSize: '16px' },
		},
		fill: {
			gradient: {
				opacityFrom: 0.5,
				opacityTo: 0.2,
			},
		},

		markers: {
			size: 5,
			colors: ['#a78bfa', '#60a5fa', '#818cf8', '#e879f9'],
			hover: { size: 8 },
			strokeWidth: 1,
		},

		xaxis: {
			type: 'category',
			axisBorder: { show: true },
			categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
		},
		yaxis: { show: false, labels: { show: true } },
		stroke: { curve: 'smooth', width: 2 },
		plotOptions: { area: { fillTo: 'end' } },
		responsive: [
			{
				breakpoint: 580,
				options: {
					chart: {
						height: 440,
					},
				},
			},
			{
				breakpoint: 3000,
				options: {
					chart: {
						height: 248,
					},
				},
			},
		],
	};

	const series: ApexAxisChartSeries | ApexNonAxisChartSeries = [
		{
			name: props.legend01 || 'Faturamento',
			data: props.serie01 || [30, 40, 45, 50, 49, 60, 70, 91],
			type: 'area',
		},

		{
			name: props.legend02,
			data: props.serie02 || [],
			type: 'area',
		},
		{
			name: props.legend03,
			data: props.serie03 || [],
			type: 'area',
		},
		{
			name: props.legend04,
			data: props.serie04 || [],
			type: 'area',
		},
	];
	return (
		<ResponsiveContainerChart height='280'>
			<Chart
				options={options}
				series={series}
				type='area'
				width={'100%'}
				height={248}></Chart>
		</ResponsiveContainerChart>
	);
}
