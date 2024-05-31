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

export default function LineChartsApex(props: LineChartsApexProps) {
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
		legend: { position: 'top' },
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
			size: 5,
			colors: ['#7c3aed', '#eab308'],
			strokeWidth: 3,
		},
		title: {
			text: props.title,
			style: { color: '#fafafa', fontSize: '20px' },
		},
		xaxis: {
			axisBorder: { show: false },
			categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
		},
		yaxis: { show: false, labels: { show: true } },
		stroke: { curve: 'smooth' },
		plotOptions: { area: { fillTo: 'end' } },
	};

	const series = [
		{ name: props.legend01, data: [30, 40, 45, 50, 49, 60, 70, 91] },
		{ name: props.legend02, data: [30, 40, 45, 50, 49, 60, 70, 91] },
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
