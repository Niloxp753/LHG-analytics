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
				<div className=' z-50'>
					<SidebarDemo />
				</div>
				<div className='hidden md:block z-50'>
					<SidebarMenu />
				</div>
			</Suspense>
			{children}
		</>
	);
}
