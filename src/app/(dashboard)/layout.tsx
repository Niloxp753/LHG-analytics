/** @format */

import SessionStoreProvider from '@/providers/session-store-provider';
import { type PropsWithChildren } from 'react';
import DashboardShell from './_components/dashboard-shell';

export default function DashLayout({
	children,
}: Readonly<PropsWithChildren>) {
	return (
		<SessionStoreProvider>
			<DashboardShell>{children}</DashboardShell>
		</SessionStoreProvider>
	);
}
