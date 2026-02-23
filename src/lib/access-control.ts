/** @format */

export const ADMIN_ROLE = 'ADMIN' as const;
export const ADMIN_UNIT = 'LHG' as const;

export const ROLE_VALUES = [
	'GERENTE_GERAL',
	'GERENTE_FINANCEIRO',
	'GERENTE_OPERACIONAL',
	'GERENTE_RESERVAS',
	'GERENTE_RESTAURANTE',
	ADMIN_ROLE,
] as const;

export const UNIT_VALUES = [
	'LUSH_IPIRANGA',
	'LUSH_LAPA',
	'ANDAR_DE_CIMA',
	'TOUT',
	'LIV',
] as const;

export const UNIT_VALUES_WITH_ADMIN = [...UNIT_VALUES, ADMIN_UNIT] as const;

export type Role = (typeof ROLE_VALUES)[number];
export type Unit = (typeof UNIT_VALUES)[number];
export type AccessUnit = (typeof UNIT_VALUES_WITH_ADMIN)[number];

export type AccessUser =
	| {
			role?: Role | string | null;
			unit?: AccessUnit | string | null;
	  }
	| null
	| undefined;

export const ROLE_LABELS: Record<Role, string> = {
	ADMIN: 'Administrador',
	GERENTE_GERAL: 'Gerente Geral',
	GERENTE_FINANCEIRO: 'Gerente Financeiro',
	GERENTE_OPERACIONAL: 'Gerente Operacional',
	GERENTE_RESERVAS: 'Gerente de Reservas',
	GERENTE_RESTAURANTE: 'Gerente de Restaurante',
};

export const UNIT_LABELS: Record<AccessUnit, string> = {
	LUSH_IPIRANGA: 'Lush Ipiranga',
	LUSH_LAPA: 'Lush Lapa',
	ANDAR_DE_CIMA: 'Andar de Cima',
	TOUT: 'Tout',
	LIV: 'LIV',
	LHG: 'LHG',
};

export const ROLE_OPTIONS = ROLE_VALUES.map((value) => ({
	value,
	label: ROLE_LABELS[value],
}));

export const UNIT_OPTIONS = UNIT_VALUES_WITH_ADMIN.map((value) => ({
	value,
	label: UNIT_LABELS[value],
}));

const ROLE_LABEL_TO_VALUE = Object.fromEntries(
	Object.entries(ROLE_LABELS).map(([value, label]) => [
		label.trim().toLowerCase(),
		value,
	]),
) as Record<string, Role>;

const UNIT_LABEL_TO_VALUE = Object.fromEntries(
	Object.entries(UNIT_LABELS).map(([value, label]) => [
		label.trim().toLowerCase(),
		value,
	]),
) as Record<string, AccessUnit>;

const LEGACY_ROLE_MAP: Record<string, Role> = {
	MANAGER: 'GERENTE_GERAL',
	GERENTE_DE_RESERVAS: 'GERENTE_RESERVAS',
	GERENTE_DE_RESTAURANTE: 'GERENTE_RESTAURANTE',
};

const LEGACY_UNIT_MAP: Record<string, AccessUnit> = {
	'1': 'LUSH_IPIRANGA',
	'2': 'LUSH_LAPA',
	'3': 'ANDAR_DE_CIMA',
	'4': 'TOUT',
	'5': 'LIV',
	TOUT_CAMPINAS: 'TOUT',
};

export function normalizeRole(value?: string | null): Role | null {
	if (!value) {
		return null;
	}

	if (ROLE_VALUES.includes(value as Role)) {
		return value as Role;
	}

	const labelMatch = ROLE_LABEL_TO_VALUE[value.trim().toLowerCase()];
	if (labelMatch) {
		return labelMatch;
	}

	const legacy = LEGACY_ROLE_MAP[value];
	if (legacy) {
		return legacy;
	}

	const normalized = value.trim().toUpperCase().replace(/\s+/g, '_');
	const legacyNormalized = LEGACY_ROLE_MAP[normalized];
	if (legacyNormalized) {
		return legacyNormalized;
	}
	if (ROLE_VALUES.includes(normalized as Role)) {
		return normalized as Role;
	}

	return null;
}

