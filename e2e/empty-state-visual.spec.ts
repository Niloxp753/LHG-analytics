import { expect, test } from '@playwright/test';

import EmptyState from '../src/app/(dashboard)/_components/EmptyState';

type RenderedElement = {
	children: RenderedElement[];
	props: Record<string, unknown>;
	type: string;
};

type PlaywrightJsxElement = {
	__pw_type: 'jsx';
	props?: Record<string, unknown>;
	type: string | ((props: Record<string, unknown>) => unknown);
};

function renderElement(node: unknown): RenderedElement[] {
	if (node === null || typeof node === 'undefined' || typeof node === 'boolean') {
		return [];
	}

	if (Array.isArray(node)) {
		return node.flatMap(renderElement);
	}

	if (typeof node !== 'object' || !('__pw_type' in node)) {
		return [];
	}

	const element = node as PlaywrightJsxElement;
	const props = element.props ?? {};

	if (typeof element.type === 'function') {
		return renderElement(element.type(props));
	}

	return [
		{
			type: element.type,
			props,
			children: renderElement(props.children),
		},
	];
}

function findSlot(
	elements: RenderedElement[],
	slot: string,
): RenderedElement | undefined {
	for (const element of elements) {
		if (element.props['data-slot'] === slot) {
			return element;
		}

		const nested = findSlot(element.children, slot);
		if (nested) {
			return nested;
		}
	}

	return undefined;
}

function getSlotClasses(elements: RenderedElement[], slot: string) {
	const element = findSlot(elements, slot);
	if (!element) {
		throw new Error(`Slot ${slot} não encontrado`);
	}

	return String(element.props.className).split(' ');
}

test('o estado vazio usa fundo transparente e texto destructive', () => {
	const elements = renderElement(
		EmptyState({ title: 'Performance de Supervisores' }),
	);

	const containerClasses = getSlotClasses(elements, 'empty');
	const titleClasses = getSlotClasses(elements, 'empty-title');
	const descriptionClasses = getSlotClasses(elements, 'empty-description');

	expect(containerClasses).toContain('bg-transparent');
	expect(containerClasses).not.toContain('bg-muted/30');
	expect(titleClasses).toContain('text-destructive');
	expect(descriptionClasses).toContain('text-destructive');
});
