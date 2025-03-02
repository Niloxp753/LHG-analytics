/** @format */

import 'server-only';

import ky from 'ky';

export const maxDuration = 60;

export const api = ky.create({
	prefixUrl: process.env.BACKEND_ENDPOINT_IPIRANGA,
	timeout: 60000,
	retry: 3,
	mode: 'cors',
	cache: 'no-store',
});

export const api_lapa = ky.create({
	prefixUrl: process.env.BACKEND_ENDPOINT_LAPA,
	timeout: 60000,
	retry: 3,
	mode: 'cors',
	cache: 'no-store',
});
