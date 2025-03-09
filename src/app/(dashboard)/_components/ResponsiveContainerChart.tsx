/** @format */
'use client';

import React from 'react';

export default function ResponsiveContainerChart({
	children,
	height,
}: {
	children: React.ReactNode;
	height?: string;
}) {
	return (
		<div
			className={`rounded py-4 px-2 w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-900 border-none`}>
			{children}
		</div>
	);
}
