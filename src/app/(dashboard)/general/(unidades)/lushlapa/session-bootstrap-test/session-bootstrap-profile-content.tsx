import { requireAuthorizedDashboardSession } from '@/lib/session/session-authorization';
import { cookies } from 'next/headers';
import SessionBootstrapProfileProbe from './session-bootstrap-profile-probe';

const PROBE_ROOT = '/general/lushlapa/session-bootstrap-test';
const FORCE_PAGE_ERROR_COOKIE = 'lhg_force_session_page_error';

type SessionBootstrapProfileContentProps = {
	step: 'one' | 'two';
};

export default async function SessionBootstrapProfileContent({
	step,
}: SessionBootstrapProfileContentProps) {
	const cookieStore = await cookies();
	if (cookieStore.get(FORCE_PAGE_ERROR_COOKIE)?.value === '1') {
		throw new Error('Forced dashboard page error');
	}

	const pageUser = await requireAuthorizedDashboardSession();
	const nextStep = step === 'one' ? 'two' : 'one';
	const nextHref = `${PROBE_ROOT}/${nextStep}?menu=general&set=ultimos_7_dias`;
	const queryHref = `${PROBE_ROOT}/${step}?menu=general&set=ultimos_7_dias&navigation=two`;

	return (
		<SessionBootstrapProfileProbe
			nextHref={nextHref}
			queryHref={queryHref}
			serverProfileName={pageUser.name ?? 'none'}
		/>
	);
}
