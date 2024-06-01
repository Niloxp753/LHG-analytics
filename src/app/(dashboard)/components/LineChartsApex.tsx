/** @format */
'use client';

import React from 'react';
import Chart from 'react-apexcharts';
import ResponsiveContainerChart from './ResponsiveContainerChart';

interface LineChartsApexProps {
	title: string;
	legend01: string;
	legend02?: string;
}

const options: ApexCharts.ApexOptions = {
	chart: {
		id: 'line-bar',
		stacked: true,
		width: '100%',
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
		position: 'top',
		horizontalAlign: 'left',
		fontSize: '16px',
		onItemHover: { highlightDataSeries: true },
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
		background: { enabled: false },
	},
	colors: ['#a78bfa', '#fef08a'],
	fill: {
		gradient: {
			opacityFrom: 0.5,
			opacityTo: 0.2,
			gradientToColors: ['#a78bfa', '#2e1065'],
		},
	},
	markers: {
		size: 4,
		colors: ['#7c3aed', '#eab308'],
		strokeWidth: 2,
	},

	xaxis: {
		axisBorder: { show: false },
		categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
	},
	yaxis: { show: false, labels: { show: true } },
	stroke: { curve: 'smooth' },
	plotOptions: { area: { fillTo: 'end' } },
};

export default function LineChartsApex(props: LineChartsApexProps) {
	const series: ApexAxisChartSeries | ApexNonAxisChartSeries = [
		{
			name: props.legend01,
			data: [30, 40, 45, 50, 49, 60, 70, 91],
			type: 'line',
		},
		{
			name: props.legend02,
			data: [30, 40, 45, 50, 49, 60, 70, 91],
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
				height={300}
			/>
		</ResponsiveContainerChart>
	);
}
