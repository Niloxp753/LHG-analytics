/** @format */

'use client';

import { useSessionStore } from '@/stores/session-store';
import React, { useEffect } from 'react';

const REFRESH_INTERVAL_MS = 45 * 60 * 1000;

export default function SessionHydratorProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const hydrate = useSessionStore((s) => s.hydrate);
	const refresh = useSessionStore((s) => s.refresh);

	useEffect(() => {
		void hydrate();
	}, [hydrate]);

	useEffect(() => {
		const intervalId = window.setInterval(() => {
			if (useSessionStore.getState().status !== 'authed') {
				return;
			}
			void refresh();
		}, REFRESH_INTERVAL_MS);

		return () => {
			window.clearInterval(intervalId);
		};
	}, [refresh]);

	return <>{children}</>;
}
