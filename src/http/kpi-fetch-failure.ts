import 'server-only';

import { redirect } from 'next/navigation';
import { FetchFailedError } from './conditional-cache';
import { logFetchFailed } from './logging';

export function handleKpiFetchFailure(error: FetchFailedError): null {
	if (error.status === 401) {
		redirect('/api/session/logout');
	}

	logFetchFailed(error);
	return null;
}
