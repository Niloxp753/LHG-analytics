/** @format */

'use client';
import Chart from 'react-apexcharts';
import ResponsiveContainerChart from '../ResponsiveContainerChart';

interface AreaChartsApexProps {
	series?: ApexAxisChartSeries | ApexNonAxisChartSeries | undefined;
	categories?: string[];
	money?: boolean;
	percent?: boolean;
	id?: string;
	title?: string;
	legend?: string;
	width?: string;
}

export default function AreaChartsApex(props: AreaChartsApexProps) {
	const options: ApexCharts.ApexOptions = {
		chart: {
			id: props.id,
			type: 'area',
			foreColor: '#fafafa',
			stacked: false,
			zoom: {
				enabled: false,
			},
			toolbar: {
				autoSelected: 'pan',
				show: false,
			},
		},
		title: {
			text: props.title,
			style: { fontSize: '16px', fontWeight: '600' },
		},
		legend: {
			show: true,
			showForSingleSeries: true,
			position: 'top',
			horizontalAlign: 'left',
			fontSize: '16px',
			fontWeight: 'bold',
			onItemHover: { highlightDataSeries: true },
			onItemClick: { toggleDataSeries: false },
		},
		grid: { show: false },
		dataLabels: {
			style: {
				colors: ['#7c3aed', '#2563eb', '#4f46e5', '#c026d3', '#e11d48'],
			},
			enabled: false,
			formatter: (val: number | string) =>
				`${val.toLocaleString('pt-BR', {
					style: 'currency',
					currency: 'BRL',
				})}`,
			distributed: false,
			background: {
				enabled: true,
				borderRadius: 4,
				padding: 4,
				borderWidth: 1,
			},
		},
		tooltip: {
			y: {
				formatter: (val: number | string) =>
					`${
						props.money
							? val.toLocaleString('pt-BR', {
									style: 'currency',
									currency: 'BRL',
							  })
							: props.percent
							? val + '%'
							: val
					} `,
			},
		},
		colors: ['#a78bfa', '#60a5fa', '#818cf8', '#e879f9'],
		fill: {
			gradient: {
				opacityFrom: 0.8,
				opacityTo: 0.2,
			},
		},

		markers: {
			size: 3,
			colors: [
				'#7c3aed',
				'#2563eb',
				'#4f46e5',
				'#c026d3',
				'#e11d48',
				'#ea580c',
				'#ca8a04',
				'#65a30d',
			],
			hover: { size: 5 },
			strokeWidth: 1,
		},

		xaxis: {
			type: 'category',
			crosshairs: {
				show: true,
			},

			axisBorder: { show: true },
			categories: props.categories,
		},
		yaxis: {
			show: false,
		},
		stroke: { curve: 'smooth' },
		plotOptions: { area: { fillTo: 'origin' } },
		responsive: [
			{
				breakpoint: 580,
				options: {
					chart: {
						height: 400,
						width: '100%',
					},
					xaxis: {
						tickPlacement: 'between',
						labels: {
							trim: false,
							style: { fontSize: '8px' },
							hideOverlappingLabels: true,
							rotate: 0,
						},
					},
				},
			},
			{
				breakpoint: 3000,
				options: {
					chart: {
						height: 280,
						width: props.width ? props.width : '100%',
					},
					xaxis: {
						offsetX: 8,
						tickPlacement: 'between',
						labels: {
							trim: false,
							style: { fontSize: '9px' },
							hideOverlappingLabels: true,
							rotate: -45,
						},
					},
				},
			},
		],
	};

	return (
		<ResponsiveContainerChart>
			<Chart
				options={options}
				series={props.series}
				type='area'
				height={280}></Chart>
		</ResponsiveContainerChart>
	);
}
