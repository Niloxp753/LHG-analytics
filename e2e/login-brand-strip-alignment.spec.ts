import { expect, test } from '@playwright/test';

const LOGO_ALTS = [
	'Logo Lush',
	'Logo Tout',
	'Logo Andar de Cima',
	'Logo LIV',
] as const;

test('desktop login keeps the brand strip vertically centered', async ({
	page,
}) => {
	await page.goto('/login');

	const centers: number[] = [];

	for (const alt of LOGO_ALTS) {
		const logoWrapper = page.getByAltText(alt).locator('..');

		await expect(logoWrapper).toBeVisible();

		const box = await logoWrapper.boundingBox();
		expect(box, `${alt} should expose a measurable box`).not.toBeNull();

		centers.push(box!.y + box!.height / 2);
	}

	const referenceCenter = centers[0];

	for (const [index, center] of centers.entries()) {
		expect(
			Math.abs(center - referenceCenter),
			`${LOGO_ALTS[index]} should share the same vertical center`,
		).toBeLessThanOrEqual(2);
	}
});
