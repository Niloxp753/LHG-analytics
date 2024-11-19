/** @format */

import ky from 'ky';

export const maxDuration = 60;

export const api = ky.create({
	prefixUrl: process.env.BACKEND_ENDPOINT,
	timeout: 214748364,
	retry: 3,
	mode: 'cors',
	cache: 'no-store',
});
