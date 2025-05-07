/** @format */

// middleware.ts

import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
	function middleware(request) {
		const cpf = request.nextauth.token?.cpf as string | undefined;
		const pathname = request.nextUrl.pathname;

		const CPF_RESTRITO = '359.267.460-94';
		const ROTA_PERMITIDA = '/general/andardecima';

		if (cpf === CPF_RESTRITO) {
			const isRotaPermitida = pathname === ROTA_PERMITIDA;

			if (!isRotaPermitida) {
				const url = request.nextUrl.clone();
				url.pathname = ROTA_PERMITIDA;
				return NextResponse.redirect(url);
			}
		}

		return NextResponse.next();
	},
	{
		callbacks: {
			authorized: ({ token }) => !!token,
		},
	},
);

export const config = {
	matcher: [
		'/',
		'/general', // captura /general e TODOS os sub‑caminhos
		'/settings',
		'/not-found',
		'/nps',
		'/operational',
		'/restaurant',
	],
};
