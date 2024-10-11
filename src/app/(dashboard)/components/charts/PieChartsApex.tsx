/** @format */

'use client';
import Chart from 'react-apexcharts';
import ResponsiveContainerChart from '@/app/(dashboard)/components/ResponsiveContainerChart';

interface PieChartsApexProps {
	title?: string;
	labels?: string[];
	data?: any[];
	colors?: string[];
	dataLabelColors?: string[];
	height?: number;
}

export default function PieChartsApex(props: PieChartsApexProps) {
	const options: ApexCharts.ApexOptions = {
		chart: {
			id: 'donut-chart',
			stacked: false,
			foreColor: '#000',
			dropShadow: {
				enabled: false,
			},
			zoom: {
				enabled: false,
			},
			type: 'donut',

			toolbar: {
				show: false,
			},
		},
		legend: {
			position: 'right',
			itemMargin: { vertical: 4 },
			fontSize: '12px',
			fontWeight: 'bold',
			offsetY: 40,
			labels: {
				colors: '#f4f4f5',
			},
			onItemHover: { highlightDataSeries: false },
			onItemClick: { toggleDataSeries: false },
		},
		title: {
			align: 'left',
			text: props.title ? props.title : 'Faturamento por unidade',
			style: { color: '#f4f4f5', fontSize: '16px', fontWeight: 'bold' },
			margin: 8,
		},

		colors: ['#a78bfa', '#60a5fa', '#818cf8', '#e879f9', '#fb7185'],
		labels: props.labels
			? props.labels
			: ['Lush Ipiranga', 'Lush Guarujá', 'Tout Campinas', 'Andar de Cima'],
		stroke: { show: false },
		dataLabels: {
			enabled: true,
			textAnchor: 'end',
			style: {
				colors: ['#7c3aed', '#2563eb', '#4f46e5', '#c026d3', '#e11d48'],
				fontWeight: 'semibold',
				fontSize: '12px',
			},
			dropShadow: { enabled: true },
			background: {
				enabled: true,
				padding: 8,
				borderRadius: 8,
				dropShadow: {
					enabled: false,
				},
			},
		},
		tooltip: {
			enabled: true,
			fillSeriesColor: false,
		},
		plotOptions: {
			pie: {
				expandOnClick: true,
				offsetY: 10,
				donut: {
					labels: {
						value: {
							show: true,
							fontSize: '32px',
							color: '#fafafa',
							fontWeight: 'bold',
						},
						name: {
							show: false,
						},
						show: true,
						total: {
							show: true,
							fontSize: '16px',
							color: '#52525b',
							fontWeight: 'bold',
							showAlways: false,
						},
					},
				},
			},
		},
	};

	return (
		<ResponsiveContainerChart height='280'>
			<Chart
				options={options}
				width={'100%'}
				height={248}
				series={props.data ? props.data : [40, 20, 45, 25]}
				type='donut'></Chart>
		</ResponsiveContainerChart>
	);
}
