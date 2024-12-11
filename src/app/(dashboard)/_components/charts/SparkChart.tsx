/** @format */

'use client';
import Chart from 'react-apexcharts';

interface AreaChartsApexProps {
	serie?: number[];
	legend?: string;
}

export default function SparkChart(props: AreaChartsApexProps) {
	const options: ApexCharts.ApexOptions = {
		chart: {
			type: 'area',

			sparkline: {
				enabled: true,
			},
			zoom: {
				enabled: false,
			},
			toolbar: {
				autoSelected: 'pan',
				show: false,
			},
		},
		tooltip: {
			enabled: false,
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
			show: false,
			yaxis: {
				lines: {
					show: false,
				},
			},
		},

		dataLabels: {
			enabled: false,
		},
		colors: ['#a78bfa'],
		fill: {
			gradient: {
				opacityFrom: 0.8,
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
			axisBorder: { show: false },
			categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
		},
		yaxis: { show: false, min: 0 },
		stroke: { curve: 'straight' },
		plotOptions: { area: { fillTo: 'end' } },
	};

	const series: ApexAxisChartSeries = [
		{
			name: props.legend || 'Faturamento',
			data: props.serie || [60, 40, 45, 60, 49, 60, 70, 91],
			type: 'area',
		},
	];
	return (
		<>
			<Chart
				options={options}
				series={series}
				type='area'
				width={'100%'}
				height={60}></Chart>
		</>
	);
}
