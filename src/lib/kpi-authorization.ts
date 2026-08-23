import 'server-only';

import {
	canAccessModule,
	isAdmin,
	normalizeUnit,
	type ModuleKey,
} from '@/lib/access-control';
import {
	DASHBOARD_COMPANY_TO_UNIT,
	resolveDashboardCompanyKey,
	type DashboardCompanyKey,
} from '@/lib/dashboard-company';
import { requireDashboardSession } from '@/lib/session/session-dal';

export type KpiAccessRequest =
	| { module: ModuleKey; consolidated: true; company?: never }
	| {
			module: ModuleKey;
			consolidated?: false;
			company?: DashboardCompanyKey;
	  };

export type KpiAuthorizationFailure = 'forbidden' | 'unknown-company';

export class KpiAuthorizationError extends Error {
	readonly authorizationFailure: KpiAuthorizationFailure;

	constructor(authorizationFailure: KpiAuthorizationFailure) {
		super(
			authorizationFailure === 'unknown-company'
				? 'Unknown dashboard company'
				: 'KPI scope access is forbidden',
		);
		this.name = 'KpiAuthorizationError';
		this.authorizationFailure = authorizationFailure;
	}
}

export async function requireKpiAccess(
	request: KpiAccessRequest,
): Promise<void> {
	const user = await requireDashboardSession();

	if (request.consolidated === true) {
		if (!isAdmin(user)) {
			throw new KpiAuthorizationError('forbidden');
		}
		return;
	}

	let company: DashboardCompanyKey;
	try {
		company = resolveDashboardCompanyKey(request.company);
	} catch {
		throw new KpiAuthorizationError('unknown-company');
	}

	if (isAdmin(user)) {
		return;
	}

	const targetUnit = DASHBOARD_COMPANY_TO_UNIT[company];
	if (
		normalizeUnit(user.unit) !== targetUnit ||
		!canAccessModule(user, request.module)
	) {
		throw new KpiAuthorizationError('forbidden');
	}
}
