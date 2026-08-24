import { requireAuthorizedDashboardSession } from '@/lib/session/session-authorization';
import SessionHydrationEffects from '@/providers/session-hydration-effects';
import type { ReactNode } from 'react';

type DashboardPageSessionGuardProps = {
	children: ReactNode;
};

export default async function DashboardPageSessionGuard({
	children,
}: DashboardPageSessionGuardProps) {
	const user = await requireAuthorizedDashboardSession();

	return (
		<>
			<SessionHydrationEffects initialUser={user} />
			{children}
		</>
	);
}
