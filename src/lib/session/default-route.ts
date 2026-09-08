import {
	canAccessModule,
	getDefaultModule,
	isAdmin,
	MODULE_TO_PATH,
	normalizeUnit,
	UNIT_TO_SLUG,
} from '@/lib/access-control';
import { normalizeRangeTag } from '@/lib/date-range';
import type { SessionUser } from '@/lib/session-user';

export function getDefaultSessionHref(
	user: Pick<SessionUser, 'role' | 'unit'>,
	rangeTag?: string | null,
): string {
	const set = normalizeRangeTag(rangeTag);
	if (isAdmin(user)) {
		return `/general?menu=general&set=${set}`;
	}

	const moduleKey = getDefaultModule(user.role ?? '');
	const unit = normalizeUnit(user.unit);
	const unitSlug = unit ? UNIT_TO_SLUG[unit as keyof typeof UNIT_TO_SLUG] : null;
	if (!moduleKey || !unitSlug || !canAccessModule(user, moduleKey)) {
		return '/login';
	}

	const modulePath = MODULE_TO_PATH[moduleKey];
	return `/${modulePath}/${unitSlug}?menu=${modulePath}&set=${set}`;
}
