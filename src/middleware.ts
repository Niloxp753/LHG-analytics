/** @format */

// middleware.ts

import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
	const pathname = request.nextUrl.pathname;
	const accessToken = request.cookies.get('access_token')?.value;

	if (pathname === '/') {
		const url = request.nextUrl.clone();
		if (!accessToken) {
			url.pathname = '/login';
			return NextResponse.redirect(url);
		}

		const preSet = url.searchParams.get('set') ?? '7days';
		url.pathname = '/general';
		url.search = '';
		url.searchParams.set('menu', 'general');
		url.searchParams.set('set', preSet);
		return NextResponse.redirect(url);
	}

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
	// Protect all pages (no public routes), excluding Next internals and static assets.
	matcher: [
		'/((?!api|_next|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|css|js|map|txt|xml|woff|woff2|ttf|otf)$).*)',
	],
};
