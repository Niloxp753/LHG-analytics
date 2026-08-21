/** @format */

import type { PropsWithChildren } from 'react';
import ResponsiveDashboardChrome from './responsive-dashboard-chrome';

export default function DashboardShell({ children }: PropsWithChildren) {
	return (
		<>
			<ResponsiveDashboardChrome />
			{children}
		</>
	);
}
