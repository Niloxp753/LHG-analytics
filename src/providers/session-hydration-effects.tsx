/** @format */

'use client';

import type { SessionUser } from '@/lib/session-user';
import { useSessionStore } from '@/stores/session-store';
import { useLayoutEffect } from 'react';

type SessionHydrationEffectsProps = {
	initialUser: SessionUser;
};

export default function SessionHydrationEffects({
	initialUser,
}: SessionHydrationEffectsProps) {
	const setUser = useSessionStore((state) => state.setUser);

	useLayoutEffect(() => {
		setUser(initialUser);
	}, [initialUser, setUser]);

	return null;
}
