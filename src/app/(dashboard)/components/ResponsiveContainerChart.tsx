/** @format */

import React from 'react';

export default function ResponsiveContainerChart({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className=' rounded-lg m-2 p-4 h-full bg-zinc-800 border border-zinc-100/40'>{children}</div>
	);
}
