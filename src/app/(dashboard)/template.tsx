/** @format */

import React, { Suspense } from 'react';
import SidebarMenu from './components/SidebarMenu';

export default function Template({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<Suspense>
				<SidebarMenu />
			</Suspense>
			{children}
		</>
	);
}
