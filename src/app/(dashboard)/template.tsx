/** @format */

import React, { Suspense } from 'react';
import SidebarMenu from './components/SidebarMenu';
import { SidebarDemo } from './components/sidebar-test';
import { getAllUsersAction } from '@/actions/getAllUsers';
import { getServerSession } from 'next-auth';

export default async function Template({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await getServerSession();
	const users = await getAllUsersAction();
	const emailLogged = session?.user?.email;

	const user = users?.find((u) => u.email === emailLogged);
	return (
		<>
			<div className='md:hidden z-50'>
				<SidebarDemo user={user} />
			</div>
			<div className='hidden md:block z-50'>
				<SidebarMenu user={user} />
			</div>

			{children}
		</>
	);
}
