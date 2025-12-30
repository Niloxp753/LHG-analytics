/** @format */

'use client';

import { useSessionStore } from '@/stores/session-store';
import React, { useEffect } from 'react';

export default function SessionHydratorProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const hydrate = useSessionStore((s) => s.hydrate);

	useEffect(() => {
		void hydrate();
	}, [hydrate]);

	return <>{children}</>;
}
