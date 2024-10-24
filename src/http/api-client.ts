/** @format */

import ky from 'ky';

export const api = ky.create({
	prefixUrl: process.env.BACKEND_ENDPOINT,
});
