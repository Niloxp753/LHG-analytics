/** @format */

'use client';
import Chart from 'react-apexcharts';
import ResponsiveContainerChart from '@/app/(dashboard)/components/ResponsiveContainerChart';

export default function PieChartsApex() {
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
			itemMargin: { vertical: 6 },
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
				height={316}
				series={[40, 20, 45, 25]}
				type='donut'></Chart>
		</ResponsiveContainerChart>
	);
}
