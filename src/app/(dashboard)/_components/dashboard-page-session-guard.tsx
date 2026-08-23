import { requireAuthorizedDashboardSession } from '@/lib/session/session-authorization';
import { SessionUnavailableError } from '@/lib/session/session-errors';
import type { SessionUser } from '@/lib/session-user';
import SessionHydrationEffects from '@/providers/session-hydration-effects';
import { unstable_rethrow } from 'next/navigation';
import type { ReactNode } from 'react';
import DashboardSessionUnavailable from './dashboard-session-unavailable';

type DashboardPageSessionGuardProps = {
	children: ReactNode;
};

export default async function DashboardPageSessionGuard({
	children,
}: DashboardPageSessionGuardProps) {
	let user: SessionUser;

	try {
		user = await requireAuthorizedDashboardSession();
	} catch (error) {
		unstable_rethrow(error);

		if (error instanceof SessionUnavailableError) {
			return <DashboardSessionUnavailable />;
		}

		throw error;
	}

	return (
		<>
			<SessionHydrationEffects initialUser={user} />
			{children}
		</>
	);
}
