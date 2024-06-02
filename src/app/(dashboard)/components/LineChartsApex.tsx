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
		series: [
			{
				name: props.legend01,
				data: [60, 50, 45, 90, 79, 80, 50, 61],
			},
			{
				name: props.legend02,
				data: [30, 40, 55, 70, 69, 60, 70, 91],
			},
		],
		chart: {
			id: 'line-bar',
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
		markers: {
			size: 4,
			colors: ['#7c3aed', '#eab308'],
			strokeWidth: 2,
		},

		xaxis: {
			type: 'category',
			axisBorder: { show: true },
			categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
		},
		yaxis: { show: false, labels: { show: true } },
		stroke: { curve: 'smooth' },
		plotOptions: { area: { fillTo: 'end' } },
	};

	return (
		<ResponsiveContainerChart>
			<Chart
				options={options}
				series={options.series}
				type='line'
				width={'100%'}
				height={240}
			/>
		</ResponsiveContainerChart>
	);
}
