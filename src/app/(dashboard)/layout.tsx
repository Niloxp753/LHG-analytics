/** @format */

import SessionStoreProvider from '@/providers/session-store-provider';
import { Suspense, type PropsWithChildren } from 'react';
import DashboardSessionHydrator from './_components/dashboard-session-hydrator';
import DashboardShell from './_components/dashboard-shell';

export default function DashLayout({
	children,
}: Readonly<PropsWithChildren>) {
	return (
		<SessionStoreProvider>
			<Suspense fallback={null}>
				<DashboardSessionHydrator />
			</Suspense>
			<DashboardShell>{children}</DashboardShell>
		</SessionStoreProvider>
	);
}
