export function resolveHelpdeskTokenUrl(rawBaseUrl: string | undefined): string {
	const baseUrl = rawBaseUrl?.trim().replace(/\/+$/, '');
	if (!baseUrl) {
		throw new Error('LHG Help Desk: NEXT_PUBLIC_AUTH_URL não configurada');
	}
	return `${baseUrl}/api/helpdesk/token`;
}

export async function getHelpdeskToken(
	rawBaseUrl = process.env.NEXT_PUBLIC_AUTH_URL,
	fetcher: typeof fetch = fetch,
): Promise<string> {
	const response = await fetcher(resolveHelpdeskTokenUrl(rawBaseUrl), {
		method: 'GET',
		credentials: 'include',
		cache: 'no-store',
	});
	if (!response.ok) {
		throw new Error(`LHG Help Desk: token ${response.status}`);
	}
	const payload: unknown = await response.json();
	if (
		typeof payload !== 'object' || payload === null ||
		!('token' in payload) || typeof payload.token !== 'string' ||
		!payload.token.trim()
	) {
		throw new Error('LHG Help Desk: resposta de token inválida');
	}
	return payload.token;
}
