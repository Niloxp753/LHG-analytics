/** @format */

import {
	decodeSessionUserHeader,
	SESSION_USER_HEADER,
} from '@/lib/session-user';
import SessionHydrationEffects from '@/providers/session-hydration-effects';
import { headers } from 'next/headers';

export default async function DashboardSessionHydrator() {
	const requestHeaders = await headers();
	const initialUser = decodeSessionUserHeader(
		requestHeaders.get(SESSION_USER_HEADER),
	);

	return <SessionHydrationEffects initialUser={initialUser} />;
}
