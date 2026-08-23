import { getDefaultSessionHref } from '@/lib/session/default-route';
import { requireDashboardSession } from '@/lib/session/session-dal';
import { redirect } from 'next/navigation';

export const instant = false;

type RootPageProps = {
	searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function RootPage({ searchParams }: RootPageProps) {
	const params = await searchParams;
	const requestedSet = Array.isArray(params.set) ? params.set[0] : params.set;
	const user = await requireDashboardSession();

	redirect(getDefaultSessionHref(user, requestedSet));
}
