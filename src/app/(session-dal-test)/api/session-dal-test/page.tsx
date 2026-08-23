import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import SessionDalTestProbe from '../../settings/session-dal-test/session-dal-test-probe';

export default function SessionDalApiTestPage() {
	if (process.env.PLAYWRIGHT_MOCKS !== 'true') {
		notFound();
	}

	return (
		<Suspense fallback={<main>session-probe-loading</main>}>
			<SessionDalTestProbe />
		</Suspense>
	);
}
