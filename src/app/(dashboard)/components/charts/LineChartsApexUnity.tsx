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
			type: 'line',
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
			position: 'bottom',
			horizontalAlign: 'center',
			fontSize: '14x',
			onItemHover: { highlightDataSeries: true },
			onItemClick: { toggleDataSeries: false },
			itemMargin: {
				vertical: 8,
			},
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
			style: { colors: ['#7c3aed', '#ca8a04', '#16a34a', '#be123c'] },
		},
		colors: ['#a78bfa', '#fef08a', '#bbf7d0', '#fda4af'],
		title: {
			text: props.title,
			style: { fontWeight: 'normal', fontSize: '18px' },
		},
		markers: {
			size: 5,
			colors: ['#7c3aed', '#ca8a04', '#16a34a', '#be123c'],
			hover: { size: 8 },
			strokeWidth: 1,
		},

		xaxis: {
			axisBorder: { show: true },
			categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
		},
		yaxis: { show: false, labels: { show: true } },
		stroke: { curve: 'straight', width: 2 },
		plotOptions: { area: { fillTo: 'end' } },
	};

	const series: ApexAxisChartSeries | ApexNonAxisChartSeries = [
		{
			name: props.legend01 || 'Faturamento',
			data: props.serie01 || [30, 40, 45, 50, 49, 60, 70, 91],
			type: 'line',
		},

		{
			name: props.legend02,
			data: props.serie02 || [],
			type: 'line',
		},
		{
			name: props.legend03,
			data: props.serie03 || [],
			type: 'line',
		},
		{
			name: props.legend04,
			data: props.serie04 || [],
			type: 'line',
		},
	];
	return (
		<ResponsiveContainerChart>
			<Chart
				options={options}
				series={series}
				type='line'
				width={'100%'}
				height={270}></Chart>
		</ResponsiveContainerChart>
	);
}
