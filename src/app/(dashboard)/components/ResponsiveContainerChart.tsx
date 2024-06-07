/** @format */
'use client';
import React from 'react';

export default function ResponsiveContainerChart({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className=' rounded p-4 w-full h-full  bg-zinc-800 border border-zinc-100/40'>
			{children}
		</div>
	);
}
