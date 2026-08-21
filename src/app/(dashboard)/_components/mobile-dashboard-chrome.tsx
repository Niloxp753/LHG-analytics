'use client';

import BackBtn from '@/components/back-btn';
import FilterMobile from './filter-mobile';
import MenuMobile from './menu-mobile';

export default function MobileDashboardChrome() {
	return (
		<div
			data-testid='dashboard-mobile-chrome'
			className='relative flex h-0 gap-2 lg:hidden'>
			<MenuMobile />
			<FilterMobile />
			<BackBtn />
		</div>
	);
}
