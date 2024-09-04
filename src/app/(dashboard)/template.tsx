/** @format */

import React, { Suspense } from 'react';
import SidebarMenu from './components/SidebarMenu';
import { SidebarDemo } from './components/sidebar-test';

export default function Template({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<Suspense>
				<div className='md:hidden'>
					<SidebarDemo />
				</div>
				<div className='hidden md:block'>
					<SidebarMenu />
				</div>
			</Suspense>
			{children}
		</>
	);
}
