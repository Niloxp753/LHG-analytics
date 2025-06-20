/** @format */

import { getAllUsersAction } from '@/actions/getAllUsers';
import BackBtn from '@/components/back-btn';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';
import { authOptions } from '../api/auth/[...nextauth]/options';
import SidebarMenu from './_components/SidebarMenu';
import FilterMobile from './_components/filter-mobile';
import MenuMobile from './_components/menu-mobile';

export default async function DashLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await getServerSession(authOptions);

	if (!session) {
		redirect('/login');
	}

	const users = await getAllUsersAction();
	const emailLogged = session?.user?.email;

	const user = users?.find((u) => u.email === emailLogged);

	return (
		<>
			<div className='lg:hidden flex gap-2 relative '>
				{session.user.cpf !== '359.267.460-94' && <MenuMobile user={user} />}

				{/* <SidebarDemo user={user} /> */}
				<FilterMobile />
				<BackBtn />
			</div>
			{session.user.cpf !== '359.267.460-94' && (
				<div className='hidden lg:block z-50'>
					<SidebarMenu user={user} />
				</div>
			)}

			{children}
		</>
	);
}
