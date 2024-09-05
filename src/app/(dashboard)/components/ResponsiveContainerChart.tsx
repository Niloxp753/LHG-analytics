/** @format */
'use client';

import React from 'react';

export default function ResponsiveContainerChart({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className='rounded p-4 w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-900 border-none'>
			{children}
		</div>
	);
}
