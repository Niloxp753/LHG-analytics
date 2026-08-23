import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import SessionDalTestProbe from './session-dal-test-probe';

export default function SessionDalTestPage() {
	if (process.env.PLAYWRIGHT_MOCKS !== 'true') {
		notFound();
	}

	return (
		<Suspense fallback={<main>session-probe-loading</main>}>
			<SessionDalTestProbe />
		</Suspense>
	);
}
