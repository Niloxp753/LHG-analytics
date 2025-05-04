/** @format */

import { getAllUsersAction } from '@/actions/getAllUsers';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';
import SidebarMenu from './_components/SidebarMenu';
import FilterMobile from './_components/filter-mobile';
import MenuMobile from './_components/menu-mobile';

export default async function DashLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await getServerSession();

	if (!session) {
		redirect('/login');
	}
	const users = await getAllUsersAction();
	const emailLogged = session?.user?.email;

	const user = users?.find((u) => u.email === emailLogged);
	return (
		<>
			<div className='lg:hidden flex gap-2 relative '>
				<MenuMobile user={user} />
				{/* <SidebarDemo user={user} /> */}
				<FilterMobile />
			</div>
			<div className='hidden lg:block z-50'>
				<SidebarMenu user={user} />
			</div>
			{children}
		</>
	);
}
