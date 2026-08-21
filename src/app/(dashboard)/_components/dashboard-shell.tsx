/** @format */

import BackBtn from '@/components/back-btn';
import { Suspense, type PropsWithChildren } from 'react';
import SidebarMenu from './SidebarMenu';
import FilterMobile from './filter-mobile';
import MenuMobile from './menu-mobile';

export default function DashboardShell({ children }: PropsWithChildren) {
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
