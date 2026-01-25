/** @format */

import 'server-only';

import ky from 'ky';

export const maxDuration = 60;

export const api = ky.create({
	prefixUrl: process.env.BACKEND_ENDPOINT_IPIRANGA,
	timeout: 60000,
	retry: 3,
	mode: 'cors',
});

export const api_lapa = ky.create({
	prefixUrl: process.env.BACKEND_ENDPOINT_LAPA,
	timeout: 60000,
	retry: 3,
	mode: 'cors',
});

export const api_andar_de_cima = ky.create({
	prefixUrl: process.env.BACKEND_ENDPOINT_ANDAR_DE_CIMA,
	timeout: 60000,
	retry: 3,
	mode: 'cors',
});

export const api_tout = ky.create({
	prefixUrl: process.env.BACKEND_ENDPOINT_TOUT,
	timeout: 60000,
	retry: 3,
	mode: 'cors',
});

export const auth_api = ky.create({
	prefixUrl:
		process.env.BACKEND_AUTH_ENDPOINT ??
		'https://analytics-dev.lhgmoteis.com.br/auth/api',
	timeout: 60000,
	retry: 3,
	mode: 'cors',
});
