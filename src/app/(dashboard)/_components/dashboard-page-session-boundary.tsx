import { Suspense, type ReactNode } from 'react';
import DashboardPageSessionGuard from './dashboard-page-session-guard';

type DashboardPageSessionBoundaryProps = {
	children: ReactNode;
};

export default function DashboardPageSessionBoundary({
	children,
}: DashboardPageSessionBoundaryProps) {
	return (
		<Suspense fallback={null}>
			<DashboardPageSessionGuard>{children}</DashboardPageSessionGuard>
		</Suspense>
	);
}
