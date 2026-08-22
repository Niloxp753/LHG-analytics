'use client';

import dynamic from 'next/dynamic';
import { useDashboardViewport } from '@/hooks/use-dashboard-viewport';
import DashboardChromeFallback from './dashboard-chrome-fallback';

const DesktopDashboardChrome = dynamic(
	() => import('./desktop-dashboard-chrome'),
	{ ssr: false, loading: DashboardChromeFallback },
);

const MobileDashboardChrome = dynamic(
	() => import('./mobile-dashboard-chrome'),
	{ ssr: false, loading: DashboardChromeFallback },
);

export default function ResponsiveDashboardChrome() {
	const viewport = useDashboardViewport();

	if (viewport === 'pending') return <DashboardChromeFallback />;

	return viewport === 'desktop' ? (
		<DesktopDashboardChrome />
	) : (
		<MobileDashboardChrome />
	);
}
