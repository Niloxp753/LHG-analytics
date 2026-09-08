'use client';

import type { PropsWithChildren, RefObject } from 'react';
import ChartMountPlaceholder from './chart-mount-placeholder';
import { useNearViewport } from './use-near-viewport';

export type DeferredChartMountProps = PropsWithChildren<{
	eager?: boolean;
	minHeight: number;
	name: string;
	rootMargin?: string;
}>;

export default function DeferredChartMount({
	children,
	eager = false,
	minHeight,
	name,
	rootMargin,
}: DeferredChartMountProps) {
	const { ref, isNearViewport } = useNearViewport({
		disabled: eager,
		rootMargin,
	});
	const mounted = eager || isNearViewport;

	return (
		<div
			ref={ref as RefObject<HTMLDivElement>}
			className='w-full'
			data-chart-deferred={name}
			data-chart-state={mounted ? 'mounted' : 'placeholder'}
			style={mounted ? undefined : { minHeight }}
			aria-busy={mounted ? undefined : true}>
			{mounted ? children : (
				<ChartMountPlaceholder minHeight={minHeight} name={name} />
			)}
		</div>
	);
}
