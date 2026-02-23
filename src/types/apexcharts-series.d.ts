import type { ApexOptions } from 'apexcharts';

declare global {
	type ApexAxisChartSeries = Exclude<
		NonNullable<ApexOptions['series']>,
		number[]
	>;
	type ApexNonAxisChartSeries = Extract<
		NonNullable<ApexOptions['series']>,
		number[]
	>;
}

export {};
