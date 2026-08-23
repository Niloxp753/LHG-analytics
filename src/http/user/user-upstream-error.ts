import 'server-only';

export class UserUpstreamError extends Error {
	readonly cause: unknown;

	constructor(cause: unknown) {
		super('User service request failed');
		this.name = 'UserUpstreamError';
		this.cause = cause;
	}
}
