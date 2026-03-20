/** @format */

import 'server-only';

export class FetchFailedError extends Error {
	status?: number;
	statusText?: string;

	constructor(message: string, status?: number, statusText?: string) {
		super(message);
		this.name = 'FetchFailedError';
		this.status = status;
		this.statusText = statusText;
	}
}
