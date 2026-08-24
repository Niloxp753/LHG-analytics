import { expect, type Page } from '@playwright/test';

export type ObserverState = {
	callback: (entries: Array<{ isIntersecting: boolean }>) => void;
	element?: HTMLElement;
	disconnected: boolean;
	options?: IntersectionObserverInit;
};

export async function installIntersectionObserverStub(page: Page) {
	await page.addInitScript(() => {
		const state: { instances: ObserverState[] } = { instances: [] };
		class StubIntersectionObserver {
			private readonly instance: ObserverState;

			constructor(
				callback: ObserverState['callback'],
				options?: IntersectionObserverInit,
			) {
				this.instance = {
					callback,
					disconnected: false,
					options,
				};
				state.instances.push(this.instance);
			}

			observe(element: Element) {
				this.instance.element = element as HTMLElement;
			}

			disconnect() {
				this.instance.disconnected = true;
			}

			unobserve() {}
		}

		Object.defineProperty(window, 'IntersectionObserver', {
			configurable: true,
			writable: true,
			value: StubIntersectionObserver,
		});
		Object.defineProperty(window, '__nearViewportTest', {
			configurable: true,
			value: state,
		});
	});
}

export async function waitForObservedChart(page: Page, name: string) {
	await expect
		.poll(() =>
			page.evaluate((chartName) => {
				const instances = (
					window as typeof window & {
						__nearViewportTest: { instances: ObserverState[] };
					}
				).__nearViewportTest.instances;
				return instances.some(
					(item) =>
						item.element?.getAttribute('data-chart-deferred') === chartName &&
						(item.element?.getClientRects().length ?? 0) > 0,
				);
			}, name),
		)
		.toBe(true);
}

export async function triggerChartIntersection(
	page: Page,
	name: string,
	isIntersecting: boolean,
) {
	await waitForObservedChart(page, name);
	await page.evaluate(
		({ chartName, intersecting }) => {
			const instances = (
				window as typeof window & {
					__nearViewportTest: { instances: ObserverState[] };
				}
			).__nearViewportTest.instances;
			const instance = instances.find(
				(item) =>
					item.element?.getAttribute('data-chart-deferred') === chartName &&
					(item.element?.getClientRects().length ?? 0) > 0,
			);
			if (!instance) throw new Error(`Observer for "${chartName}" was not found`);
			instance.callback([{ isIntersecting: intersecting }]);
		},
		{ chartName: name, intersecting: isIntersecting },
	);
}

export async function readObservedChartState(page: Page, name: string) {
	await waitForObservedChart(page, name);
	return page.evaluate((chartName) => {
		const instances = (
			window as typeof window & {
				__nearViewportTest: { instances: ObserverState[] };
			}
		).__nearViewportTest.instances;
		const instance = instances.find(
			(item) =>
				item.element?.getAttribute('data-chart-deferred') === chartName &&
				(item.element?.getClientRects().length ?? 0) > 0,
		);
		if (!instance) throw new Error(`Observer for "${chartName}" was not found`);
		return {
			disconnected: instance.disconnected,
			rootMargin: instance.options?.rootMargin,
			threshold: instance.options?.threshold,
		};
	}, name);
}
