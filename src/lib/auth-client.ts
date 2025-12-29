/** @format */

'use client';

export type AuthApiResult<T> = {
	ok: boolean;
	status: number;
	data: T | null;
	error: unknown | null;
};

type JsonValue =
	| null
	| boolean
	| number
	| string
	| JsonValue[]
	| { [key: string]: JsonValue };

const baseUrl = process.env.NEXT_PUBLIC_AUTH_URL;

async function readBody(resp: Response): Promise<JsonValue | string | null> {
	const contentType = resp.headers.get('content-type') ?? '';
	if (contentType.includes('application/json')) {
		return (await resp.json()) as JsonValue;
	}
	const text = await resp.text();
	return text || null;
}

export async function loginWithCookies(input: {
	email: string;
	password: string;
}): Promise<AuthApiResult<JsonValue | string>> {
	const resp = await fetch(`${baseUrl}/api/login`, {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
		},
		credentials: 'include',
		body: JSON.stringify(input),
	});

	const payload = await readBody(resp);

	return {
		ok: resp.ok,
		status: resp.status,
		data: resp.ok ? payload : null,
		error: resp.ok ? null : payload,
	};
}

export async function logoutWithCookies(): Promise<
	AuthApiResult<JsonValue | string>
> {
	const resp = await fetch(`${baseUrl}/api/logout`, {
		method: 'POST',
		credentials: 'include',
	});

	const payload = await readBody(resp);

	return {
		ok: resp.ok,
		status: resp.status,
		data: resp.ok ? payload : null,
		error: resp.ok ? null : payload,
	};
}
