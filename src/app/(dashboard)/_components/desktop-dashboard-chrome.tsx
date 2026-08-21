'use client';

import SidebarMenu from './SidebarMenu';

export default function DesktopDashboardChrome() {
	return (
		<div data-testid='dashboard-desktop-chrome' className='hidden lg:block z-50'>
			<SidebarMenu />
		</div>
	);
}
