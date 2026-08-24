'use client';

import { useEffect, useRef, useState, type RefObject } from 'react';

export type NearViewportOptions = {
	disabled?: boolean;
	rootMargin?: string;
};

export function useNearViewport(
	options: NearViewportOptions = {},
): { ref: RefObject<HTMLDivElement | null>; isNearViewport: boolean } {
	const { disabled = false, rootMargin = '600px 0px' } = options;
	const ref = useRef<HTMLDivElement | null>(null);
	const [isNearViewport, setIsNearViewport] = useState(disabled);

	useEffect(() => {
		if (disabled || isNearViewport) {
			return;
		}

		if (typeof IntersectionObserver === 'undefined') {
			const fallbackTimer = window.setTimeout(() => {
				setIsNearViewport(true);
			}, 0);
			return () => window.clearTimeout(fallbackTimer);
		}

		const element = ref.current;
		if (!element) {
			return;
		}

		const observer = new IntersectionObserver(
			([entry]) => {
				if (!entry?.isIntersecting) {
					return;
				}

				setIsNearViewport(true);
				observer.disconnect();
			},
			{ rootMargin, threshold: 0.01 },
		);

		observer.observe(element);

		return () => observer.disconnect();
	}, [disabled, isNearViewport, rootMargin]);

	return { ref, isNearViewport };
}
