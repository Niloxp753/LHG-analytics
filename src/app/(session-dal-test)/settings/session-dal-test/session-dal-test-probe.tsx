import {
	getOptionalSessionUser,
	readSession,
	requireDashboardSession,
} from '@/lib/session/session-dal';
import { requireAuthorizedDashboardSession } from '@/lib/session/session-authorization';
import { SessionUnavailableError } from '@/lib/session/session-errors';
import { cookies } from 'next/headers';

const PROBE_MODE_COOKIE = 'lhg_session_probe_mode';
const ALLOWED_USER_KEYS = ['cpf', 'email', 'name', 'role', 'unit'];

export default async function SessionDalTestProbe() {
	const [first, second] = await Promise.all([readSession(), readSession()]);
	const optionalUser = await getOptionalSessionUser();
	const mode = (await cookies()).get(PROBE_MODE_COOKIE)?.value;
	let guard = 'not-run';

	if (mode === 'require') {
		const user = await requireDashboardSession();
		guard = `required:${user.email}`;
	}

	if (mode === 'authorize') {
		const user = await requireAuthorizedDashboardSession();
		guard = `authorized:${user.email}`;
	}

	if (mode === 'unavailable-error') {
		try {
			await requireDashboardSession();
			guard = 'unexpected-success';
		} catch (error) {
			guard =
				error instanceof SessionUnavailableError
					? 'SessionUnavailableError'
					: 'unexpected-error';
		}
	}

	const authenticatedUser =
		first.status === 'authenticated' ? first.user : null;
	const sanitized = authenticatedUser
		? Object.keys(authenticatedUser).every((key) =>
				ALLOWED_USER_KEYS.includes(key),
			)
		: true;
	const userKeys = authenticatedUser
		? Object.keys(authenticatedUser).sort().join(',')
		: 'none';

	return (
		<main>
			<p data-testid='first-status'>{first.status}</p>
			<p data-testid='second-status'>{second.status}</p>
			<p data-testid='email'>{authenticatedUser?.email ?? 'none'}</p>
			<p data-testid='optional-email'>{optionalUser?.email ?? 'none'}</p>
			<p data-testid='can-refresh'>
				{first.status === 'unauthenticated'
					? String(first.canRefresh)
					: 'false'}
			</p>
			<p data-testid='sanitized'>{String(sanitized)}</p>
			<p data-testid='user-keys'>{userKeys}</p>
			<p data-testid='guard'>{guard}</p>
		</main>
	);
}