export function normalizeUnit(value?: string | null): AccessUnit | null {
	if (!value) {
		return null;
	}

	if (UNIT_VALUES_WITH_ADMIN.includes(value as AccessUnit)) {
		return value as AccessUnit;
	}

	const labelMatch = UNIT_LABEL_TO_VALUE[value.trim().toLowerCase()];
	if (labelMatch) {
		return labelMatch;
	}

	const legacy = LEGACY_UNIT_MAP[value];
	if (legacy) {
		return legacy;
	}

	const normalized = value.trim().toUpperCase().replace(/\s+/g, '_');
	const legacyNormalized = LEGACY_UNIT_MAP[normalized];
	if (legacyNormalized) {
		return legacyNormalized;
	}
	if (UNIT_VALUES_WITH_ADMIN.includes(normalized as AccessUnit)) {
		return normalized as AccessUnit;
	}

	return null;
}

export function getRoleLabel(value?: string | null): string {
	const normalized = normalizeRole(value);
	return normalized ? ROLE_LABELS[normalized] : value ?? '';
}

export function getUnitLabel(value?: string | null): string {
	const normalized = normalizeUnit(value);
	return normalized ? UNIT_LABELS[normalized] : value ?? '';
}

export const UNIT_SLUG_TO_UNIT = {
	lushipiranga: 'LUSH_IPIRANGA',
	lushlapa: 'LUSH_LAPA',
	tout: 'TOUT',
	andardecima: 'ANDAR_DE_CIMA',
	liv: 'LIV',
} as const;

export const UNIT_TO_SLUG = {
	LUSH_IPIRANGA: 'lushipiranga',
	LUSH_LAPA: 'lushlapa',
	TOUT: 'tout',
	ANDAR_DE_CIMA: 'andardecima',
	LIV: 'liv',
} as const;

export const PATH_TO_MODULE = {
	general: 'company',
	operational: 'governance',
	reservations: 'bookings',
	restaurant: 'restaurant',
} as const;

export const MODULE_TO_PATH = {
	company: 'general',
	governance: 'operational',
	bookings: 'reservations',
	restaurant: 'restaurant',
} as const;

export type ModuleKey = (typeof PATH_TO_MODULE)[keyof typeof PATH_TO_MODULE];

export function isAdmin(user: AccessUser): boolean {
	return (
		normalizeRole(user?.role ?? null) === ADMIN_ROLE &&
		normalizeUnit(user?.unit ?? null) === ADMIN_UNIT
	);
}

export function canAccessModule(user: AccessUser, module: ModuleKey): boolean {
	if (!user) {
		return false;
	}

	if (isAdmin(user)) {
		return true;
	}

	const role = normalizeRole(user.role);
	const unit = normalizeUnit(user.unit);

	// Regra especial: a unidade LIV é acessível apenas para ADMIN e GERENTE_GERAL (da própria unidade).
	if (unit === 'LIV') {
		return role === 'GERENTE_GERAL';
	}

	switch (role) {
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

export function getDefaultModule(role: string): ModuleKey | null {
	const normalizedRole = normalizeRole(role);

	switch (normalizedRole) {
		case 'GERENTE_GERAL':
		case 'GERENTE_FINANCEIRO':
			return 'company';
		case 'GERENTE_OPERACIONAL':
			return 'governance';
		case 'GERENTE_RESERVAS':
			return 'bookings';
		case 'GERENTE_RESTAURANTE':
			return 'restaurant';
		default:
			return null;
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
	const userUnit = normalizeUnit(user.unit);
	if (!userUnit || userUnit !== targetUnit) {
		return false;
	}

	return canAccessModule(user, moduleKey);
}

export function getUserUnitSlug(user: AccessUser): string | null {
	const unit = normalizeUnit(user?.unit ?? null);
	if (!unit) {
		return null;
	}

	return UNIT_TO_SLUG[unit as keyof typeof UNIT_TO_SLUG] ?? null;
}

export function buildModuleHref(
	user: AccessUser,
	moduleKey: ModuleKey,
	preSet: string,
): string | null {
	if (!user) {
		return null;
	}

	if (!canAccessModule(user, moduleKey)) {
		return null;
	}

	const modulePath = MODULE_TO_PATH[moduleKey];
	if (!modulePath) {
		return null;
	}

	const search = `menu=${modulePath}&set=${preSet}`;

	if (isAdmin(user)) {
		return `/${modulePath}?${search}`;
	}

	const unitSlug = getUserUnitSlug(user);
	if (!unitSlug) {
		return null;
	}

	return `/${modulePath}/${unitSlug}?${search}`;
}
