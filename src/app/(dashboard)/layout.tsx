/** @format */

import BackBtn from '@/components/back-btn';
import SessionHydratorProvider from '@/providers/session-hydrator-provider';
import React, { Suspense } from 'react';
import SidebarMenu from './_components/SidebarMenu';
import FilterMobile from './_components/filter-mobile';
import MenuMobile from './_components/menu-mobile';

export default async function DashLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<SessionHydratorProvider>
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
		</SessionHydratorProvider>
	);
}
