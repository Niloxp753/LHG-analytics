/** @format */

'use client';

import type { SessionUser } from '@/lib/session-user';
import { useSessionStore } from '@/stores/session-store';
import { useEffect } from 'react';

const REFRESH_INTERVAL_MS = 45 * 60 * 1000;

type SessionHydrationEffectsProps = {
	initialUser: SessionUser | null;
};

export default function SessionHydrationEffects({
	initialUser,
}: SessionHydrationEffectsProps) {
	const hydrate = useSessionStore((state) => state.hydrate);
	const refresh = useSessionStore((state) => state.refresh);
	const setUser = useSessionStore((state) => state.setUser);
	const status = useSessionStore((state) => state.status);

	useEffect(() => {
		if (initialUser) {
			setUser(initialUser);
			return;
		}

		void hydrate();
	}, [hydrate, initialUser, setUser]);

	useEffect(() => {
		const intervalId = window.setInterval(() => {
			if (status === 'authed') {
				void refresh();
			}
		}, REFRESH_INTERVAL_MS);

		return () => {
			window.clearInterval(intervalId);
		};
	}, [refresh, status]);

	return null;
}
