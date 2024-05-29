/** @format */

import Sidebar from './components/sidebar';

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
