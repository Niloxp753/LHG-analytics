/** @format */

import { FetchFailedError } from './conditional-cache';

export async function readJsonResponse<T>(
	response: Response,
	context: string,
): Promise<T> {
	const contentType = response.headers.get('content-type') ?? '';

	if (!contentType.toLowerCase().includes('application/json')) {
		throw new FetchFailedError(
			context,
			response.status,
			`Unexpected content-type: ${contentType || 'unknown'}`,
		);
	}

	try {
		return (await response.json()) as T;
	} catch {
		throw new FetchFailedError(
			context,
			response.status,
			'Invalid JSON response',
		);
	}
}
