/** @format */

// middleware.ts

import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
	const pathname = request.nextUrl.pathname;
	const accessToken = request.cookies.get('access_token')?.value;

	if (pathname === '/login') {
		if (!accessToken) {
			return NextResponse.next();
		}

		const url = request.nextUrl.clone();
		const preSet = url.searchParams.get('set') ?? '7days';
		url.pathname = '/general';
		url.search = '';
		url.searchParams.set('menu', 'general');
		url.searchParams.set('set', preSet);
		return NextResponse.redirect(url);
	}

	if (!accessToken) {
		const url = request.nextUrl.clone();
		url.pathname = '/login';
		return NextResponse.redirect(url);
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		'/general/:path*',
		'/settings/:path*',
		'/nps/:path*',
		'/operational/:path*',
		'/restaurant/:path*',
		'/reservations/:path*',
		'/login',
	],
};
