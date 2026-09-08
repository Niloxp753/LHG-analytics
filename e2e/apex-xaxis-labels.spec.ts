import { expect, test } from '@playwright/test';
import path from 'node:path';
import { resolveXAxisLabelPolicy } from '../src/app/(dashboard)/_components/charts/chart-density';

test('renders sampled date labels on a real ApexCharts area chart', async ({
	page,
}) => {
	const categories = Array.from(
		{ length: 21 },
		(_, index) => `${String(index + 1).padStart(2, '0')}/08/2026`,
	);
	const policy = resolveXAxisLabelPolicy(categories, 11);

	await page.setContent('<div id="chart"></div>');
	await page.addScriptTag({
		path: path.resolve('node_modules/apexcharts/dist/apexcharts.min.js'),
	});
	await page.evaluate(
		async ({ chartCategories, tickAmount }) => {
			const ApexCharts = (
				window as typeof window & {
					ApexCharts: new (
						element: Element,
						options: ApexCharts.ApexOptions,
					) => { render: () => Promise<void> };
				}
			).ApexCharts;
			const chart = new ApexCharts(document.querySelector('#chart')!, {
				chart: { animations: { enabled: false }, type: 'area' },
				series: [
					{
						data: chartCategories.map((_, index) => index),
						name: 'Taxa de ocupação',
					},
				],
				xaxis: {
					categories: chartCategories,
					tickAmount,
					type: 'category',
				},
			});
			await chart.render();
		},
		{ chartCategories: categories, tickAmount: policy.tickAmount },
	);

	const renderedLabels = await page
		.locator('.apexcharts-xaxis-texts-g text tspan')
		.allTextContents();
	expect(renderedLabels.filter(Boolean)).toEqual([
		'01/08/2026',
		'03/08/2026',
		'05/08/2026',
		'07/08/2026',
		'09/08/2026',
		'11/08/2026',
		'13/08/2026',
		'15/08/2026',
		'17/08/2026',
		'19/08/2026',
		'21/08/2026',
	]);
});
