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
	legend?: string;
}

export default function AreaChartsApex(props: AreaChartsApexProps) {
	const options: ApexCharts.ApexOptions = {
		chart: {
			id: props.id,
			type: 'area',
			foreColor: '#fafafa',
			stacked: false,
			width: '100%',
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
			formatter: (val: number) =>
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
				formatter: (val: number) =>
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
			size: 5,
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
			hover: { size: 8 },
			strokeWidth: 1,
		},

		xaxis: {
			axisBorder: { show: true },
			labels: {
				rotate: 270,
				show: true,
				hideOverlappingLabels: false,
				style: { fontSize: '10px', fontWeight: 'light' },
				trim: false,
				offsetX: 3,
			},
			categories: props.categories
				? props.categories
				: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
		},
		yaxis: {
			show: true,
			labels: { show: false, padding: 400, style: { fontSize: '8px' } },
			tickAmount: 4,
		},
		stroke: { curve: 'smooth' },
		plotOptions: { area: { fillTo: 'origin' } },
		responsive: [
			{
				breakpoint: 580,
				options: {
					chart: {
						height: 400,
					},
				},
			},
			{
				breakpoint: 3000,
				options: {
					chart: {
						height: 280,
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
				width={'100%'}
				height={280}></Chart>
		</ResponsiveContainerChart>
	);
}
