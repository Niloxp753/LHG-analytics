/** @format */

export type AccessUser =
	| {
			role?: string | null;
			unit?: string | null;
	  }
	| null
	| undefined;

const UNIT_SLUG_TO_UNIT = {
	lushipiranga: 'LUSH_IPIRANGA',
	lushlapa: 'LUSH_LAPA',
	tout: 'TOUT',
	andardecima: 'ANDAR_DE_CIMA',
} as const;

const PATH_TO_MODULE = {
	general: 'company',
	operational: 'governance',
	reservations: 'bookings',
	restaurant: 'restaurant',
} as const;

export type ModuleKey = (typeof PATH_TO_MODULE)[keyof typeof PATH_TO_MODULE];

export function isAdmin(user: AccessUser): boolean {
	return user?.role === 'ADMIN' && user?.unit === 'LHG';
}

export function canAccessModule(user: AccessUser, module: ModuleKey): boolean {
	if (!user) {
		return false;
	}

	if (isAdmin(user)) {
		return true;
	}

	switch (user.role) {
		case 'GERENTE_GERAL':
			return true;
		case 'GERENTE_FINANCEIRO':
			return module === 'company';
		case 'GERENTE_OPERACIONAL':
			return module === 'governance';
		case 'GERENTE_RESERVAS':
			return module === 'bookings';
		case 'GERENTE_RESTAURANTE':
			return module === 'restaurant';
		default:
			return false;
	}
}

function getPathname(href: string): string {
	const clean = href.split('?')[0] ?? '';
	return clean.startsWith('/') ? clean : `/${clean}`;
}

export function canAccessRoute(user: AccessUser, href: string): boolean {
	if (!user) {
		return false;
	}

	if (isAdmin(user)) {
		return true;
	}

	const path = getPathname(href);
	if (path === '/settings') {
		return false;
	}

	const segments = path.split('/').filter(Boolean);
	const modulePath = segments[0];
	if (!modulePath || !(modulePath in PATH_TO_MODULE)) {
		return true;
	}

	const moduleKey = PATH_TO_MODULE[modulePath as keyof typeof PATH_TO_MODULE];
	if (segments.length === 1) {
		return false;
	}

	const unitSlug = segments[1];
	if (!unitSlug || !(unitSlug in UNIT_SLUG_TO_UNIT)) {
		return false;
	}

	const targetUnit =
		UNIT_SLUG_TO_UNIT[unitSlug as keyof typeof UNIT_SLUG_TO_UNIT];
	if (user.unit !== targetUnit) {
		return false;
	}

	return canAccessModule(user, moduleKey);
}
