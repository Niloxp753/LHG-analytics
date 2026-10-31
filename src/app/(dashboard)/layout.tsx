/** @format */

import SessionStoreProvider from '@/providers/session-store-provider';
import { type PropsWithChildren } from 'react';
import DashboardShell from './_components/dashboard-shell';
import HelpdeskWidget from './_components/helpdesk-widget';

export default function DashLayout({
	children,
}: Readonly<PropsWithChildren>) {
	return (
		<>
			<SessionStoreProvider>
				<DashboardShell>{children}</DashboardShell>
			</SessionStoreProvider>
			<HelpdeskWidget />
		</>
	);
}
