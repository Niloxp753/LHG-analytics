export class SessionUnavailableError extends Error {
	constructor() {
		super('Session service is temporarily unavailable');
		this.name = 'SessionUnavailableError';
	}
}
