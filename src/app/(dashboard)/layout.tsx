/** @format */

import BackBtn from '@/components/back-btn';
import {
	decodeSessionUserHeader,
	SESSION_USER_HEADER,
} from '@/lib/session-user';
import SessionHydratorProvider from '@/providers/session-hydrator-provider';
import { headers } from 'next/headers';
import React, { Suspense } from 'react';
import SidebarMenu from './_components/SidebarMenu';
import FilterMobile from './_components/filter-mobile';
import MenuMobile from './_components/menu-mobile';

function DashboardShell({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<div className='lg:hidden flex gap-2 relative '>
				<Suspense fallback={null}>
					<MenuMobile />
				</Suspense>
				<Suspense fallback={null}>
					<FilterMobile />
				</Suspense>
				<Suspense fallback={null}>
					<BackBtn />
				</Suspense>
			</div>
			<div className='hidden lg:block z-50'>
				<Suspense fallback={null}>
					<SidebarMenu />
				</Suspense>
			</div>

			{children}
		</>
	);
}

async function DashboardSessionBoundary({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const requestHeaders = await headers();
	const initialUser = decodeSessionUserHeader(
		requestHeaders.get(SESSION_USER_HEADER),
	);

	return (
		<SessionHydratorProvider initialUser={initialUser}>
			<DashboardShell>{children}</DashboardShell>
		</SessionHydratorProvider>
	);
}

export default function DashLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<Suspense fallback={null}>
			<DashboardSessionBoundary>{children}</DashboardSessionBoundary>
		</Suspense>
	);
}
