/** @format */

'use client';
import Chart from 'react-apexcharts';
import ResponsiveContainerChart from '../ResponsiveContainerChart';

interface AreaChartsApexProps {
	serie01?: number[];
	serie02?: number[];
	legend01?: string;
	legend02?: string;
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
			distributed: false,
			background: {
				enabled: true,
				borderRadius: 4,
				padding: 12,
				borderWidth: 1,
				foreColor: '#fafafa',
			},
			style: { colors: ['#6d28d9', '#16a34a'] },
		},
		colors: ['#a78bfa', '#bbf7d0'],
		fill: {
			gradient: {
				opacityFrom: 0.8,
				opacityTo: 0.2,
			},
		},

		markers: {
			size: 0,
			colors: ['#a78bfa'],
			hover: { size: 0 },
			strokeWidth: 0,
		},

		xaxis: {
			axisBorder: { show: true },
			categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
		},
		yaxis: { show: false, labels: { show: true } },
		stroke: { curve: 'smooth' },
		plotOptions: { area: { fillTo: 'end' } },
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
	];
	return (
		<ResponsiveContainerChart>
			<Chart
				options={options}
				series={series}
				type='area'
				width={'100%'}
				height={270}></Chart>
		</ResponsiveContainerChart>
	);
}
