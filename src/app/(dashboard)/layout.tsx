/** @format */

import Sidebar from './components/SidebarMenu';

export default async function DashLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<Sidebar />
			{children}
		</>
	);
}
