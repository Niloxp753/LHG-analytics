/** @format */
'use client';

import React from 'react';
import Chart from 'react-apexcharts';
import ResponsiveContainerChart from './ResponsiveContainerChart';

export default function AreaChartsApex() {
	const options: ApexCharts.ApexOptions = {
		chart: {
			id: 'area-bar',
			stacked: true,
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
		legend: {},
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
			size: 5,
			colors: ['#a78bfa'],

			strokeWidth: 3,
		},
		title: {
			text: 'Faturamento',
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

	const series = [{ name: 'Vendas', data: [30, 40, 45, 50, 49, 60, 70, 91] }];

	return (
		<ResponsiveContainerChart>
			<Chart
				options={options}
				series={series}
				type='area'
				width={'100%'}
				height={300}
			/>
		</ResponsiveContainerChart>
	);
}
