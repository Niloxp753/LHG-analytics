/** @format */

export const RETRYABLE_STATUS = new Set([502, 503, 504]);

export function isRetryableStatus(status: number): boolean {
	return RETRYABLE_STATUS.has(status);
}

export function isRetryableError(error: unknown): boolean {
	return error instanceof Error && error.name === 'TypeError';
}
