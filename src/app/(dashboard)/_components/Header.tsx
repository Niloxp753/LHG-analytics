/** @format */

'use client';

import dynamic from 'next/dynamic';
import { useDashboardViewport } from '@/hooks/use-dashboard-viewport';
import HeaderFallback from './header-fallback';

const HeaderClient = dynamic(() => import('./HeaderClient'), {
	ssr: false,
	loading: HeaderFallback,
});

export default function Header() {
	const viewport = useDashboardViewport();

	if (viewport === 'pending') return <HeaderFallback />;
	if (viewport === 'mobile') return null;

	return <HeaderClient />;
}
