/** @format */

'use client';

import { createSessionStore, SessionStoreContext } from '@/stores/session-store';
import { useState, type PropsWithChildren } from 'react';

export default function SessionStoreProvider({ children }: PropsWithChildren) {
	const [store] = useState(() => createSessionStore());

	return (
		<SessionStoreContext.Provider value={store}>
			{children}
		</SessionStoreContext.Provider>
	);
}
