import type { Unit } from '@/lib/access-control';

export const DASHBOARD_COMPANY_TO_UNIT = {
	ipiranga: 'LUSH_IPIRANGA',
	lapa: 'LUSH_LAPA',
	andar_de_cima: 'ANDAR_DE_CIMA',
	tout: 'TOUT',
	liv: 'LIV',
	altana: 'ALTANA',
	getan_garavelo: 'GETAN_GARAVELO',
	getan_pq_oeste: 'GETAN_PQ_OESTE',
} as const satisfies Record<string, Unit>;

export type DashboardCompanyKey = keyof typeof DASHBOARD_COMPANY_TO_UNIT;

export function isDashboardCompanyKey(
	value: unknown,
): value is DashboardCompanyKey {
	return (
		typeof value === 'string' &&
		Object.prototype.hasOwnProperty.call(DASHBOARD_COMPANY_TO_UNIT, value)
	);
}

export function resolveDashboardCompanyKey(
	value: unknown = undefined,
): DashboardCompanyKey {
	if (value === undefined) {
		return 'ipiranga';
	}

	if (!isDashboardCompanyKey(value)) {
		throw new Error('Unknown dashboard company');
	}

	return value;
}
