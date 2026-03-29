/** @format */

import SessionHydratorProvider from '@/providers/session-hydrator-provider';
import React from 'react';

export default function PublicLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <SessionHydratorProvider autoHydrate={false}>{children}</SessionHydratorProvider>;
}
