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
}

export default function PieChartsApex(props: PieChartsApexProps) {
	const options: ApexCharts.ApexOptions = {
		chart: {
			id: 'donut-chart',
			foreColor: '#000',
			dropShadow: {
				enabled: false,
			},
			zoom: {
				enabled: false,
			},
			width: 380,
			type: 'donut',
			toolbar: {
				show: false,
			},
		},
		legend: {
			itemMargin: { vertical: 8, horizontal: 28 },
			position: 'bottom',
			fontSize: '14px',
			labels: {
				colors: '#f4f4f5',
			},
			onItemHover: { highlightDataSeries: false },
			onItemClick: { toggleDataSeries: false },
		},
		title: {
			align: 'center',
			text: props.title ? props.title : 'Faturamento por unidade',
			style: { color: '#f4f4f5', fontSize: '16px', fontWeight: 'normal' },
			margin: 8,
		},

		colors: props.colors
			? props.colors
			: ['#a78bfa', '#fef08a', '#bbf7d0', '#fda4af', '#38bdf8'],
		labels: props.labels
			? props.labels
			: ['Lush Ipiranga', 'Lush Guarujá', 'Tout Campinas', 'Andar de Cima'],
		stroke: { show: false },
		dataLabels: {
			enabled: true,
			style: {
				colors: props.dataLabelColors
					? props.dataLabelColors
					: ['#7c3aed', '#ca8a04', '#16a34a', '#be123c', '#1d4ed8'],
				fontWeight: 'semibold',
				fontSize: '12px',
			},
			dropShadow: { enabled: true },
			background: {
				enabled: true,
				padding: 12,
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
		<ResponsiveContainerChart>
			<Chart
				options={options}
				width={'100%'}
				height={290}
				series={props.data ? props.data : [40, 20, 45, 25]}
				type='donut'></Chart>
		</ResponsiveContainerChart>
	);
}
