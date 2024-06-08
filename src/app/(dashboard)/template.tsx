/** @format */

import { Sidebar } from 'lucide-react';
import React from 'react';

export default function Template({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Sidebar />
			{children}
		</>
	);
}
