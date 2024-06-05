/** @format */

'use client';
import Chart from 'react-apexcharts';
import ResponsiveContainerChart from '@/app/(dashboard)/components/ResponsiveContainerChart';

export default function PieChartsApex() {
	const options: ApexCharts.ApexOptions = {
		chart: {
			id: 'pie-chart',
			foreColor: '#000',
			dropShadow: {
				enabled: false,
			},
			zoom: {
				enabled: false,
			},
			width: 380,
			type: 'pie',
			toolbar: {
				show: false,
			},
		},
		legend: {
			width: 360,
			position: 'bottom',
			fontSize: '11px',
			labels: {
				colors: '#f4f4f5',
			},
			onItemHover: { highlightDataSeries: false },
			onItemClick: { toggleDataSeries: false },
			containerMargin: {
				left: 0,
				top: 2,
			},
		},
		title: {
			align: 'center',
			text: 'Faturamento por unidade',
			style: { color: '#f4f4f5', fontSize: '16px', fontWeight: 'normal' },
			margin: 8,
		},

		colors: ['#a78bfa', '#fef08a', '#bbf7d0', '#fda4af'],
		labels: ['Lush Ipiranga', 'Lush Guarujá', 'Tout', 'Andar de Cima'],
		stroke: { show: false },
		dataLabels: {
			enabled: true,
			style: {
				colors: ['#7c3aed', '#ca8a04', '#16a34a', '#be123c'],
				fontWeight: 'semibold',
				fontSize: '14px',
			},
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
							color: '#3f3f46',
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
				height={316}
				series={[40, 20, 45, 25]}
				type='pie'></Chart>
		</ResponsiveContainerChart>
	);
}
