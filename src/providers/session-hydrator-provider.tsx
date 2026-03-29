/** @format */

'use client';

import type { SessionUser } from '@/lib/session-user';
import {
	createSessionStore,
	SessionStoreContext,
	useSessionStore,
} from '@/stores/session-store';
import React, { useEffect, useState } from 'react';

const REFRESH_INTERVAL_MS = 45 * 60 * 1000;

export default function SessionHydratorProvider({
	children,
	initialUser = null,
	autoHydrate = true,
}: {
	children: React.ReactNode;
	initialUser?: SessionUser | null;
	autoHydrate?: boolean;
}) {
	const [store] = useState(() => createSessionStore(initialUser));

	return (
		<SessionStoreContext.Provider value={store}>
			<SessionHydrationEffects
				initialUser={initialUser}
				autoHydrate={autoHydrate}
			/>
			{children}
		</SessionStoreContext.Provider>
	);
}

function SessionHydrationEffects({
	initialUser,
	autoHydrate,
}: {
	initialUser: SessionUser | null;
	autoHydrate: boolean;
}) {
	const hydrate = useSessionStore((s) => s.hydrate);
	const refresh = useSessionStore((s) => s.refresh);
	const status = useSessionStore((s) => s.status);

	useEffect(() => {
		if (!autoHydrate || initialUser) {
			return;
		}
		void hydrate();
	}, [autoHydrate, hydrate, initialUser]);

	useEffect(() => {
		const intervalId = window.setInterval(() => {
			if (status !== 'authed') {
				return;
			}
			void refresh();
		}, REFRESH_INTERVAL_MS);

		return () => {
			window.clearInterval(intervalId);
		};
	}, [refresh, status]);

	return null;
}
