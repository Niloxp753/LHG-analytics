/** @format */

import BackBtn from '@/components/back-btn';
import SessionHydratorProvider from '@/providers/session-hydrator-provider';
import React from 'react';
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
				<MenuMobile />
				<FilterMobile />
				<BackBtn />
			</div>
			<div className='hidden lg:block z-50'>
				<SidebarMenu />
			</div>

			{children}
		</SessionHydratorProvider>
	);
}
